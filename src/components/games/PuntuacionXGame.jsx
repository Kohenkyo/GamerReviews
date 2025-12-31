import React, { useEffect, useState } from "react";
import Styles from './PuntuacionXGame.module.css'

export const PuntuacionXGame = ({ juegoId }) => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDatos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/getPuntuacion/NumReviews?juego_id=${juegoId}`, {
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos del juego");
        }

        const data = await response.json();
        setDatos(data.data);
      } catch (err) {
        console.error("Error al cargar datos del juego:", err);
        setError(err.message);
      }
    };

    fetchDatos();
  }, [juegoId]);

  if (error) return <p>Error: {error}</p>;
  if (!datos) return <p>Cargando...</p>;

  if (!datos || datos.cantidadReviews === 0) {
    return (
        <div className={Styles['game-stats-container']}>
            <p className={Styles['no-reviews']}>Este juego aún no tiene reseñas.</p>
        </div>
    );
    }
  return (
    <div className={Styles['game-stats-container']}>
      <div className={Styles['players-container']}>
        <img src="../src/assets/icon-joystick.svg" alt="Players" className={Styles['game-stats-icon']} />
        <p className={Styles['game-players']}>{datos.cantidadReviews}</p>
      </div>

      <div className={Styles['rating-container']}>
        <img src="../src/assets/icon-star.svg" alt="Score" className={Styles['game-stats-icon']} />
        <p className={Styles['game-rating']}>{datos.calificacion}</p>
      </div>
    </div>
  );
};
