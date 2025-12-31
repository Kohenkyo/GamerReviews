import React, { createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario({
          usuarioId: parseInt(decoded.usuarioId),
          usuario: decoded.usuario,
          rol: parseInt(decoded.rol)
        });

        // Marcar que la pestaña está activa
        sessionStorage.setItem("tabActive", "true");

        // Al cerrar la pestaña, eliminar el token
        window.addEventListener("unload", () => {
          if (sessionStorage.getItem("tabActive")) {
            localStorage.removeItem("jwtToken");
          }
        });

      } catch {
        setUsuario(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    try {
      const decoded = jwtDecode(token);
      setUsuario({
        usuarioId: parseInt(decoded.usuarioId),
        usuario: decoded.usuario,
        rol: parseInt(decoded.rol)
      });
    } catch {
      setUsuario(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



