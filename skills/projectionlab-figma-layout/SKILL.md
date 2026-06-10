---
name: projectionlab-figma-layout
description: Use when creating a ProjectionLab-inspired financial planning dashboard, wireframe, or layout framework in Figma, especially when the user asks to make a new Figma file or reproduce the planning-dashboard structure from ProjectionLab-like references.
---

# ProjectionLab Figma Layout

## Overview

Create an editable Figma dashboard layout inspired by ProjectionLab's structure: dark persistent navigation, thin top controls, chart-first planning canvas, summary rail, KPI cards, and finance modules. Do not copy exact proprietary branding or assets; abstract the product structure into a reusable planning-dashboard framework.

## Workflow

1. Restore project state first: read `progress.md` and `feature_list.json`; confirm there is one active WIP feature.
2. Gather current visual references before designing. Use official ProjectionLab pages or user-provided screenshots/links. If using web references, cite them in the final response.
3. Present a short design direction and get approval before writing to Figma.
4. If the user wants a new Figma file, call `whoami`, choose the only available plan when there is exactly one, then `create_new_file`.
5. Search for existing Figma design-system assets before creating custom layers. If no components/styles/variables are returned, create native editable Figma layers.
6. Use `use_figma` to create the layout. Keep the first frame desktop-sized unless the user asks otherwise; `1440x1024` is a good default.
7. Verify inside Figma with a follow-up `use_figma` call that the final page, primary frame, and required sections exist.
8. Record the outcome in a project spec and `progress.md`; keep `feature_list.json` aligned with the WIP.

## Layout Recipe

Build these sections as named editable layers:

| Section | Purpose |
| --- | --- |
| Sidebar | Persistent navigation for Dashboard, Current Finances, Plans, Goals, Milestones, Reports, Settings |
| Topbar | Breadcrumb, scenario selector, projection range, currency, primary action |
| KPI row | Net Worth, Assets, Liabilities, FI Progress |
| Main chart | Net Worth + Progress area chart with grid, age labels, event markers, hover detail |
| Right rail | Current finances rings, account breakdown, assumptions |
| Modules | Income, Expenses, Investments, Goals |
| Milestones | Retirement, Debt Free, First Million, optional life goals |
| Handoff notes | Color swatches and short structural notes outside the main frame |

Style defaults:

- Background: light neutral workspace with white surfaces and thin gray borders.
- Sidebar: dark blue-gray.
- Accent colors: teal for progress, blue for assets, purple for projections, amber for events/liabilities.
- Radius: 8px for cards and panels.
- Typography: dense dashboard type, not marketing hero type.

## Figma API Guardrails

- Load fonts before creating text. For Inter, use `Semi Bold`, not `SemiBold`.
- Coerce all text content with `String(value)` before assigning `node.characters`.
- Keep text style and alignment separate. Do not pass `CENTER` where a font style is expected.
- Use `await figma.setCurrentPageAsync(page)`; do not assign `figma.currentPage`.
- If a write fails halfway, create a clean final page and remove partial pages before retrying.
- Name nodes semantically so verification can find them: `Sidebar background`, `Topbar background`, `Projection chart card`, `Right summary panel`, `Income module card`, etc.
- Prefer editable shapes, text, vectors, and frames over flattened screenshots.

## Verification Checklist

Before claiming completion:

- Figma file URL is available.
- Final page exists.
- Primary dashboard frame exists.
- Required sections exist: sidebar, topbar, projection chart, right summary panel, milestone panel, and module cards.
- The frame has editable nodes, not only an image.
- Project files are updated: spec, `progress.md`, and `feature_list.json`.
- Commit only the related skill/spec/progress files after verification passes.
