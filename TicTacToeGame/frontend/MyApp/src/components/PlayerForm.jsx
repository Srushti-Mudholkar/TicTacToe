import { useState } from "react";
import axios from "axios";

export default function PlayerForm({ onPlayersReady }) {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  const handleStart = async () => {
    const resX = await axios.post("http://localhost:8000/api/players", { name: playerX });
    const resO = await axios.post("http://localhost:8000/api/players", { name: playerO });

    onPlayersReady({ playerX: resX.data, playerO: resO.data });
  };

  return (
    <div>
      <input style = {{marginRight : '20px'}} placeholder="Player X" onChange={(e) => setPlayerX(e.target.value)} />
      <input style = {{marginRight : '20px'}} placeholder="Player O" onChange={(e) => setPlayerO(e.target.value)} />
      <button style = {{color : 'yellow', backgroundColor : 'green'}}onClick={handleStart}>Start Game</button>
    </div>
  );
}
