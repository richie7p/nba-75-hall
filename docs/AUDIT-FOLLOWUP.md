# PDF audit follow-up — NBA 75 Hall

Baseline: portfolio audit dated 2026-10-03, pp. 17–18, commit `e12c797e45693c150973a8d6052d6c4fa34d1cf9`. Follow-up: 2026-10-04. Repeated build/advisory findings are consolidated below. This is an engineering follow-up, not a new numerical audit score or authorization to deploy.

| PDF finding | Implemented change and evidence | Remaining limit |
| --- | --- | --- |
| P1 provenance, media rights; P3 2026 facts/freshness | `src/data/provenance.ts` records narrow claim-level official NBA sources and dates for all nine players with 2026 text. Corrected official transaction dates for Giannis/Davis, Kawhi's team, Lillard's future return, and removed undisclosed LeBron contract amounts. Home and detail views expose source scope, an editorial snapshot date, and unverified fields. Team labels now say last recorded team. | Source links support their stated claims only. Career totals, historical biography, high-school/college awards and every other unlinked field still need an owner's field-by-field review. This is not a live statistical feed. |
| P1 image licensing | Removed 76 downloaded portraits from public output and cleared the photo map; existing typographic jersey placeholders preserve the gallery. `docs/portrait-audit.json` inventories every removed image with hash, former path, unknown author/license and missing original file URL. Disabled the unreviewed thumbnail downloader. Removed generated legacy screenshots from tracking because gallery captures also embedded those portraits. | Rights were not inferred from Wikipedia availability. Reintroduction requires the original file page, creator, license, attribution and owner review. Original files remain in Git history. Existing generated museum/social art and NBA trademark use still require owner rights review. |
| P2 product tests / accessibility verification | `tests/domain` covers catalog invariants, multilingual search, intersecting filters, unknown URL values, empty states, navigation, grouping, aggregate semantics and source coverage. Desktop/mobile E2E exercises filtering, deep links, details, back/next, keyboard recovery and overflow. | Browser device emulation is not physical-phone testing or a screen-reader/contrast audit. |
| P2 standard Windows build (listed twice) | Wrapper resolves Vite's JS entrypoint and executes it with Node, preserving args/env/exit status. Tests cover actual Vite startup. Public auth settings have a tracked root fallback; platform `.grok/app-env.json` and process env retain precedence. | No live deployment was performed. |
| P2 dependency advisory (listed twice), shared lint failure | Updated npm lock/dependencies to remove current `brace-expansion` and `js-yaml` advisories; fixed shared lint errors. Full and production audit gates run in CI. | A clean audit is a point-in-time package check, not proof of exploit absence. |
| Release/test reproducibility | Windows/Ubuntu CI runs clean install, lint, typecheck, scaffold + domain tests, standard build and both audits; Ubuntu also runs both E2E viewports. Cross-platform scaffold discovery avoids shell glob ambiguity. Authoring document tests use explicit, attributed fixtures instead of developer-machine files. Removed generated `.vercel/output` from tracking, including stale portrait copies; CI recreates it from sources. | Hosted CI status belongs to the PR head; see the PR checks. |

## Source scope

Official membership: <https://www.nba.com/75/>. The home banner separately links the official 2026 Finals game/Finals MVP pages. Individual sources and their publication dates are rendered in player details from `PLAYER_SOURCES`. A membership page does not validate all text or metrics on a player card. NBA sources are external links, not copied articles or media licenses.

## Reproduction and counts

Use Node 22 and `npm ci`. `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit --audit-level=high`, and `npm audit --omit=dev --audit-level=high` are the release checks. `npx playwright install chromium` then `npm run test:e2e` serves the production build on port 6341.

Scaffold: 197 CLI/tooling tests + 32 shared app/auth tests. Product domain: 11 tests. Browser: 4 tests (2 scenarios × desktop/mobile). Report these groups separately; scaffold tests are not evidence of catalog correctness. No API key is needed.
