import React, { useState } from "react";
import { RegisterTag } from "../components/tag/RegisterTag";
import { useNavigate } from 'react-router-dom';

export const AddTagsXGameScreen = ({ tags = [], assignedTags = [], gameId, deleteTagXgame, onTagAdded }) => {
  const [selectedTagId, setSelectedTagId] = useState("");
  const id = gameId;
  const navigate = useNavigate();

  const handleTagXGameSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {
      juego_id: id,
      tag_id: formData.get('tag-select'),
    };

    try {
      await RegisterTag(userData);
      setSelectedTagId(""); // limpia el select
      onTagAdded(); // refresca
    } catch (error) {
      console.error('Error al registrar el tag:', error);
    }
  };


  return (
    <section className='section-flex'>
        <div className='header'>
            <h2 className='subtitle'>Crear nuevo Tag</h2>

            <button className="btn" onClick={() => navigate(`/game/${id}`)}>
                Volver
            </button>
        </div>
        
        <form onSubmit={handleTagXGameSubmit} className='form-container' id="register-tagxgame-form">
            <div>
                <label htmlFor="tag-select">Seleccionar tag:</label>
                <select className="input"
                    id="tag-select"
                    name="tag-select"
                    value={selectedTagId}
                    onChange={e => setSelectedTagId(e.target.value)}
                >

                    <option value="">-- Selecciona un tag --</option>
                    {tags.map(tag => (
                        <option key={tag.tag_id} value={tag.tag_id}>
                        {tag.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <button type='submit' className='btn submit-button'>Agregar tag</button>
        </form>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {assignedTags.map(tag => (
                        <tr key={tag.tag_id}>
                        <td>{tag.tag_id}</td>
                        <td>{tag.nombre}</td>
                        <td>
                            <button onClick={() => deleteTagXgame(id,tag.tag_id)} className="btn">Eliminar</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
  );
};
