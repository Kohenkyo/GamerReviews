import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./AddDeleteCarousel.module.css";

export const AddDeleteCarousel = () => {
  const [proxJuegos, setProxJuegos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  // 🔹 Cargar los juegos del carrusel
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/get-proxjuegos`, {
      method: "GET",
      headers: { accept: "application/json" ,},
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProxJuegos(data.data);
          console.log(data.data);
        } else {
          console.error("Error al obtener los juegos:", data.message);
        }
      })
      .catch((err) => console.error("Error de conexión:", err));
  }, []);

  // 🔹 Agregar nuevo juego
  const handleAddProxJuego = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/create-proxjuego`, {
        method: "POST",
        headers: {
              "Authorization": `Bearer ${token}`
          },
        body: formData,
      });

      if (!response.ok) throw new Error("Error al crear el próximo juego");

      const result = await response.json();
      alert(result.message || "✅ Próximo juego agregado");
      e.target.reset();

      // Refrescar lista
      const refresh = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/get-proxjuegos`);
      const refreshed = await refresh.json();
      setProxJuegos(refreshed.data);
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Ocurrió un error al crear el próximo juego");
    }
  };

  // 🔹 Eliminar (placeholder hasta que exista endpoint DELETE)
  const handleDelete = async (id,fotoVieja) => {
  if (!window.confirm("¿Seguro que querés eliminar este juego del carrusel?")) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/delete-proxjuego?id=${id}&imagenVieja=${fotoVieja}'`, {
      method: "DELETE",
      headers: {
              "Authorization": `Bearer ${token}`
          },
    });

    if (!response.ok) throw new Error("Error al eliminar el juego");

    const result = await response.json();
    alert(result.message);

    // Refrescar lista
    setProxJuegos((prev) => prev.filter((j) => j.id !== id));
  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("❌ No se pudo eliminar el juego");
  }
};

    return (
    <section className="section-flex">
      <div className='header'>
          <h2 className="subtitle">Editar Carrusel</h2>

          <button className="btn" onClick={() => navigate("/admin")}>
              Volver
          </button>
      </div>

      {/* 🔸 Lista de próximos juegos */}
      <div className={Styles["list-container"]}>
        <h3 className={Styles["section-subtitle"]}>Juegos Actuales</h3>
        {proxJuegos.length === 0 ? (
          <p>No hay juegos cargados.</p>
        ) : (
          <div className={Styles["cards-container"]}>
            {proxJuegos.map((juego) => (
              <div key={juego.id} className={Styles["game-card"]}>
                <img
                  src={juego.fotoUrl}
                  alt={juego.nombre}
                  className={Styles["game-image"]}
                />
                <p className={Styles["game-name"]}>{juego.nombre}</p>
                <button
                  className="btn delete-button"
                  onClick={() => handleDelete(juego.id,juego.fotoVieja)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔸 Formulario de carga */}
      <div>
        <form
          onSubmit={handleAddProxJuego}
          encType="multipart/form-data"
          className="form-container"
        >
          <h3 className={Styles["section-subtitle"]}>Agregar Nuevo Juego</h3>

          <label htmlFor="Nombre">Nombre</label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            required
            className="input"
          />

          <label htmlFor="Imagen">Imagen</label>
          <input
            type="file"
            id="Imagen"
            name="Imagen"
            accept="image/*"
            required
            className="input"
          />
          <p className="guide-text">Resolucion recomendada 1280x720 px</p>

          <button type="submit" className="btn submit-button">Agregar al Carrusel</button>
        </form>
      </div>
    </section>
  );
};

