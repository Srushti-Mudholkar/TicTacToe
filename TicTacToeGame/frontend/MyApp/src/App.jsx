import { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import Board from "./components/Board";
import GameHistory from "./components/GameHistory";
import axios from "axios";

export default function App() {
  const [players, setPlayers] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  const handlePlayersReady = async (players) => {
    const res = await axios.post("http://localhost:8000/api/games", {
      playerXId: players.playerX.id,
      playerOId: players.playerO.id,
    });
    setGameId(res.data.id);
    setPlayers(players);
  };

  const handleGameEnd = () => {
    setHistoryRefreshKey((prev) => prev + 1); // trigger re-fetch
  };

  return (
    <div>
      {!players ? (
        <PlayerForm onPlayersReady={handlePlayersReady} />
      ) : (
        <Board players={players} gameId={gameId} onGameEnd={handleGameEnd} />
      )}
      <GameHistory key={historyRefreshKey} />
    </div>
  );
}
