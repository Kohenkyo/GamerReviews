import React, { use } from "react";

export const EditUser = async(userData) =>{
    const token = localStorage.getItem("jwtToken");

    const form = new FormData();
    form.append("usuarioId", userData.usuarioId);
    form.append("correo", userData.correo);
    form.append("contrasena", userData.contrasena);
    form.append("nombre", userData.nombre);
    if (userData.perfilURL) {
        form.append("perfilURL", userData.perfilURL);
    }
    form.append("urlVieja",userData.urlVieja);


    try {
        const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/Login/update-user", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: form,
        });

        if (!response.ok) {
            throw new Error("Error al editar usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud de edicion:", error);
        throw error;
    }
}
