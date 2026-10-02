---
target: whole portfolio design consistency
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: 'file:/home/kawa/Projects/portfolio-next/src/components/portfolio-page.tsx'
target_fingerprint: 'sha256:62f0bd9e868dec46b8f8a96f6bd6fe5918c29d70b9ee0d5e23c3b10a2f3a7662'
target_path: /home/kawa/Projects/portfolio-next/src/components/portfolio-page.tsx
timestamp: 2026-10-02T07-38-23Z
slug: src-components-portfolio-page-tsx
---

# Critique: portfolio page (EN + DE), 2026-10-02

Method: dual-agent (A: design review, B: detector + browser evidence)

## Heuristics (20/32, Acceptable; 7 and 10 n/a)

1 Status 3 · 2 Real world 3 · 3 Control 3 · 4 Consistency 2 · 5 Error prevention 2 · 6 Recognition 3 · 7 n/a · 8 Minimalist 2 · 9 Error recovery 2 · 10 n/a

## Specificity

Not AI slop. First viewport is authored (cookie portrait, sand/charcoal palette, connected lists, plain-language project copy). Drifts to template below the fold: repeated 2-col card grids (Workflow 15 cards), 54-tag Skills wall. Detector: CLI clean; browser findings all false positives (state-layer contrast, fixed-height padding) except column-height imbalance (213% Career, 275% Workflow).

## Priority issues

- [P1] Name wraps to two lines at 1024-1279px (portrait 144px in 23rem column). portrait.tsx:105, identity.tsx:28. /impeccable adapt
- [P1] Career and Workflow overloaded with uniform card grids; AI recommendations should be the table PRODUCT.md asks for (workflow-panel.tsx:62-75); 13 teaching cards (career-panel.tsx:50-61); orphan last card (section-parts.tsx:88). /impeccable distill, layout
- [P2] Section h3 uses same type-title-md as card h4 (section-parts.tsx:77 vs :108); 24px between sections. /impeccable typeset
- [P2] Caramel overloaded: strength chips (identity.tsx:50) match tonal link buttons; thinking-level chip uses sage action color. /impeccable colorize
- [P2] Email mailto-only fails silently (identity.tsx:70-74); reveal decoded address + copy on click. /impeccable harden

## Persona red flags

Recruiter: silent email failure, AI jargon, teaching twice above fold, Ultrarunning among strengths. Keyboard: whole tabpanel focus ring, 9 stops to tabs. Mobile: non-sticky tabs, 4600px Workflow, LinkedIn wraps, DE tabs crowded at 360px.

## Minor

Dark-mode surface hierarchy inverts (styles.css:51-58); four chip styles; dialog image radius not concentric; type-label-md lacks weight (styles.css:196); "Serves this site" claim untrue (portfolio.ts:315); featured projects differ from PRODUCT.md; xl identity column 28rem vs DESIGN.md 25rem; identity panel not sticky.

## Questions

Does Career need 13 teaching cards if Skills lists the stack? Would a real table be more authored than four AI cards? What should each tab end on?
