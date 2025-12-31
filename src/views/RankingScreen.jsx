import React from 'react'
import Styles from './RankingScreen.module.css'
import { TopRankingGames } from "../components/ranking/TopRankingGames.jsx";

export const RankingScreen = () => {
  return (
    <>
      <section>
          <div className={Styles['ranking-title']}>
            <img src="../src/assets/icon-star.svg" alt="Score" className={Styles['star-icon']} />
            <h1 className={Styles['title']}>Top 10 juegos</h1>
            <img src="../src/assets/icon-star.svg" alt="Score" className={Styles['star-icon']} />
          </div>
      </section>

      <section className='section-light'>
        <h2 className='subtitle'>Mejor Calificados</h2>
        <div className='games-container'>
          <TopRankingGames /> {/* 🚀 Ahora se carga dinámico */}
        </div>
      </section>
    </>
  )
}

