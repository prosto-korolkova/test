import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GROUND_HEIGHT = 100;
const PLAYER_SIZE = 50;
const OBSTACLE_WIDTH = 40;
const GRAVITY = 0.6;
const JUMP_FORCE = -15;
const GAME_SPEED = 5;

export default function MarioGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleX, setObstacleX] = useState(SCREEN_WIDTH);
  
  const gameLoopRef = useRef(null);

  // Jump function
  const jump = () => {
    if (!isJumping && gameStarted && !gameOver) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
    }
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPlayerY(0);
    setVelocity(0);
    setIsJumping(false);
    setObstacleX(SCREEN_WIDTH);
  };

  // Game loop - physics and collision detection
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        // Apply gravity to player
        setPlayerY((prevY) => {
          const newY = prevY + velocity;
          
          // Check if hitting the ground
          if (newY <= 0) {
            setIsJumping(false);
            setVelocity(0);
            return 0;
          }
          
          setVelocity((prevVel) => prevVel + GRAVITY);
          return newY;
        });

        // Move obstacle
        setObstacleX((prevX) => {
          const newX = prevX - GAME_SPEED;
          
          // Reset obstacle when it goes off screen
          if (newX < -OBSTACLE_WIDTH) {
            setScore((prevScore) => prevScore + 1);
            return SCREEN_WIDTH;
          }
          
          return newX;
        });
      }, 16); // ~60 FPS

      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameStarted, gameOver, velocity]);

  // Collision detection
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const playerRect = {
        left: 50,
        right: 50 + PLAYER_SIZE,
        top: playerY,
        bottom: playerY + PLAYER_SIZE,
      };

      const obstacleRect = {
        left: obstacleX,
        right: obstacleX + OBSTACLE_WIDTH,
        top: 0,
        bottom: 60, // Obstacle height
      };

      // Check collision
      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top
      ) {
        setGameOver(true);
        clearInterval(gameLoopRef.current);
      }
    }
  }, [playerY, obstacleX, gameStarted, gameOver]);

  return (
    <View style={styles.container}>
      {/* Sky background */}
      <View style={styles.sky} />
      
      {/* Ground */}
      <View style={[styles.ground, { bottom: 0 }]} />
      
      {/* Clouds decoration */}
      <View style={[styles.cloud, { top: 50, left: 100 }]} />
      <View style={[styles.cloud, { top: 80, left: 250 }]} />
      <View style={[styles.cloud, { top: 40, left: 400 }]} />
      
      {/* Player (Mario-like character) */}
      <View 
        style={[
          styles.player, 
          { 
            bottom: GROUND_HEIGHT + playerY,
            left: 50,
          }
        ]}
      >
        <Text style={styles.playerEmoji}>🏃</Text>
      </View>
      
      {/* Obstacle (pipe-like) */}
      {gameStarted && !gameOver && (
        <View 
          style={[
            styles.obstacle,
            { 
              left: obstacleX,
              bottom: GROUND_HEIGHT,
            }
          ]}
        >
          <Text style={styles.obstacleEmoji}>🟩</Text>
        </View>
      )}
      
      {/* Score display */}
      {gameStarted && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      )}
      
      {/* Start/Game Over Screen */}
      {(!gameStarted || gameOver) && (
        <View style={styles.menuOverlay}>
          <Text style={styles.title}>
            {gameOver ? '💀 Game Over!' : '🎮 Super Runner'}
          </Text>
          {gameOver && (
            <Text style={styles.finalScore}>Final Score: {score}</Text>
          )}
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>
              {gameOver ? '🔄 Try Again' : '▶️ Start Game'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.instructions}>Tap to jump!</Text>
        </View>
      )}
      
      {/* Jump touch area */}
      {gameStarted && !gameOver && (
        <TouchableOpacity 
          style={styles.jumpArea} 
          onPress={jump}
          activeOpacity={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c94fc', // Classic Mario sky blue
    overflow: 'hidden',
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: GROUND_HEIGHT,
    backgroundColor: 'transparent',
  },
  ground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: GROUND_HEIGHT,
    backgroundColor: '#c84c0c', // Mario ground brown
    borderTopWidth: 10,
    borderTopColor: '#f8b800', // Gold border
  },
  cloud: {
    position: 'absolute',
    width: 80,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
  },
  player: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerEmoji: {
    fontSize: 40,
  },
  obstacle: {
    position: 'absolute',
    width: OBSTACLE_WIDTH,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  obstacleEmoji: {
    fontSize: 50,
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scoreText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f8b800',
    marginBottom: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  finalScore: {
    fontSize: 24,
    color: 'white',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#e52521', // Mario red
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
  },
  startButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: 20,
    color: 'white',
    fontSize: 18,
    opacity: 0.8,
  },
  jumpArea: {
    ...StyleSheet.absoluteFillObject,
  },
});
