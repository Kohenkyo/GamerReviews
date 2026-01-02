import React, { useEffect, useState } from 'react';
import Styles from './GetAllUser.module.css';
import { useNavigate } from "react-router-dom";

export const GetAllUser = () => {
  const [usuariosActivos, setUsuariosActivos] = useState([]);
  const [usuariosInactivos, setUsuariosInactivos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken")

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Login/get-all-users`, {
        method: 'GET',
        headers: { accept: 'application/json',
          "Authorization": `Bearer ${token}`,
         },
      });

      const data = await res.json();

      if (data.success) {
        const activos = data.data.filter((u) => u.baja === 0);
        const inactivos = data.data.filter((u) => u.baja === 1);
        setUsuariosActivos(activos);
        setUsuariosInactivos(inactivos);
      }
    } catch (err) {
      console.log('Error al obtener usuarios:', err);
    }
  };

  const cambiarEstadoUsuario = async (usuarioId, nuevoEstado) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Login/change-user-state?id=${usuarioId}&baja=${nuevoEstado}`,
        {
          method: 'PUT',
          headers: { accept: 'application/json',
            "Authorization": `Bearer ${token}`,
           },
        }
      );

      const data = await res.json();
      alert(data.message);
      if (data.success) fetchUsuarios(); // Refresca la lista
    } catch (err) {
      console.log('Error al cambiar estado del usuario:', err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <section className='section-flex'>
      <div className='header'>
        <h2 className='subtitle'>Usuarios</h2>

        <button className="btn" onClick={() => navigate("/admin")}>
            Volver
        </button>
      </div>
      
      {/* Columna usuarios activos */}
      <div className={Styles['user-column']}>
        <h3 className='subtitle'>Usuarios Activos</h3>
        {usuariosActivos.length === 0 ? (
          <p>No hay usuarios activos</p>
        ) : (
          usuariosActivos.map((user) => (
            <div key={user.usuarioId} className={Styles['user-card']}>
              <img
                src={
                  user.perfilURL || "../src/assets/default-user.png"
                }
                alt={user.usuario}
                className={Styles['user-image']}
              />
              <div>
                <p><strong>{user.usuario}</strong></p>
                <p>{user.correo}</p>
              </div>
              <button
                className='btn'
                onClick={() =>
                  cambiarEstadoUsuario(user.usuarioId, 1)
                }
                style={user.rol === 0 ? { visibility: 'hidden' } : {}}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Columna usuarios inactivos */}
      <div className={Styles['user-column']}>
        <h3 className='subtitle'>Usuarios Inactivos</h3>
        {usuariosInactivos.length === 0 ? (
          <p>No hay usuarios inactivos</p>
        ) : (
          usuariosInactivos.map((user) => (
            <div key={user.usuarioId} className={Styles['user-card']}>
              <img
                src={
                  user.perfilURL ||
                  'https://via.placeholder.com/80x80?text=User'
                }
                alt={user.usuario}
                className={Styles['user-image']}
              />
              <div>
                <p><strong>{user.usuario}</strong></p>
                <p>{user.correo}</p>
              </div>
              <button
                className='btn'
                onClick={() =>
                  cambiarEstadoUsuario(user.usuarioId, 0)
                }
              >
                Dar de Alta
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

