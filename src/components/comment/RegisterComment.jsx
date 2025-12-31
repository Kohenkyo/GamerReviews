export const RegisterComment = async(commentData) => {
    
    try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/Comentario/add-comentario", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData),
    })

    if (!response.ok) {
        throw new Error("Cerra sesion e Iniciá otra VEZ!!");
    }

    return await response.json();
    } catch (error) {
        console.log("Error en la solicitud:", error);
        throw error;
    }
    
}
