# 🎮 Super Runner - Mario-Style Mobile Game

A mobile endless runner game built with Expo (React Native), inspired by classic platformer games like Super Mario.

## Features

- **Classic Platformer Gameplay**: Jump over obstacles and collect points
- **Physics-based Movement**: Gravity and jumping mechanics
- **Collision Detection**: Real-time obstacle collision
- **Score Tracking**: Keep track of your high score
- **Responsive Design**: Works on iOS, Android, and Web
- **Mario-style Graphics**: Classic blue sky, brown ground, and pipe obstacles

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (installed automatically)

### Installation

```bash
cd mario-game
npm install
```

### Running the App

#### Web Browser
```bash
npm run web
```

#### Android (requires Android Studio or Expo Go app)
```bash
npm run android
```

#### iOS (requires macOS and Xcode)
```bash
npm run ios
```

### Using Expo Go

1. Install Expo Go on your iOS or Android device
2. Run `npm start` in the project directory
3. Scan the QR code with Expo Go

## How to Play

1. Tap **"Start Game"** to begin
2. Tap anywhere on the screen to **jump**
3. Avoid the green pipes/obstacles
4. Each obstacle you pass earns you 1 point
5. Game ends when you hit an obstacle

## Game Mechanics

- **Gravity**: Pulls the player down continuously
- **Jump Force**: Instant upward velocity when tapping
- **Game Speed**: Obstacles move from right to left
- **Collision**: Game detects when player hits an obstacle

## Project Structure

```
mario-game/
├── src/
│   └── app/
│       ├── index.tsx      # Main game screen
│       └── _layout.tsx    # App layout configuration
├── assets/                # Images and static files
├── package.json           # Dependencies and scripts
└── app.json              # Expo configuration
```

## Technologies Used

- **Expo**: React Native development framework
- **React Native**: Cross-platform mobile development
- **React Hooks**: useState, useEffect, useRef for game state management
- **Dimensions API**: Responsive screen sizing
- **StyleSheet**: Styling components

## Customization

You can easily customize the game by modifying these constants in `index.tsx`:

```javascript
const GROUND_HEIGHT = 100;     // Height of the ground
const PLAYER_SIZE = 50;         // Size of the player character
const OBSTACLE_WIDTH = 40;      // Width of obstacles
const GRAVITY = 0.6;            // Gravity strength
const JUMP_FORCE = -15;         // Jump power
const GAME_SPEED = 5;           // Speed of obstacles
```

## Future Enhancements

- [ ] Add coin collection mechanic
- [ ] Multiple lives system
- [ ] Power-ups (speed boost, invincibility)
- [ ] Different levels/themes
- [ ] Sound effects and music
- [ ] High score persistence
- [ ] Animated sprites
- [ ] Multiple obstacle types
- [ ] Boss battles

## License

MIT License - feel free to use this code for learning or personal projects!

---

Built with ❤️ using Expo and React Native
