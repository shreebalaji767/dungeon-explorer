# Dungeon Explorer

A free, single-player top-down pixel-art roguelite built with vanilla JavaScript, HTML Canvas, and CSS. It is designed for GitHub Pages and mobile browsers.

## Features

- Procedurally generated dungeons with connected rooms, corridors, loot, traps, and exit stairs
- Four rotating visual biomes: crypt, overgrown ruins, frost vault, and ember pit
- Real-time melee combat, critical hits, enemy pursuit, line-of-sight checks, and a two-phase guardian encounter
- Guardians every fourth floor, with stronger enemies on Hardcore difficulty
- Story, Normal, and Hardcore difficulty options
- Shared daily challenge with a deterministic seed for the UTC date
- One-use healing shrines, healing potions, equipment drops, gold bounties for clearing floors, and progression between floors
- Level-up talent choices: Heavy Hand, Iron Heart, Quickstep, and Fortune
- Rare relics with passive bonuses, secret caches, and lifetime records
- Quickstep dodge with cooldown and brief invulnerability frames
- Fog of war and a discovered-area minimap
- Permadeath for the active expedition; lifetime run and kill records remain on the device
- Local browser save and responsive keyboard/touch controls
- Original synthesized sound effects; no external audio assets
- Service-worker app-shell caching for offline play after the first successful visit
- No server, external APIs, paid assets, ads, analytics, or in-game purchases

## Controls

- **Move:** WASD or arrow keys
- **Attack:** Space or the on-screen Attack button
- **Quickstep:** hold Shift
- **Interact / descend / use shrine:** E
- **Inventory:** I
- **Map:** M
- **Pause:** P or Escape
- **Potion:** H or the on-screen Potion button
- **Mobile:** use the directional pad and action buttons

Walk over loot to collect it. Defeat a floor guardian before using the exit stairs. Interact near a shrine once per floor to restore health.

## Play locally

Open `index.html` in a modern browser. Core gameplay works directly from the file. Service-worker offline caching requires HTTP/HTTPS.

For a local static server, run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. It checks JavaScript syntax and deploys the static game.

## Privacy and cost

The game runs locally in the browser. Save data is stored in localStorage on the current browser/device. There are no accounts, analytics, external APIs, paid services, ads, or purchases.

## License

See [LICENSE](./LICENSE).
