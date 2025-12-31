import React, { useEffect, useState } from "react";
import { useAuth } from "../components/login/AuthContext";
import { useNavigate } from "react-router-dom";
import Styles from './UserScreen.module.css'
import { EditUser } from "../components/user/EditUser";
import { GetUser } from "../components/user/GetUser";
import { UserIcon } from "../components/user_icon/UserIcon";
import { MisReviews } from "../components/misReviews/MisReviews";
import { Spinner } from '../components/spinner/Spinner.jsx'


export const UserScreen = () => {
  const navigate = useNavigate()

  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;

  const [usuarioDatos, setUsuario] = useState(null);

  const [formData, setFormData] = useState({
  nombre: '',
  correo: '',
  contrasena: '',
  perfilURL: null,
  foto: usuario?.foto || null
  });

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (!usuarioId) return;

    const cargarUsuario = async () => {
      try {
        const data = await GetUser(usuarioId);
        const usuario = data.data;
        setUsuario(usuario);
        setFormData({
          nombre: usuario.usuario || '',
          correo: usuario.correo || '',
          contrasena: '',
          perfilURL: null,
          foto: usuario.foto
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };

    cargarUsuario();
  }, [usuarioId]);


  const handleSubmit = async (e) => {
  e.preventDefault();

    try {
      await EditUser({
        usuarioId,
        correo: formData.correo,
        nombre: formData.nombre,
        contrasena: formData.contrasena,
        perfilURL: formData.perfilURL,
        urlVieja: usuarioDatos?.foto || null
      });
      navigate('/');
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  if (loading)
    return  <>
              <section className="section-flex">
                <Spinner />
              </section>
            </>;

  return (
    <>
      <section className={Styles['user-screen-container']}>
        <div className={Styles['subtitle-block']}>
          <h2 className="subtitle">{edit ? 'Mi Cuenta' : 'Editar mis datos'}</h2>

          {/* Boton edit */}
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
          </div>
        </div>

        {edit ?
        (<>
          <div className={Styles['user-info']}>
            <UserIcon />

            <p><span className='text-highlight'>Nombre: </span> {usuarioDatos?.usuario}</p>
            <p><span className='text-highlight'>Correo: </span> {usuarioDatos?.correo}</p>
          </div>


        </>)
        : (<>
            <form onSubmit={handleSubmit} className="form-container">
              <label htmlFor="perfilURL">Foto Perfil</label>
              <input
                type="file"
                id="perfilURL"
                name="perfilURL"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, perfilURL: e.target.files[0] })}
                className="input"
              />

              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
                className="input"
              />

              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="input"
              />

              <label htmlFor="contrasena">Nueva Contraseña (opcional)</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                placeholder="Deja en blanco si no deseas cambiarla"
                className="input"
              />

              <button type="submit" className="btn submit-button">Guardar cambios</button>
            </form>
        </>)}
      </section>

      <section className="section-light">

        <div className={Styles['comment-section-title']}>
          <img src="../src/assets/icon-comment.svg" alt="Score" className={Styles['comment-icon']} />
          <h2 className="subtitle">Mis reviews</h2>
        </div>

          <MisReviews id={usuarioId}/>
      </section>
  </>
  );

};

