import { useEffect, useState } from "react";
import axios from "axios";

export default function GameHistory() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const res = await axios.get("http://localhost:8000/api/games/history");
      setGames(res.data);
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Game History</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            Game {game.id}: {game.playerX?.name} vs {game.playerO?.name} →{" "}
           {game.isDraw ? "Draw" : game.winner ? `Winner: ${game.winner.name}` : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
