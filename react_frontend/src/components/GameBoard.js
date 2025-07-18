import React from 'react';

const GameBoard = ({ snake, food, boardSize }) => {
  const board = Array(boardSize).fill().map(() => Array(boardSize).fill('empty'));

  // Place snake on board
  snake.forEach(([x, y]) => {
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
      board[y][x] = 'snake';
    }
  });

  // Place food on board
  if (food && food[0] >= 0 && food[0] < boardSize && food[1] >= 0 && food[1] < boardSize) {
    board[food[1]][food[0]] = 'food';
  }

  return (
    <div 
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, var(--grid-size))`
      }}
    >
      {board.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`cell ${cell}`}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
