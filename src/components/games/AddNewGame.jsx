import React from "react";
import { useNavigate } from "react-router-dom";

export const AddNewGame = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const handleAddGame = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const imagen = formData.get("Imagen");
    console.log("Imagen:", imagen);
    if (!imagen || imagen.size === 0) {
      alert("⚠️ Por favor seleccioná una imagen válida.");
      return;
    }

    const rawFecha = formData.get("FechaCreacion");
    const fechaFormateada = new Date(rawFecha).toISOString().split("T")[0]; // "YYYY-MM-DD"
    formData.set("FechaCreacion", fechaFormateada);

    try {
      const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/Juego/create-juego", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Error al crear el juego");
      }

      const result = await response.json();
      alert("Juego agregado correctamente ✅");
      navigate("/addgame");
    } catch (error) {
      alert("❌ Ocurrió un error al crear el juego");
    }
  };

  return (
    <section className="section-flex">
      <div className='header'>
        <h2 className="subtitle">Cargar Nuevo Juego</h2>

        <button className="btn" onClick={() => navigate("/admin")}>
            Volver
        </button>
      </div>
      
      <form
        onSubmit={handleAddGame}
        encType="multipart/form-data"
        className="form-container full-width-form"
      >
        <label htmlFor="Nombre">Nombre</label>
        <input type="text" id="Nombre" name="Nombre" required className="input" />

        <label htmlFor="Descripcion">Descripción</label>
        <textarea id="Descripcion" name="Descripcion" required className="input" />

        <label htmlFor="FechaCreacion">Fecha de creación</label>
        <input type="date" id="FechaCreacion" name="FechaCreacion" required className="input" />

        <label htmlFor="Desarrollador">Desarrollador</label>
        <input type="text" id="Desarrollador" name="Desarrollador" required className="input" />

        <label htmlFor="Editor">Editor</label>
        <input type="text" id="Editor" name="Editor" required className="input" />

        <label htmlFor="Plataforma">Plataforma</label>
        <input type="text" id="Plataforma" name="Plataforma" required className="input" />

        <label htmlFor="Imagen">Imagen</label>
        <input
          type="file"
          id="Imagen"
          name="Imagen"
          accept="image/*"
          className="input"
          required
        />

        <button type="submit" className="btn submit-button">Cargar Juego</button>
      </form>
    </section>
  );
};
