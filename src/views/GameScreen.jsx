import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from './GameScreen.module.css'
import FavoriteGame from "../components/favoritegame/FavoriteGame.jsx";
import CommentList from "../components/comment/CommentList.jsx";
import NewRegisterComment from "../components/comment/NewRegisterComment.jsx";
import { useAuth } from "../components/login/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { EditGame } from "../components/games/EditGame.jsx";
import { PuntuacionXGame } from "../components/games/PuntuacionXGame.jsx";
import { Spinner } from '../components/spinner/Spinner.jsx'

export const GameScreen = () => {
  const { id } = useParams(); // 👈 este es el id que pasamos desde GameCard
  const [game, setGame] = useState(null);
  const [comentariosActualizados, setComentariosActualizados] = useState(false);
  const { usuario } = useAuth();
  const usuarioRol = usuario?.rol;
  const [edit, setEdit] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/get-one-game?game_id=${id}`,
      {
        method: "GET",
        mode: "cors"
      })
      .then(res => res.json())
      .then(data => {
        setGame(data.data); // ✅ Guardás solo el objeto del juego
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleEditGame = async (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      formData.append("JuegoId", id);
      formData.append("FechaPublicacion", formData.get("FechaPublicacion"));
      formData.append("imagenVieja",game.imagenVieja)
      // Si el admin eligió una nueva imagen
        const fileInput = document.getElementById("imagenInput");
          if (fileInput && fileInput.files.length > 0) {
            formData.append("imagen", fileInput.files[0]);
          }
          console.log(formData);
          try {
            await EditGame(formData); // <-- Asegurate que EditGame soporte FormData
            navigate("/");
          } catch (error) {
            console.error("Error al editar el juego:", error);
          }
  }

  if (!game) 
      return  <>
              <section className="section-flex">
                <Spinner />
              </section>
            </>;

  return (
    <>
      {edit ?
      (<>
        {/* Vista juego VER */}
        <section className={Styles['game-info-container']}>
          <div className={Styles['game-info-column']}>
            <div className={Styles['game-title-block']}>
              <h2 className='subtitle'>{game.nombre}</h2>

              {/* Botones adimin */}
              {usuarioRol === 0 && 
                <div className={Styles['admin-buttons']}>
                  <button className="icon-button-container">
                    <img
                      onClick={() => setEdit(!edit)}
                      src={
                        edit
                          ? "../src/assets/icon-edit.svg"
                          : "../src/assets/icon-cross.svg"
                      }
                      alt="Edit"
                      className="icon-button-image"
                    />
                  </button>

                  <button className="icon-button-container">
                    <img
                      onClick={async () => {
                        if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
                          try {
                            const token = localStorage.getItem("jwtToken");
                            const res = await fetch(
                              `${import.meta.env.VITE_API_BASE_URL}/Juego/delete-juego?id=${id}`,
                              {
                                method: "DELETE",
                                headers: { 
                                    "accept": "application/json" ,
                                    "Authorization": `Bearer ${token}`,
                                },
                              }
                            );
                            const data = await res.json();
                            alert(data.message);
                            if (data.success) navigate("/");
                          } catch (err) {
                            console.error("Error al dar de baja el juego:", err);
                          }
                        }
                      }}
                      src="../src/assets/icon-trash.svg"
                      alt="Delete"
                      className="icon-button-image"
                    />
                  </button>
                </div>}
            </div>

            <div className={Styles['game-info']}>
              <p><span className='text-highlight'>Desarrollador:</span> {game.desarrollador || "N/A"}</p>
              <p><span className='text-highlight'>Editor:</span> {game.editor || "N/A"}</p>
              <p><span className='text-highlight'>Plataformas:</span> {game.plataforma || "N/A"}</p>
              <p><span className='text-highlight'>Fecha de Lanzamiento:</span> {new Date(game.fechaPublicacion).toISOString().split('T')[0]}</p>

              <div className={Styles['tags-container']}>
                {game.tags?.length > 0 && (
                  game.tags.map(tag => 
                  (<div className={Styles['tag']} key={tag.nombre}>
                    <p>{tag.nombre}</p>
                  </div>))
                )}

                {usuarioRol === 0 &&
                  <button
                    onClick={() => navigate(`/tagsxgames/${id}`)}
                    className='btn'>
                      +
                  </button>
                }
              </div>
            </div>

            <p className={Styles['game-description']}>{game.descripcion}</p>

            <PuntuacionXGame juegoId={id} />
          </div>
          
          <div className={Styles['game-image-column']}>
            <img
              src={game.imagenURL || "https://via.placeholder.com/300x150?text=Game"}
              alt={game.nombre}
              className={Styles['game-image']}
            />
            
            <FavoriteGame juegoId={id} />

          </div>
        </section>
      </>) : (<>
        {/* Vista juego EDITAR */}
        <section className={Styles['game-info-container']}>
          <div className={Styles['game-info-column']}>
            <form onSubmit={handleEditGame}>
              <div className={Styles['game-title-block']}>
                <div className={Styles['game-info']}>
                  <label htmlFor="desarrollador" className='text-highlight'>Titulo: </label>
                  <input type="text" id="nombre" name="nombre" defaultValue={game.nombre} className="input"/>
                </div>

              {/* Botones adimin */}
              {usuarioRol === 0 && 
                <div className={Styles['admin-buttons']}>
                  <button className="icon-button-container">
                    <img
                      onClick={() => setEdit(!edit)}
                      src={
                        edit
                          ? "../src/assets/icon-edit.svg"
                          : "../src/assets/icon-cross.svg"
                      }
                      alt="Edit"
                      className="icon-button-image"
                    />
                  </button>

                  <button
                    className="icon-button-container"
                    onClick={async () => {
                      if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
                        try {
                          const res = await fetch(
                            `${import.meta.env.VITE_API_BASE_URL}/Juego/delete-juego?id=${id}`,
                            {
                              method: "DELETE",
                              headers: { "accept": "application/json" },
                            }
                          );
                          const data = await res.json();
                          alert(data.message);
                          if (data.success) navigate("/");
                        } catch (err) {
                          console.error("Error al dar de baja el juego:", err);
                        }
                      }
                    }}
                  >
                    <img
                      src="../src/assets/icon-trash.svg"
                      alt="Delete"
                      className="icon-button-image"
                    />
                  </button>
                </div>}

              </div>

              <div className={Styles['game-info']}>
                <label htmlFor="desarrollador" className='text-highlight'>Desarrollador: </label>
                <input type="text" id="desarrollador" name="desarrollador" defaultValue={game.desarrollador || "N/A"} className="input"/>

                <label htmlFor="editor" className='text-highlight'>Editor: </label>
                <input type="text" id="editor" name="editor" defaultValue={game.editor || "N/A"} className="input"/>

                <label htmlFor="plataforma" className='text-highlight'>Plataformas:</label>
                <input type="text" id="plataforma" name="plataforma" defaultValue={game.plataforma || "N/A"} className="input"/>

                <label htmlFor="plataforma" className='text-highlight'>Fecha de Lanzamiento: :</label>
                <input type="date" id="FechaPublicacion" name="FechaPublicacion" defaultValue={new Date(game.fechaPublicacion).toISOString().split('T')[0]} className="input"/>
              </div>

              <textarea name="descripcion" id="descripcion" defaultValue={game.descripcion} className="input"></textarea>

              <button type="submit" className="btn submit-button">Actualizar</button>
            </form>

            <div className={Styles['game-stats-container']}>
              <div className={Styles['players-container']}>
                <img src="../src/assets/icon-joystick.svg" alt="Players" className={Styles['game-stats-icon']} />
                <p className={Styles['game-players']}>15427</p>
              </div>

              <div className={Styles['rating-container']}>
                <img src="../src/assets/icon-star.svg" alt="Score" className={Styles['game-stats-icon']} />
                <p className={Styles['game-rating']}>4.5</p>
              </div>
            </div>
          </div>
          
          <div className={Styles['game-image-column']}>
            <img
              src={game.imagenURL || "https://via.placeholder.com/300x150?text=Game"}
              alt={game.nombre}
              className={Styles['game-image']}
            />
            {/* Botón Cambiar Foto (solo admin) */}
            {usuarioRol === 0 && (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("imagenInput").click()}
                style={{ marginTop: "1rem" }}
              >
                Cambiar Cover
              </button>
              <input
                type="file"
                id="imagenInput"
                name="imagen"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // vista previa instantánea sin guardar aún
                    const previewURL = URL.createObjectURL(file);
                    setGame((prev) => ({ ...prev, imagenURL: previewURL }));
                  }
                }}
              />
            </>
          )}
            
            <FavoriteGame juegoId={id} />

          </div>
        </section>
      </>)}


      {/* Sección de comentarios */}
      <section className={`section-light ${Styles['comment-section']}`}>
        <div className={Styles['comment-section-title']}>
          <img src="../src/assets/icon-comment.svg" alt="Score" className={Styles['comment-icon']} />
          <h2>Reviews</h2>
        </div>

        <div className={Styles['comments-container']}>
          {localStorage.getItem("jwtToken") !== null && <NewRegisterComment juegoId={id} onComentarioAgregado={() => setComentariosActualizados(prev => !prev)} />}

          <CommentList juegoId={id} actualizar={comentariosActualizados} />
        </div>

      </section>
    </>
  );
};

