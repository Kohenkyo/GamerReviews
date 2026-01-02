import React from "react";

export const EditGame = async (data) => {

    console.log(data);
    const isFormData = data instanceof FormData;
    const token = localStorage.getItem("jwtToken");
    const headers = isFormData
    ? { "Authorization": `Bearer ${token}` }
    : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        };

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Juego/edit-game`, {
    method: "PATCH",
    body: isFormData ? data : JSON.stringify(data),
    headers,
    });

    if (!res.ok) throw new Error("Error al actualizar el juego");
    return await res.json();
};

