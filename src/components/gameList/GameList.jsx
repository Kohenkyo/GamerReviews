import React, { useEffect, useState } from "react";
import GameCard from "../gamecard/GameCard.jsx";

export const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("${import.meta.env.VITE_API_BASE_URL}/Juego/get-all-games",
      {
        method: "GET",
        mode: "cors"
      }
    )
      .then(res => res.json())
      .then(data => {
        setGames(data.data || []); // 👈 usar la propiedad "data" del JSON
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="games-container">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;

