import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from './Footer.module.css'

export const Footer = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

  return (
    <footer className={Styles['footer']}>
        <Link to="/" className={Styles['logo-link']} onClick={() => useLayoutEffect()}>
            <img src="../src/assets/Logo.png" alt="Gamer Reviews" className={Styles['logo-img']} />
        </Link>

        <p>Todos los derechos reservados - 2025</p>
    </footer>
  )
}

