// src/components/comment/Comment.jsx
import React, { useState, useEffect, useCallback } from "react";
import Styles from "./Comment.module.css";
import Replybox from "./Replybox.jsx";
import { UserIcon } from "../user_icon/UserIcon.jsx";
import { useAuth } from "../login/AuthContext";
import LikeButton from "../like/LikeButton.jsx";


const Comment = ({ comentario }) => {
  const [mostrarReply, setMostrarReply] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
 

   //const token = localStorage.getItem("jwtToken");
    const { usuario } = useAuth();
    const usuarioId = usuario?.usuarioId;
    const usuarioRol = usuario?.rol;
 

  // 🔹 cargar respuestas
  const cargarRespuestas = useCallback(async () => {
    try {
      if (!comentario?.comentarioId) return;
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Respuesta/get-respuestas/${comentario.comentarioId}`
      );
      if (res.ok) {
        const data = await res.json();
        setRespuestas(data.data || []);
      }
    } catch (err) {
      console.log("Error cargando respuestas:", err);
    }
  }, [comentario?.comentarioId]);

  useEffect(() => {
    cargarRespuestas();
  }, [cargarRespuestas]);

  

  // 🔹 eliminar comentario (solo dueño)
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este comentario?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("Debes iniciar sesión para eliminar el comentario");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Comentario/delete-comentario/${comentario.comentarioId}`,
        { 
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (res.ok) {
        alert("Comentario eliminado");
        window.location.reload(); // refrescar la página o levantar con state
      } else {
        console.log("Error eliminando comentario:", res.status);
      }
    } catch (err) {
      console.log("Error eliminando comentario:", err);
    }
  };

  if (!comentario) return null;

  return (
    <div>
      <div className={Styles["comment-box"]}>
        <div className={Styles['user-frame']}>
          <img
            src={comentario.perfilURL || "../src/assets/default-user.png"}
            className={Styles['user-icon']}
          />
        </div>

        <div className={Styles["comment-column"]}>
          <p className={Styles["user-name"]}>{comentario.usuarioNombre}</p>
          <p className={Styles["comment-text"]}>{comentario.texto}</p>
        </div>

        <div className={Styles["action-column"]}>
          <div className={Styles["score-box"]}>
            <img
              src="../src/assets/icon-star.svg"
              alt="Star"
              className={Styles["star-icon"]}
            />
            <p className={Styles["user-score"]}>{comentario.puntuacion}</p>
          </div>

          {/* Like toggle */}
          <div className={Styles["action-box"]}>
          <LikeButton
            comentarioId={comentario.comentarioId}
            initialLiked={comentario.likedByUser}
            initialCount={comentario.likeCount}     
          />

            {/* Reply */}
            <img
              onClick={localStorage.getItem("jwtToken") !== null ? () => setMostrarReply((prev) => !prev) : null}
              src={
                mostrarReply
                  ? "../src/assets/icon-cross.svg"
                  : "../src/assets/icon-reply.svg"
              }
              alt="Reply"
              className={Styles["action-icon"]}
            />
            <p className={Styles["comment-stats"]}>
              {respuestas.length > 0 && `${respuestas.length}`}
            </p>
          </div>

          {/* Delete solo si es dueño */}
          {(usuarioId === comentario.usuarioId || usuarioRol === 0) && (
            <button
              onClick={handleDelete}
              className="icon-button-container"
              style={{ marginTop: "1rem" }}
            >
              <img
                src="../src/assets/icon-trash.svg"
                alt="Trash"
                className="icon-button-image"
              />
            </button>
          )}
        </div>
      </div>

      <div className={Styles["replies-section"]}>
        {mostrarReply && (
          <Replybox
            comentarioId={comentario.comentarioId}
            onRespuestaAgregada={() => {
              setMostrarReply(false);
              cargarRespuestas();
            }}
          />
        )}

        {respuestas.length > 0 && (
          <div>
            {respuestas.map((r) => (
              <div key={r.respuestaId} className={Styles["reply-box"]}>
                <div className={Styles['user-frame']}>
                  <img
                    src={r.perfilUrl || "../src/assets/default-user.png"}
                    className={Styles['user-icon']}
                  />
                </div>
                <div className={Styles["comment-column"]}>
                  <p className={Styles["user-name"]}>{r.usuarioNombre}</p>
                  <p className={Styles["comment-text"]}>
                    {r.comentario || r.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;


