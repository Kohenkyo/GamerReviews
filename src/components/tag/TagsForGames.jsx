import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddTagsXGameScreen } from "../../views/AddTagsXGameScreen.jsx";
import { Spinner } from '../spinner/Spinner.jsx'

export const TagsForGames = () => {
  const { gameId } = useParams();
  const [tags, setTags] = useState([]);
  const [assignedTags, setAssignedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Tag/get-tags`, {
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
  }, []);

  const fetchAssignedTags = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Tag/get-tagsXgame?juego_id=${gameId}`, {
      method: "GET",
      mode: "cors"
    })
      .then(res => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then(data => {
        setAssignedTags(data.data);
      })
      .catch(err => {
        console.error("Error en el fetch:", err);
        setError("No se pudieron cargar los tags");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
  fetchAssignedTags();
  }, []);

  const handleDelete = (juego_id, tag_id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que querés eliminar este tag?");
    if (!confirmDelete) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/Tag/delete-tagXgame?juego_id=${juego_id}&tag_id=${tag_id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          console.log("Se eliminó correctamente");
          fetchAssignedTags(); // refresca
        } else {
          console.error("Error al eliminar el tag");
        }
      })
      .catch(err => console.error("Error en DELETE:", err));
  };


  if (loading)
    return <>
      <section className="section-flex">
        <Spinner />
      </section>
    </>;
  if (error) return <p>{error}</p>;

  return (
    <AddTagsXGameScreen
      tags={tags}
      assignedTags={assignedTags}
      gameId={gameId}
      deleteTagXgame={handleDelete}
      onTagAdded={fetchAssignedTags}
    />
  );
};

export default TagsForGames;
