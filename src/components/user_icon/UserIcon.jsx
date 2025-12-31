import React, { useEffect, useState } from 'react';
import Styles from './UserIcon.module.css';
import { GetIconXUser } from './GetIconXUser.jsx';
import { useAuth } from '../login/AuthContext';

export const UserIcon = () => {
  const { usuario } = useAuth();
  const usuarioId = usuario?.usuarioId;
  const [usuarioval, setUsuario] = useState(null);

  useEffect(() => {
    if (!usuarioId) return;

    const cargarIconUser = async () => {
      try {
        const data = await GetIconXUser(usuarioId);
        setUsuario(data.data); // Guardás el usuario en el estado
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };

    cargarIconUser();
  }, [usuarioId]);

  return (
    <div className={Styles['user-frame']}>
      <img
        src={usuarioval?.perfilURL || "../src/assets/default-user.png"}
        className={Styles['user-icon']}
      />
    </div>
  );
};
