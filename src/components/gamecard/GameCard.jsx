import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./GameCard.module.css";

const GameCard = ({ game }) => {
  if (!game) return null;

  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/getPuntuacion/NumReviews?juego_id=${game.id}`, {
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
  }, [game.id]);


  let reviews;
  let score;

  if (!datos || datos.cantidadReviews === 0) {
    reviews = "0";
    score = "?";
  }
  else {
    reviews = datos.cantidadReviews;
    score = datos.calificacion;
  }

  return (
    <div className={Styles["game-card"]}>
      <img
        className={Styles["game-cover"]}
        src={game.imagenURL || "https://via.placeholder.com/300x150?text=Game"}
        alt={game.nombre}
      />

      <div className={Styles["game-info"]}>
        <h3 className={Styles["game-title"]}>{game.nombre}</h3>

        <Link to={`/game/${game.id}`}>
          <p className="btn btn-primary">Ver juego</p>
        </Link>

        <div className={Styles["game-stats-container"]}>
          <div className={Styles["players-container"]}>
            <img src="../src/assets/icon-joystick.svg" alt="Players" className={Styles['game-stats-icon']} />
            <p className={Styles['game-players']}>{reviews}</p>
          </div>

          <div className={Styles["rating-container"]}>
            <img src="../src/assets/icon-star.svg" alt="Score" className={Styles['game-stats-icon']} />
            <p className={Styles['game-rating']}>{score}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameCard; 

