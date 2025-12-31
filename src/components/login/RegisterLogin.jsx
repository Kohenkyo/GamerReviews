import React from "react";

export const RegisterLogin = async(userData) => {
    try {
        const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/Login/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error("Error al registrar usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        throw error;
    }
}
