🏆 Hackathon Spotlight: 1st Prize Winner
Project Name: DocxCheck — Document Similarity & AI Intelligence

Author: Mohana Priyan

Achievement: 1st Prize Winner

🏗️ Technical Architecture (A to Z)
DocxCheck is a high-performance, full-stack AI application designed to verify document originality and provide deep content insights.

1. The Language & Tech Stack
Frontend: Built using HTML5, Modern CSS3 (Forest Ink & Cream Theme), and Vanilla JavaScript (ES6+).

Backend: Powered by Node.js and the Express.js framework.

Database: MongoDB (via Mongoose) manages user accounts and analysis history.

Environment: Includes a Python virtual environment (venv) for handling specific Natural Language Processing (NLP) tasks.

2. AI Models & Agents
Core AI Engine: Google Gemini 1.5 Flash (gemini-2.5-flash) is used for similarity logic and summarization.

Web Scanner Agent: Utilizes Gemini’s Google Search Grounding tool to cross-reference uploaded documents against live web sources.

NLP Processing: Performs forensic analysis to detect Exact Matches, Paraphrasing, and Structural Similarity.

Auth Agent: Integrated with the Twilio SMS API to provide secure, phone-based OTP (One-Time Password) authentication.

🚀 Installation & Setup Guide
To run this project locally, follow these steps to install all necessary dependencies and models.

1. Install Node.js Dependencies
Open your terminal in the project root and run:

This installs:

express: The web server framework.

mongoose: The MongoDB object modeling tool.

@google/generative-ai: The official SDK for Gemini AI.

multer: For handling document and image uploads.

twilio: For the SMS authentication system.

2. Setup Python Virtual Environment
For the NLP scripts, set up your Python environment:

3. Configure Environment Variables
Create a .env file and add your credentials:

GEMINI_API_KEY: Your key from Google AI Studio.

MONGODB_URI: Your MongoDB connection string.

JWT_SECRET: A secret key for session security.

📂 Project Workflow
Input: Users upload a "Reference" document and one or more "Target" documents.

Processing: The backend uses a helper function (fileToGenerativePart) to convert files for AI processing.

Analysis: The AI returns a detailed JSON report with similarity scores and matched phrases.

Reporting: The frontend displays the results using a 99% accuracy gauge and structural breakdown bars.
