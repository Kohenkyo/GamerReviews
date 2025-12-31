import React, { useEffect, useState } from "react";
import { ManageTagsScreen } from "../../views/ManageTagsScreen.jsx";
import { Spinner } from '../spinner/Spinner.jsx'

export const GetAllTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("${import.meta.env.VITE_API_BASE_URL}/Tag/get-tags", {
      method: "GET",
      mode: "cors"
    })
      .then(res => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then(data => {
            setTags(data.data);
      })
      .catch(err => {
        console.error("Error en el fetch:", err);
        setError("No se pudieron cargar los tags");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("jwtToken");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/Tag/delete-tag?tag_id=${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          setTags(prev => prev.filter(tag => tag.tag_id !== id));
        } else {
          console.error("Error al eliminar el tag");
        }
      })
      .catch(err => console.error("Error en DELETE:", err));
  };

  if (loading)
    return  <>
      <section className="section-flex">
        <Spinner />
      </section>
    </>;
  if (error) return <p>{error}</p>;

  return (
    <ManageTagsScreen tags={tags} onDelete={handleDelete} />
  );
};

export default GetAllTags;
