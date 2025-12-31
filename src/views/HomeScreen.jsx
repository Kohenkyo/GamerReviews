import React from 'react'
import { Carousel } from '../components/carousel/Carousel.jsx'
import { LazyGameList } from "../components/gameList/LazyGameList.jsx";

export const HomeScreen = () => {
  return (
    <>
      <section>
        <h2 className='subtitle'>Próximos Lanzamientos</h2>
      </section>
      <Carousel />

      <section className='section-light'>
        <h2 className='subtitle'>Juegos Recientes</h2>
        <div className='games-container'>
          <LazyGameList /> {/* 🚀 Ahora se carga dinámico */}
        </div>
      </section>
    </>
  )
}

