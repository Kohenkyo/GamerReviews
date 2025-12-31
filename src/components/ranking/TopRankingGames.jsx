import React, { useEffect, useState } from "react";
import GameCard from "../gamecard/GameCard.jsx";
import { Spinner } from '../spinner/Spinner.jsx'

export const TopRankingGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/get-ranking`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setGames(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!games) {
    return <p>No hay juego en el ranking todavia!</p>;
  }

  return (
    <div className="games-container">
      {games.length === 0 ? (
        <Spinner />
      ) : (
        games.map(game => (
        <GameCard key={game.id} game={game} />)
      ))}
    </div>
  );
};

export default TopRankingGames;

