import React, { useEffect, useState } from "react";
import Comment from "../comment/Comment.jsx";

export const CommentList = ({ juegoId, actualizar }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Comentario/get-comentarios/${juegoId}`, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        setComentarios(data.data || []);
      })
      .catch(err => console.error(err));
  }, [juegoId, actualizar]); // 👈 se vuelve a ejecutar cuando cambia 'actualizar'

  return (
    <div>
      {comentarios.length === 0 ? (
        <p>No hay comentarios aún. ¡Sé el primero en opinar!</p>
      ) : (
        comentarios.map(comentario => (
          <Comment key={comentario.comentarioId} comentario={comentario} />
        ))
      )}
    </div>
  );
};

export default CommentList;
