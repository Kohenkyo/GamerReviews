import React from "react";

export const GetUser = async (usuarioId) =>{
    const token = localStorage.getItem("jwtToken");

    try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Login/get-user?usuario_id=${usuarioId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error al cargar usuario:", err);
    throw err;
  }

}
