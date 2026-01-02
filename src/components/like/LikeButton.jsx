import React, { useEffect, useState } from "react";
import Styles from "./LikeButton.module.css"; // para estilos
import { useAuth } from "../login/AuthContext";

const LikeButton = ({ comentarioId, initialLiked = false, initialCount = 0 }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const token = localStorage.getItem("jwtToken");
  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;

  const handleLike = async () => {
    try {
      if (!token || !usuarioId) {
        alert("Debes iniciar sesión para dar like");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Comentario/toggle-like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          comentarioId,
          usuarioId
        }),
      });

      if (res.ok) {
        const data = await res.json();

        setLiked(data.data?.liked || false);
        setLikeCount(data.data?.likeCount || 0);
      }
    } catch (err) {
      console.log("Error al dar like:", err);
    }
  };

  
 // ACA VA EL GET 
  
 useEffect(() => {
  const cargarLikes = async () => {
    try {
      let url = `${import.meta.env.VITE_API_BASE_URL}/Comentario/get-like?comentarioId=${comentarioId}`;
      if (usuarioId) url += `&usuarioId=${usuarioId}`; // opcional

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        const data = await res.json();

        setLiked(data.data?.liked || false);
        setLikeCount(data.data?.likeCount || 0);
      }
    } catch (err) {
      console.log("Error cargando likes:", err);
    }
  };

  cargarLikes();
}, [comentarioId, usuarioId]);



  return (
    <div className={Styles["like-container"]}>
      <img
        onClick={handleLike}
        src={
          liked
            ? "../src/assets/icon-heart-full.svg"
            : "../src/assets/icon-heart-empty.svg"
        }
        alt="Like"
        className={Styles["like-icon"]}
      />
      <p className={Styles["like-count"]}>{likeCount}</p>
    </div>
  );
};

export default LikeButton;

