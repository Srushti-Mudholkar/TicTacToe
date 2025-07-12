import { useState } from "react";
import axios from "axios";
import { checkWinner } from "../utils/checkWinner";

export default function Board({ players, gameId, onGameEnd }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [moveCount, setMoveCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = async (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const playerId = turn === "X" ? players.playerX.id : players.playerO.id;

    try {
      await axios.post(`http://localhost:8000/api/games/${gameId}/move`, {
        playerId,
        cellIndex: index,
        symbol: turn,
        moveOrder: moveCount + 1,
      });

      const result = checkWinner(newBoard);
      if (result) {
        setGameOver(true);
        setWinner(result === "D" ? "Draw" : result);
        onGameEnd(); // ✅ trigger GameHistory refresh
      }

      setMoveCount(moveCount + 1);
      setTurn(turn === "X" ? "O" : "X");
    } catch (error) {
      console.error("Move error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Turn: {turn}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: 100,
              height: 100,
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      {gameOver && (
        <h3>Game Over: {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}</h3>
      )}
    </div>
  );
}
