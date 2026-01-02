import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/login/AuthContext";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Login/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: correo.trim().toLowerCase(),
          contrasena: contrasena.trim()
        })
      });

      const data = await res.json();

      if (data.success) {
        login(data.data); // actualiza el contexto
        navigate("/");
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.log("Error en login:", err);
      alert("Hubo un error al iniciar sesión");
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div>
      <h1>Login</h1>

      <div className="section-flex">
        <form className="form-container small-form" id="login-form" onSubmit={handleLogin}>
          <label htmlFor="correo">Correo</label>
          <input type="text" className="input" id="correo" required />

          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" className="input" id="contrasena" required />

          <div className="form-buttons-group">
            <button
              type="button"
              className="text-highlight"
              onClick={handleCreateAccount}
            >
              Crear Cuenta
            </button>
            <button type="submit" className="btn submit-button">
              Iniciar sesion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

