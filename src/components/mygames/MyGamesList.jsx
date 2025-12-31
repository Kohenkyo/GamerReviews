import React, { useEffect, useState } from "react";
import GameCard from "../gamecard/GameCard.jsx";
import { useAuth } from "../login/AuthContext";

export const MyGamesList = () => {
  const [games, setGames] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;

  useEffect(() => {
    if (!usuarioId) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/get-my-games/${usuarioId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setGames(data.data);
      })
      .catch(err => console.error(err));
  }, [usuarioId]);

  if (!usuarioId) {
    return <p>Debes iniciar sesión para ver tus juegos.</p>;
  }

  return (
    <div className="games-container">
      {games.length === 0 ? (
        <p>No tienes juegos guardados aún.</p>
      ) : (
        games.map(game => (
        <GameCard key={game.id} game={game} />)
      ))}
    </div>
  );
};

export default MyGamesList;

