# DocuScope — Agent Skills & Engineering Playbook

A project-specific, portable skill pack for building a multilingual document workspace for legal, scientific, research, and administrative teams.

It is **original guidance**, informed by the general goals of the public projects linked below; it does not copy their skill files. Review each upstream project's license and instructions before installing or redistributing those projects themselves.

## Included

- `.agent/skills/design-taste/SKILL.md` — visual direction, design quality, anti-template rules, motion restraint.
- `.agent/skills/ui-ux-pro/SKILL.md` — product UX, information architecture, responsive and accessible UI implementation.
- `.agent/skills/document-architecture/SKILL.md` — system boundaries, backend architecture, data model, async workflows.
- `.agent/skills/document-security/SKILL.md` — threat modeling and secure handling of sensitive documents and AI inputs.
- `.agent/skills/document-intelligence/SKILL.md` — OCR, handwriting, similarity, plagiarism signals, summaries and translation.
- `.agent/skills/document-testing/SKILL.md` — test strategy, fixtures, acceptance criteria and release gates.
- `docs/PRODUCT_SPEC.md` — product scope and phased delivery.
- `docs/ARCHITECTURE.md` — proposed technical architecture and data model.
- `docs/WORKFLOWS.md` — end-to-end user and processing workflows.
- `docs/SECURITY.md` — security baseline and threat checklist.
- `docs/TEST_PLAN.md` — test matrix and launch criteria.
- `design-system/MASTER.md` — initial visual system for the workspace.

## Use with Antigravity

1. Unzip this folder into your project root.
2. Keep the `.agent/skills/<skill-name>/SKILL.md` folders in place.
3. Start Antigravity in the project directory.
4. Ask it to read the relevant skill before a task. For example:

   `Read .agent/skills/ui-ux-pro/SKILL.md and design-system/MASTER.md. Audit the existing workspace before changing code. Do not rewrite unrelated modules.`

5. Work incrementally: ask for a plan, implement one bounded task, run checks, inspect the result, then continue.

If your Antigravity version expects a different skill-discovery path, retain the files and explicitly reference them in the prompt. The files are plain Markdown and are portable to other coding assistants.

## Reference projects

- Taste Skill: https://github.com/Leonxlnx/taste-skill
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- SecuritySkills: https://github.com/UnitOneAI/SecuritySkills

The upstream repositories evolve independently. This pack is a project-specific playbook, not a mirror of their contents.

## Important product principle

Similarity scores are evidence, not a final plagiarism verdict. Show matching passages, sources, matching method, and uncertainty. Users must be able to inspect and contest results. OCR output—especially handwriting—must expose confidence and require review when confidence is low.
