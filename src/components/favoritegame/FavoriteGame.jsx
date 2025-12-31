// src/components/favoritegame/FavoriteGame.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../login/AuthContext";
import Styles from "./FavoriteGame.module.css";

const FavoriteGame = ({ juegoId }) => {
  const [favorito, setFavorito] = useState(false);
  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;
  const token = localStorage.getItem("jwtToken");

  // 🔹 Al montar, verificar si ya está en favoritos
  useEffect(() => {
    const checkFavorito = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/Juego/is-favorite?usuarioId=${usuarioId}&juegoId=${juegoId}`
        );
        if (res.ok) {
          const data = await res.json();
          setFavorito(data.data.isFavorite); // 👈 Backend devuelve true/false
        }
      } catch (err) {
        console.log("Error verificando favorito:", err);
      }
    };

    if (usuarioId) checkFavorito();
  }, [usuarioId, juegoId]);

  // 🔹 Toggle favorito
  const handleToggleFavorito = async () => {
    try {
      const res = await fetch("${import.meta.env.VITE_API_BASE_URL}/Juego/add-favorite-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          usuarioId,
          juegoId,
          botonCheck: !favorito,
        }),
      });

      if (res.ok) {
        
        setFavorito(!favorito);
      }
    } catch (err) {
      console.log("Error al actualizar favorito:", err);
    }
  };

  return (
    <div className={Styles["favorite-game-container"]}>
      <img
        onClick={handleToggleFavorito}
        src={
          favorito
            ? "../src/assets/icon-heart-full.svg"
            : "../src/assets/icon-heart-empty.svg"
        }
        alt="Favorite"
        className={Styles["favorite-icon"]}
      />
    </div>
  );
};

export default FavoriteGame;

