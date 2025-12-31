
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './AdminScreen.module.css';

export const AdminScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="section-flex">
        <h2 className='subtitle'>Administrar</h2>

        <div className={Styles['admin-buttons']}>
          <button className='btn' onClick={() => navigate('/addgame')}>Cargar Juego</button>
          <button className='btn' onClick={() => navigate('/managetag')}>Administrar Tags</button>
          <button className='btn' onClick={() => navigate('/editcarousel')}>Editar Carrusel</button>
          <button className='btn' onClick={() => navigate('/users')}>Ver Usuarios</button>
        </div>
      </section>
    </>
  );
};

