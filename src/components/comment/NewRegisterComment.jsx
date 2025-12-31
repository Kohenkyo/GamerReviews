import React, { useState } from "react";
import Styles from './Textbox.module.css'
import { RegisterComment } from "../comment/RegisterComment";
import { useAuth } from "../login/AuthContext";

export const NewRegisterComment = ({ juegoId, onComentarioAgregado }) => {
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);
  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;

  const handleAddComentario = async (e) => {
    e.preventDefault();

  if (!usuarioId) {
      alert("Debes iniciar sesión para responder");
      return;
    }  
    
    const commentData = {
      comentario: nuevoComentario,
      puntuacion: puntuacion,
      usuarioId: usuarioId,
      juegoId
    };

    try {
      await RegisterComment(commentData);
      setNuevoComentario("");
      setPuntuacion(5);
      if (onComentarioAgregado) onComentarioAgregado(); // 👈 notifica al padre
    } catch (error) {
      console.log("Error al registrar el comentario:", error);
    }
  };

  return (
    <div className={Styles['textbox-container']}>
      <p className={Styles['subtitle']}>Escribir review</p>

      <form onSubmit={handleAddComentario} className={Styles["comment-form"]}>
        <div className={Styles['review-row']}>
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribí tu review..."
            required
            className="input"
          />
          <select value={puntuacion} onChange={(e) => setPuntuacion(e.target.value)} required className={Styles["score-combo"]}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}> {num} ⭐</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn">Agregar comentario</button>

      </form>
    </div>
  );
};

export default NewRegisterComment;

