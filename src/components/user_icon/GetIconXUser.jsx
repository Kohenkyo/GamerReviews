import React from "react";

export const GetIconXUser = async (usuarioId) =>{
    const token = localStorage.getItem("jwtToken");
    try
    {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Login/getIconXUser?usuario_id=${usuarioId}`,{
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if(!response.ok){
            throw new Error("Error al traer los datos");
        }

        const data = await response.json();
        return data;
    } 
    catch (err) 
    {
    console.error("Error:", err);
    throw err;
    }
}
