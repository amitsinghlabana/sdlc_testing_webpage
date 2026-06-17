# Interactive Animation Page

A single‑page web app that lets users trigger falling snowflakes or floating balloons with the click of a button.

## Overview

This app presents two controls—**Snowflakes** and **Balloons**—and an animation area. Clicking a button starts the corresponding effect (continuous snow or balloons) in the same viewport without navigation.

## Getting Started

### Prerequisites

- Node.js v14+ and npm

### Installation & Run

```bash
# Clone and install dependencies
git clone <repo-url>
cd <repo-folder>
npm install

# Generate runtime config (from environment variables)
npm run generate-config

# Start the development server
npm run dev
```

Open your browser at `http://localhost:3000` to view the page.

## API

### Configuration Script

Located at `scripts/generate-config.mjs`.

| Command                 | Description                                             |
|-------------------------|---------------------------------------------------------|
| `npm run generate-config` | Generates `public/config.json` from environment variables. |

### Animation Module

The ES module at `public/scripts/animation.js` exports the following functions, which are bound to the buttons in `public/index.html`:

| Function             | Description                             |
|----------------------|-----------------------------------------|
| `startSnowflakes()`  | Begins the falling snowflakes animation. |
| `startBalloons()`    | Begins the floating balloons animation.  |

## Testing

Tests are powered by Vitest. Run all tests with:

```bash
npm test
```

- `tests/generate-config.test.js` tests the config generator.
- `tests/index.test.js` verifies that button clicks invoke the correct animation functions.
