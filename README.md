# Tesseract Chess

Play: https://nathan-culver.github.io/Tesseract-Chess/

A neon, mobile-first chess game with offline computer opponents, local pass-and-play, cube controls and persistent saves. No dependencies, accounts, external AI or runtime CDN. GitHub Pages hosts the public site; online multiplayer is deferred.

## Rulesets and board sizes

| Mode | Board | Arrangement |
| --- | --- | --- |
| Standard 2D | 8×8 | Normal 32-piece starting position |
| Compact 3D | 4×4×4 | Custom 16-piece armies, two levels per side |
| Classic Raumschach | 5×5×5 | Standard 20-piece armies, including two unicorns |
| Expanded 3D | 6×6×6 | Custom 24-piece armies |
| Grand 3D | 8×8×8 | Custom 32-piece armies |
| Mathematical 4D | 4×4×4×4 | Original 16-piece armies from the reference PDF |
| Expanded 4D | 5×5×5×5 | Custom 18-piece armies |

Default play is bounded 5³ Raumschach. Sizes other than classic 5³ / original 4⁴ use documented app arrangements, not claims of canonical historical setups. In 3D, each army occupies two home levels, each with a piece rank and pawn rank. The custom 4³ back ranks are R/K/N/R and B/U/Q/B; 6³ are R/N/B/K/N/R and B/U/Q/B/U/N; 8³ are R/N/B/Q/K/B/N/R and R/U/B/N/Q/B/U/R. Black mirrors the army across all three axes. Expanded 4D retains the original arrangement's relationships with a central lateral pair and ten pawns per side.

### Standard 2D chess

Normal piece movement, king safety, checkmate and promotion. Optional castling, starting pawn double-step and en passant (all on by default). Castling requires unmoved king/rook, a clear path and safe starting, crossing and destination squares. En passant expires after one turn and cannot expose the king. Kings are never captured.

Claim-style draws (default in 2D setup) enable the Game panel's **Claim a draw** button at threefold repetition / 50 moves. Fivefold repetition and 75 moves draw automatically. Automatic-style draws instead trigger at threefold / 50. Checkmate takes priority. Basic insufficient material is detected (bare kings, lone bishop/knight versus king, all remaining bishops on one square color); this is not a general solver of all possible dead positions. If a player flags and the opponent has only a king or the position is detected as dead, the game draws. Local players can agree to draw.

### 3D rules and choices

Rook slides on one axis; bishop on two; unicorn on three; queen on any equal-step combination. The planar knight leaps 2+1 in any plane. The **Maack hybrid** instead uses a normal X/Y knight within its level, and slides as a unicorn to change levels. King movement is either all 26 neighbors (standard) or six face neighbors (custom restriction).

- **Forward-only pawns (default):** White advances +Y/+Z, Black −Y/−Z. Capture ±X plus forward Y, ±X plus forward Z, or forward Y+Z. Promotion requires both far Y and Z.
- **Old pawns:** advance forward in rank or either way in level; capture forward rank plus ±X or ±Z; promote on the far Y rank.
- **All-sided pawns:** one face step and one edge-diagonal capture in any direction. No promotion.

No castling, double-step or en passant in 3D/4D. These pawn/knight choices refer to the historical alternatives summarized in the supplied 3D reference; their combinations on custom sizes are app variants.

### 4D rules

Coordinates are X/Y = small file/rank; Z/W = big file/rank. Rook slides in one or three axes, bishop in two or four; queen in any combination. Knight leaps 2+1 in any plane. Pawns advance in Y or W and capture one forward step plus ±X/±Z, promoting at both far ranks. Promotion offers Q/R/B/N; 3D additionally offers U.

The PDF discusses alternatives for kings. **Fortress** (default) restricts X/Z to the central pair and Y/W to the king's two home ranks. **Unrestricted** allows all neighboring cells, up to 80. **Restricted** allows one axis per step. There is no single universal 4D king rule.

### Borderless

Optional wrapping on **every axis**, like Tesseract Go. Sliders stop at blockers or before repeating a cell; knight and pawn steps wrap as well. Check and king safety still apply. A wrapped normal opening can put kings into check before play, so Black's army is deterministically shifted if needed to find a non-overlapping safe opening. This is explicitly a custom toroidal arrangement. Some tightly packed combinations have no safe translation; setup explains and disables them (4³ + old/all-sided pawns + hybrid knight + unrestricted king). Use planar knights, the restricted king, or a larger cube.

Promotion still uses fixed far-edge coordinates even though movement can wrap beyond them. All-sided pawns never promote. Castling, double-steps and en passant are disabled in wrapped 2D to avoid imposing bounded-board special rules on a torus.

