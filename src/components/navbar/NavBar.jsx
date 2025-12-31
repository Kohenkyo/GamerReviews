//NavBar
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Styles from './NavBar.module.css'
import { SearchBar } from '../search_bar/SearchBar.jsx'
import { UserDropMenu } from '../user_drop_menu/UserDropMenu.jsx';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (windowWidth >= 1200 && isOpen) {
      setIsOpen(false);
    }
  }, [windowWidth, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close side-menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]); // <-- add this effect

  const isMobile = windowWidth < 1200;

  return (
    <>
      {isMobile ? (
        <>        
          <nav className={`${Styles['nav-bar']} ${Styles['mobile']}`}>
            <button onClick={toggleMenu} className={Styles['menu-icon']}>
              <img
                src="../src/assets/icon-menu.svg"
                alt="Menu"/>
            </button>
            
            <Link to="/" className={Styles['logo-link']}>
              <img src="../src/assets/Logo.png" alt="Gamer Reviews" className={Styles['logo-img']} />
            </Link>
          </nav>

          <div className={`${Styles['side-menu']} ${isOpen ? Styles['open'] : ''}`}>
            <div className={Styles['side-menu-icons']}>
                <UserDropMenu />

              <button onClick={toggleMenu} className={Styles['menu-icon']}>
                <img
                  src="../src/assets/icon-cross.svg"
                  alt="Close"/>
              </button>
            </div>

            <div className={Styles['side-menu-links']}>
              <Link to="/ranking" className={Styles['nav-link']}>Ranking</Link>
              <Link to="/favorites" className={Styles['nav-link']}>Favoritos</Link>
            </div>

            <div>
              <SearchBar />
            </div>
          </div>

          {isOpen && (
            <div className={Styles['overlay']} onClick={toggleMenu} />
          )}
        </>
      )
      
      : (
        <nav className={Styles['nav-bar']}>
          <Link to="/" className={Styles['logo-link']}>
            <img src="../src/assets/Logo.png" alt="Gamer Reviews" className={Styles['logo-img']} />
          </Link>
          <Link to="/ranking" className={Styles['nav-link']}>Ranking</Link>
          <Link to="/favorites" className={Styles['nav-link']}>Favoritos</Link>

          <div className={Styles['nav-icons']}>
            <SearchBar />
            
            <UserDropMenu />
          </div>
        </nav>
      )}
    </>

  )
}

export default NavBar;

