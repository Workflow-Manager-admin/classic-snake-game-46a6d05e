import { useState, useEffect, useCallback } from 'react';

const DIRECTIONS = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0]
};

const INITIAL_SNAKE = [[5, 5]];
const INITIAL_DIRECTION = DIRECTIONS.RIGHT;
const GAME_SPEED = 150;

export const useSnakeGame = (boardSize = 20) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Generate new food position
  const generateFood = useCallback(() => {
    while (true) {
      const newFood = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize)
      ];
      
      // Check if food spawns on snake
      const foodOnSnake = snake.some(
        ([x, y]) => x === newFood[0] && y === newFood[1]
      );
      
      if (!foodOnSnake) {
        return newFood;
      }
    }
  }, [snake, boardSize]);

  // Initialize food position
  useEffect(() => {
    if (!food && !gameOver) {
      setFood(generateFood());
    }
  }, [food, generateFood, gameOver]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return;

      const key = e.key.toLowerCase();
      const newDirection = {
        arrowup: DIRECTIONS.UP,
        w: DIRECTIONS.UP,
        arrowdown: DIRECTIONS.DOWN,
        s: DIRECTIONS.DOWN,
        arrowleft: DIRECTIONS.LEFT,
        a: DIRECTIONS.LEFT,
        arrowright: DIRECTIONS.RIGHT,
        d: DIRECTIONS.RIGHT,
      }[key];

      if (newDirection) {
        // Prevent 180-degree turns
        const isOppositeDirection = (
          newDirection[0] === -direction[0] && 
          newDirection[1] === -direction[1]
        );
        
        if (!isOppositeDirection) {
          setDirection(newDirection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, direction]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(currentSnake => {
        const head = currentSnake[0];
        const newHead = [
          head[0] + direction[0],
          head[1] + direction[1]
        ];

        // Check wall collision
        if (
          newHead[0] < 0 || 
          newHead[0] >= boardSize || 
          newHead[1] < 0 || 
          newHead[1] >= boardSize
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return currentSnake;
        }

        // Check self collision
        if (currentSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
          setGameOver(true);
          setIsPlaying(false);
          return currentSnake;
        }

        const newSnake = [newHead, ...currentSnake];
        
        // Check food collision
        if (food && newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [isPlaying, direction, food, generateFood, gameOver, boardSize]);

  const startGame = () => {
    if (gameOver) {
      resetGame();
    }
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  };

  return {
    snake,
    food,
    score,
    isPlaying,
    gameOver,
    startGame,
    pauseGame,
    resetGame
  };
};