### Optional victory rules

Checkmate wins in all modes. Alternative goals add a win condition:

- **Three-check:** deliver a third check.
- **King of the Hill:** legally move the king into the center in every dimension (one central coordinate per odd axis, two per even axis).
- **First capture:** capture any opposing piece.
- **Bare king victory:** optional toggle; reduce the opponent to only its king.
- **Capture-point target:** optional 25/50/75/100. Pawn 1; knight, bishop, unicorn 3; rook 5; queen 9. A promoted piece is worth its new type when captured. Checkmate takes priority. High targets can require promotions to become reachable.

Three-check / Hill / First capture extensions into 3D/4D and their combinations with other rules are custom app variants. With the 4D Fortress option, Hill may be difficult or unreachable because the king must stay in its home region; choose unrestricted or restricted king movement for Hill. Draw conventions and target options are not claims of tournament certification.

## Clocks and timers

- **Untimed**.
- **Total allowance:** one time pool per side.
- **Increment:** adds configured seconds after each completed move.
- **Delay:** fresh grace seconds at the start of each turn; main time only runs after grace is exhausted, with no banking of unused delay.
- **Hourglass:** each second used transfers to the opponent, preserving total remaining time until flag.
- **Per move:** resets to a fresh allowance after each completed move.
- **Overtime:** main time followed by resettable periods; exceeding one consumes it.

Bullet (1 min), Blitz (3+2), Rapid (10+5), Classical (30+30) and 30-second-per-move presets are provided. They are convenient presets, not tournament certification. Clocks pause while hidden, in dialogs, during replay, or with Pause. Search budgets shrink to fit remaining time. Local timing is not tamper-resistant.

## Views and controls

Drag a piece directly, without preselection, to a highlighted legal cell. Piece silhouettes take priority over overlapping empty lattice points. Drops snap only to legal destinations. A translucent preview stays uncommitted until tapped/confirmed; pick it back up to try another point. Invalid drops show a pink ring and retain the preceding preview. Disable confirmation in View for immediate legal drops and taps; promotion always requires confirmation.

Drag empty cube space to orbit, Shift/right-drag to pan, pinch/scroll to zoom. Flat layer supports precise input; All boards provides accessible buttons for every cell. In 4D, W selects a 3D slice; switching W retains selection for cross-slice moves. Precise Piece/Legal destination dropdowns can reach every legal cell. Backgrounds: black, white, pink, grey, brown. Glow, layer isolation, reset, zoom and one-finger pan are configurable. Mobile Play/View/Game tabs collapse within the board area. Keyboard: +/− zoom, Home reset; all board cells and dropdowns are keyboard accessible.

2D coordinates use e4. 3D Ac2 means level A, file c, rank 2. 4D B2c3 means big board B2, small square c3. Unicorns have a U badge to distinguish them from knights.

## Local AI and saves

Easy, Normal and Hard run in a local module worker. Hard searches up to roughly six seconds; larger/wrapped boards may complete fewer depths. This is a custom heuristic engine, not a rated engine. Hints create previews. Replay is read-only. Undo retains twenty moves, including after reload.

Automatic checkpoints retain the last move, ten moves ago, twenty moves ago. One manual localStorage slot and ten numbered export/import slots use separate Chess keys and IndexedDB. `.tch` files preserve size, rule toggles, captures, check counts, castling/en passant state and clocks. Old 3D/4D saves migrate to their original bounded 5³/4⁴ sizes. Export backups: clearing browser data removes saves. `?test=1` isolates QA game saves; view preferences are shared with the ordinary game.

Open the hosted game until **Ready for offline play**, then cached local AI and pass-and-play work offline. The portable HTML embeds all runtime modules and AI; file-origin storage differs between browsers, so hosted storage is preferred.

## Run and verify

Node 22+, no dependencies:

```
npm run dev
npm run check
npm test
npm run portable
```

GitHub Pages deploys through `.github/workflows/pages.yml` after script checks and tests. Tests include orthodox opening perft 20/400/8902; special moves, king safety, promotion, repetition, wrapped rays, safe setups, optional goals, timers, saves and picking/dragging.

References: [FIDE laws](https://handbook.fide.com/chapter/E012023), [3D chess variants](https://en.wikipedia.org/wiki/Three-dimensional_chess), [Four Dimensional Chess](https://math.iit.edu/~breiniger/Chess/chess-basicmath.pdf). The interface uses canvas-projected geometry and neon piece silhouettes; no runtime WebGL or external services are required.
