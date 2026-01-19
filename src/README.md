# Sketchy Friend Drawing Prompt App

An interactive drawing prompt generator featuring realistic 2D physics animations built with React, Tailwind CSS, and Matter.js.

## Features

- **Physics-Based Animations**: Pills and circles fall with realistic gravity, collision detection, and friction using Matter.js
- **Randomized Content**: Each "PromptMe!" click generates random combinations from:
  - 20 drawing prompts (pink pill)
  - 10 color schemes (off-white pill)
  - 10 sizes (lime pill)
- **Controlled Physics**:
  - Pills fall in sequence (pink → off-white → lime)
  - Pills rotate within ±60 degrees (no upside-down flipping)
  - Circles rotate freely
  - Low bounce, high friction for realistic landing
  - Invisible walls for screen containment
- **Streak Tracking**: Done page with badge functionality
- **Cross-Screen Navigation**: Using `animationTrigger` prop system

## Tech Stack

- React
- Tailwind CSS v4
- Matter.js (2D physics engine)
- Lucide React (icons)
- TypeScript/TSX

## Project Structure

```
├── App.tsx                          # Main application entry
├── components/
│   ├── AnimatedSketchyFriend.tsx   # Physics animation component
│   ├── CompletionScreen.tsx        # Done page with streak badges
│   ├── CartoonBlueFlame.tsx        # Flame decoration component
│   └── ui/                         # UI component library
├── styles/
│   └── globals.css                 # Global styles and Tailwind config
└── imports/                        # Figma imported components
```

## Getting Started

This project was built with Figma Make and runs in a React environment.

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

## Key Components

### AnimatedSketchyFriend.tsx
The main physics engine component that handles:
- Matter.js world setup
- Pill and circle body creation
- Sequential falling animation
- Rotation constraints
- Collision detection with ground

### CompletionScreen.tsx
Displays the completion page with:
- Streak badge functionality
- Navigation back to prompt screen

## Design Features

- Centered title group
- Bottom-positioned action buttons
- Pills fall from off-screen (above visible canvas)
- 7px padding above the white ground line
- Responsive layout

## Date

Built on January 19, 2026

## License

MIT License
