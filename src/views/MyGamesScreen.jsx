import React from 'react'
import { MyGamesList } from "../components/mygames/MyGamesList.jsx";

export const MyGamesScreen = () => {
  return (
    <>
      <section>
        <h2 className='subtitle'>Mis Favoritos</h2>
      </section>
      <section className='section-light'>
        <div className='games-container'>
          <MyGamesList /> {/* 🚀 Ahora se carga dinámico */}
        </div>
      </section>
    </>
  )
}

