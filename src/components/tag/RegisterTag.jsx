import React from "react";

export const RegisterTag = async(userData) =>{
    const token = localStorage.getItem("jwtToken")

    try {
            const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/Tag/insert-tagXgame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                throw new Error("Error al registrar tagXjuego");
            }

            return await response.json();
        } catch (error) {
            console.error("Error en la solicitud de registro:", error);
            throw error;
        }
}
