import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import { useSnakeGame } from './hooks/useSnakeGame';

// PUBLIC_INTERFACE
function App() {
  const BOARD_SIZE = 20;
  const {
    snake,
    food,
    score,
    isPlaying,
    gameOver,
    startGame,
    pauseGame,
    resetGame
  } = useSnakeGame(BOARD_SIZE);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Snake Game</h1>
        <div className="score">Score: {score}</div>
        {gameOver && <div className="score">Game Over!</div>}
      </div>

      <GameBoard
        snake={snake}
        food={food}
        boardSize={BOARD_SIZE}
      />

      <GameControls
        isPlaying={isPlaying}
        onStart={startGame}
        onPause={pauseGame}
        onReset={resetGame}
      />

      <div className="instructions" style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Use arrow keys or WASD to control the snake</p>
      </div>
    </div>
  );
}

export default App;
