import React, { useState, useEffect } from "react";
import Styles from "./MisReviews.module.css"

export const MisReviews = ({id}) => {
    const token = localStorage.getItem("jwtToken");
    const [reviews, ObtenerReviews] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/Login/getMisReviews?usuario_id=${id}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`},
        mode: "cors"
        })
        .then(res => res.json())
        .then(data => {
            ObtenerReviews(data.data || []);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {reviews.length === 0 ? (
                <p>No realizaste ninguna review todavia!</p>
            ) : (
                reviews.map(r => (
                    <div key={r.comentario_id} className={Styles["comment-box"]}>
                        <div className={Styles["coment-column"]}>
                            <p className={Styles["game-title"]}>{r.nombreJuego}</p>
                            <div className={Styles["comment-column"]}>
                                <p className={Styles["comment-text"]}>{r.comentario}</p>
                            </div>
                        </div>


                        <div className={Styles["action-column"]}>
                            <div className={Styles["score-box"]}>
                                <img
                                src="../src/assets/icon-star.svg"
                                alt="Star"
                                className={Styles["star-icon"]}
                                />
                                <p className={Styles["user-score"]}>{r.puntuacion}</p>
                            </div>
                        </div>

                    </div>
                ))
            )}
        </div>
    );
};
