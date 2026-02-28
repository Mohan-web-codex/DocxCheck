/**
 * DocxCheck - Fully Functional Node.js Backend
 * * Setup Instructions:
 * 1. Run: npm init -y
 * 2. Run: npm install express mongoose jsonwebtoken twilio cors dotenv @google/generative-ai multer
 * 3. Create a .env file with your credentials (see comment below)
 * 4. Run: node server.js
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ==========================================
// 1. CONFIGURATION & SETUP
// ==========================================
const app = express();
app.use(cors());
app.use(express.json());

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Initialize Twilio for SMS (COMMENTED OUT FOR TESTING)
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Multer for Memory Storage (File Uploads)
const upload = multer({ storage: multer.memoryStorage() });

// Connect to MongoDB
// Note: useNewUrlParser and useUnifiedTopology are no longer needed in modern Mongoose/MongoDB drivers
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// 2. DATABASE MODELS
// ==========================================
const UserSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

const HistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // 'Similarity Check', 'Web Scan', 'AI Summary'
    docs: { type: String, required: true },
    score: { type: String, required: true },
    details: { type: String },
    verdict: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const History = mongoose.model('History', HistorySchema);

// ==========================================
// 3. MIDDLEWARE
// ==========================================
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

// Helper to convert Multer file to Gemini InlineData
const fileToGenerativePart = (file) => {
    return {
        inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: file.mimetype
        },
    };
};

// ==========================================
// 4. AUTHENTICATION ROUTES (SMS)
// ==========================================

// Request OTP via SMS
app.post('/api/auth/send-otp', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    const otpExpires = new Date(Date.now() + 10 * 60000); // 10 minutes

    try {
        // Upsert User
        await User.findOneAndUpdate(
            { phone },
            { otp, otpExpires },
            { upsert: true, new: true }
        );

        // Send SMS via Twilio (COMMENTED OUT FOR TESTING)
        /*
        await twilioClient.messages.create({
            body: `Your DocxCheck verification code is: ${otp}. Valid for 10 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });
        */
        
        // Print the OTP to the terminal for easy testing without Twilio
        console.log(`[TEST MODE] OTP generated for ${phone}: ${otp}`);

        res.json({ message: 'OTP generated successfully (Check server terminal)' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate OTP.' });
    }
});

// Verify OTP & Login
app.post('/api/auth/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;
    
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
        if (user.otpExpires < new Date()) return res.status(400).json({ error: 'OTP expired' });

        // Clear OTP and generate JWT Token
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const token = jwt.sign({ _id: user._id, phone: user.phone }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '7d' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// ==========================================
// 5. CORE AI ROUTES
// ==========================================

// A. Similarity Checker Route
app.post('/api/analyze', authMiddleware, upload.fields([{ name: 'refFile' }, { name: 'tgtFile' }]), async (req, res) => {
    try {
        const { refText, tgtText } = req.body;
        const parts = [];

        // Attach files if uploaded, otherwise use text
        if (req.files['refFile']) parts.push(fileToGenerativePart(req.files['refFile'][0]));
        if (req.files['tgtFile']) parts.push(fileToGenerativePart(req.files['tgtFile'][0]));

        const prompt = `You are a forensic document similarity analyzer. 
        Analyze the similarity between the reference and target.
        Reference Text: "${refText || 'See attached reference file'}"
        Target Text: "${tgtText || 'See attached target file'}"
        Return strictly JSON matching this schema:
        { "similarity_score": <0-100>, "matched_words": <number>, "total_words": <number>, "common_phrases": ["phrase1", "phrase2"], "exact_match_pct": <0-100>, "paraphrase_pct": <0-100>, "structural_pct": <0-100>, "ref_lang": "en", "tgt_lang": "en" }`;
        
        parts.push({ text: prompt });

        const result = await model.generateContent({ contents: [{ role: "user", parts }], generationConfig: { responseMimeType: "application/json" } });
        const analysis = JSON.parse(result.response.text());

        // Save History
        const docNames = `${req.files['refFile'] ? req.files['refFile'][0].originalname : 'Text'} -> ${req.files['tgtFile'] ? req.files['tgtFile'][0].originalname : 'Text'}`;
        await History.create({
            userId: req.user._id,
            type: 'Similarity Check',
            docs: docNames,
            score: analysis.similarity_score.toString(),
            details: `${analysis.ref_lang} ↔ ${analysis.tgt_lang}`,
            verdict: analysis.similarity_score >= 80 ? 'High' : analysis.similarity_score >= 50 ? 'Moderate' : 'Low'
        });

        res.json(analysis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Similarity analysis failed' });
    }
});

// B. Web Scan Route (Uses Google Search Grounding)
app.post('/api/webscan', authMiddleware, upload.single('document'), async (req, res) => {
    try {
        const parts = [];
        if (req.file) parts.push(fileToGenerativePart(req.file));
        
        const prompt = `Analyze this document. Use Google Search to find sources on the web that are highly similar to this document's content.
        Return strictly JSON: { "sources": [ { "name": "Source URL/Title", "score": <0-100> } ] }`;
        parts.push({ text: prompt });

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            tools: [{ googleSearch: {} }],
            generationConfig: { responseMimeType: "application/json" }
        });

        const scanResult = JSON.parse(result.response.text());

        await History.create({
            userId: req.user._id,
            type: 'Web Scan',
            docs: req.file ? req.file.originalname : 'Document',
            score: scanResult.sources[0]?.score?.toString() || '0',
            details: `${scanResult.sources.length} sources found`,
            verdict: (scanResult.sources[0]?.score >= 80) ? 'High Risk' : 'Pass'
        });

        res.json(scanResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Web scan failed' });
    }
});

// C. AI Summarize Route
app.post('/api/summarize', authMiddleware, upload.single('document'), async (req, res) => {
    try {
        const parts = [];
        if (req.file) parts.push(fileToGenerativePart(req.file));

        const prompt = `Provide a professional summary of the attached document/image.
        Return strictly JSON: { "overview": "A brief 2-3 sentence overview", "key_points": ["Point 1", "Point 2"], "conclusion": "A concluding sentence" }`;
        parts.push({ text: prompt });

        const result = await model.generateContent({ contents: [{ role: "user", parts }], generationConfig: { responseMimeType: "application/json" } });
        const summary = JSON.parse(result.response.text());

        await History.create({
            userId: req.user._id,
            type: 'AI Summary',
            docs: req.file ? req.file.originalname : 'Document',
            score: '-',
            details: 'Summarized',
            verdict: 'Done'
        });

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Summarization failed' });
    }
});

// ==========================================
// 6. HISTORY ROUTES
// ==========================================
app.get('/api/history', authMiddleware, async (req, res) => {
    try {
        const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// ==========================================
// 7. START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));