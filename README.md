# soup-website
Website for Science Olympiad at Penn organization
pennscienceolympiad.org

## Yearly upkeep
- **Next tournament**: edit the hero block at the top of `index.html` (title, date, timeline `data-date`s, register/info links). Timeline dots fill automatically as dates pass, and the "Register your team" button only appears while registration is open.
- **Board**: edit `_data/team.json` → `board` (grouped by role). Photos go in `img/team/<year>/<photoName>.jpg` at a 4:5 crop (720×900). Leave `photoName` empty for the illustrated soup-bowl placeholder. Move last year's board into a new past-board list.
- **Past tournaments bowls**: add a row to `_data/pots.json`.
- Styles live in `css/soup.css` (plain CSS, design tokens at the top); behavior in `js/soup.js`. Product/brand notes in `PRODUCT.md`.
