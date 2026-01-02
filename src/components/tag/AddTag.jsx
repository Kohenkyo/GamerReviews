import React from "react";

export const AddTag = async(tagData) => {

    const token = localStorage.getItem("jwtToken");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Tag/create-tag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(tagData),
        })

        if (!response.ok) {
            throw new Error("Error al registrar el tag");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        throw error;
    }
}
