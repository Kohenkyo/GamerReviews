import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { UserIcon } from '../user_icon/UserIcon.jsx';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import Styles from './UserDropMenu.module.css';

export const UserDropMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // limpia el token y el estado
    navigate("/login"); // redirige al login
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={Styles['container']}>
        <div className={Styles['menu-wrapper']} ref={menuRef}>
          {/* User Icon Button */}
          {usuario === null ? (
          <Link to="/login">
            <UserIcon />
          </Link>
          ) : (
            <>

            <button
              onClick={() => setIsOpen(!isOpen)}
            >
              <UserIcon />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className={Styles['dropdown-menu']}>

                <Link to="/user">
                  <button onClick={() => {setIsOpen(false);}} className={Styles['menu-item-1']}>Perfil</button>
                </Link>

                {usuario.rol === 0 && (
                  <Link to="/admin">
                    <button onClick={() => {setIsOpen(false);}} className={Styles['menu-item-m']}>Administrar</button>
                  </Link>
                )}

                <button onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className={Styles['menu-item-2']}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDropMenu;
