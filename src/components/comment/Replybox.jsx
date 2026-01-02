import React, { useState } from "react";
import Styles from './Textbox.module.css';
import { useAuth } from "../login/AuthContext";

const Reply = ({ comentarioId, onRespuestaAgregada }) => {
  const [texto, setTexto] = useState("");
  const token = localStorage.getItem("jwtToken");
  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      alert("Debes iniciar sesión para responder");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Respuesta/add-respuesta`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                  },
        body: JSON.stringify({
          comentario: texto,
          comentarioId: comentarioId,
          usuarioId: usuarioId,
        }),
      });

      if (res.ok) {
        setTexto(""); // limpiar textarea
        if (onRespuestaAgregada) onRespuestaAgregada(); // notificar al padre para refrescar
      } else {
        console.log("Error al guardar la respuesta:", res.status);
      }
    } catch (err) {
      console.log("Error al enviar la respuesta:", err);
    }
  };

  return (
    <div className={Styles['replybox-container']}>
      <form onSubmit={handleSubmit} className={Styles["comment-form"]}>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu respuesta..."
          className="input"
        />

        <button type="submit" className="btn">Enviar respuesta</button>
        
      </form>
    </div>
  );
};

export default Reply;

