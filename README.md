# Just Divide – Kid Mode

A math-based drag-and-drop puzzle game for children aged 7–12, built with React.

## Getting Started

```bash
npm install
npm start
```

Builds with Create React App. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
just-divide/
├── public/
│   ├── index.html          # HTML shell
│   └── eklavya.png         # Favicon
└── src/
    ├── index.js            # React root entry
    ├── App.jsx             # App shell — imports global CSS + Game
    ├── assets/             # All PNG game images
    │   ├── Cat.png
    │   ├── Placement_Box.png
    │   ├── LevelBadge.png
    │   ├── background.png
    │   ├── tile_orange.png
    │   ├── tile_red.png
    │   ├── tile_blue.png
    │   ├── tile_pink.png
    │   └── tile_purple.png
    ├── components/         # React UI components
    │   ├── Game.jsx        # Root game layout
    │   ├── Background.jsx  # Bubble wallpaper
    │   ├── Header.jsx      # Title / timer / hint toggle
    │   ├── Grid.jsx        # 4×4 board + cat + badges
    │   ├── SidePanel.jsx   # Keep / Queue / Trash panel
    │   ├── Tile.jsx        # Individual number tile
    │   └── GameOver.jsx    # End-game modal
    ├── hooks/
    │   └── useGameState.js # All state, actions, drag/touch handlers
    ├── styles/             # Component-scoped CSS files
    │   ├── global.css      # CSS variables + resets + keyframes
    │   ├── Game.css
    │   ├── Header.css
    │   ├── Grid.css
    │   ├── Panel.css
    │   ├── Tile.css
    │   ├── GameOver.css
    │   └── Background.css
    └── utils/
        ├── gameLogic.js    # Pure game logic (merge, resolve, hints)
        └── tileColors.js   # Tile colour mapping
```

## Game Rules

| Situation | Result |
|---|---|
| Two equal tiles touch | Both disappear |
| Larger tile divisible by smaller | Larger → quotient, smaller removed |
| Division result = 1 | That tile removed too |

## Controls

| Key | Action |
|---|---|
| Click / Drag | Place active tile |
| Z | Undo (up to 10 moves) |
| R | Restart |
| G | Toggle hints |
| 1 / 2 / 3 | Difficulty (Easy / Medium / Hard) |

## Deployment

```bash
npm run build
```

Deploy the `build/` folder to **Vercel**, Netlify, or any static host.

---

Built for Eklavya Game Dev Task — ReactJS implementation of Just Divide Kid Mode.
