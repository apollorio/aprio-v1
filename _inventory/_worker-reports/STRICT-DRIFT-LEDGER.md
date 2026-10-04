# STRICT DRIFT ledger (coordinator)

Branch: cursor/registry-all-plugins-incl-waha (+ PR #10 chapters)
Policy: inventory ALL apollo-* INCLUDING apollo-waha (overrides paste skip)
PHP product edits: NONE
Monolith hand-edit: NONE

## Disk vs REG
| metric | value |
|---|---|
| on disk apollo-* | 44 (waha=yes, ui=yes, seed-runner=yes) |
| REG.plugins | 50 |
| MATCH | 44/44 |
| MISSING_IN_REG | [] |
| MISSING_ON_DISK (ghosts) | apollo-cena, classifieds, pwa, runtime, shortcodes, suppliers |

## Boot / root drift (report-only)
force-load-*, *-guard.php, debug-*.log at plugins root — temporary, not features

## Allowlist workers may touch
READ: apollo-*/**, apollo-core/config/*.php, _inventory/registry/**, _dev-registry/**, mu docs in chapters
WRITE: _inventory/_worker-reports/** only (this STRICT pass); chapters only if Coordinator OK
FORBIDDEN: product PHP, hand-merge monolith, invent plugins/routes

## Evidence
gen-dev-registry + verify (see shell)

## Workers spawned (Composer 2.5 cloud VM)
W1–W6 STRICT agents launched; merge when they return