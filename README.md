# Dungeon Explorer

A self-contained, static browser dungeon crawler built with vanilla JavaScript, HTML Canvas, and CSS. Designed for GitHub Pages and mobile browsers.

## Features

- Pseudo-3D first-person raycasting renderer with wall shading and billboard enemies/items
- Procedurally generated dungeon floors with rooms, corridors, loot, and exit stairs
- Real-time movement, enemy pursuit, line-of-sight checks, melee attacks, critical hits, and damage feedback
- Quickstep dodge with cooldown and brief invulnerability frames
- Procedural spike traps that punish careless movement and can be evaded with a well-timed dodge
- Boss enrage phase below 40% health, with faster movement and stronger attacks
- Enemies can land close-range attacks (combat spacing and dodge timing matter)
- Multiple enemy types and a guardian boss every fourth floor
- Experience, leveling, equipment bonuses, gold, and healing potions
- Permadeath: dying deletes the active expedition; lifetime run and kill records remain locally
- Local browser save for the active run, inventory, equipment, map exploration, and settings-free game state
- Keyboard and mobile touch controls; responsive layout
- Service worker app-shell caching for offline play after the first successful visit
- No server, external APIs, paid assets, analytics, ads, or in-game purchases

## Play locally

Open `index.html` in a modern browser. Core gameplay works directly from the file. Service-worker offline caching requires HTTP/HTTPS.

For a local static server, from this directory run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. It checks JavaScript syntax and deploys the static site on pushes to `main`.

**One-time setup:** the connected GitHub integration cannot change the repository's Pages setting automatically. Open the repository's **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Then open **Actions → Deploy Dungeon Explorer to GitHub Pages** and re-run the latest workflow (or push another commit). Once Pages is enabled, future pushes to `main` deploy automatically.

The game uses relative asset and service-worker paths, so it works from a project subpath such as `https://USERNAME.github.io/dungeon-explorer/`.

## Controls

- **W / S**: move forward/back
- **A / D** or **← / →**: turn
- **Q / C**: strafe left/right
- **E**: interact with nearby exit
- **Space**: attack (16% chance of double-damage critical hit)
- **Shift**: quickstep dodge (2.4-second cooldown)
- **H**: drink a potion
- **I**: toggle inventory panel
- **M**: toggle map overlay
- **P / Escape**: pause
- Touch controls are available on small screens.

## Saves and permadeath

The active run is saved in this browser's local storage. If the character dies, the active save is deleted. Lifetime statistics are stored separately and survive death. Browser data is device-specific and may be cleared by the browser; there is no cloud sync.

## Technology

No build step or dependencies. The main game is in `index.html`; `service-worker.js`, `manifest.json`, and `favicon.svg` provide offline/app-shell and install metadata.

## License

MIT. See [LICENSE](./LICENSE).
