import React from "react";
import { useNavigate } from 'react-router-dom'
import { AddTag } from "../components/tag/AddTag";

export const ManageTagsScreen = ({ tags = [], onDelete }) => {
  const navigate = useNavigate()

  const handleTagsSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const tagData = {
        nombre: formData.get('register-tag')
    }

    try {
        await AddTag(tagData)
        navigate('/admin')
    } catch (error) {
        console.error('Error al registrar el tag:', error)
    }
  }

  return (
    <>
      <section className='section-flex'>
        <div className='header'>
            <h2 className='subtitle'>Crear nuevo Tag</h2>

            <button className="btn" onClick={() => navigate("/admin")}>
                Volver
            </button>
        </div>

        <div>
            <form onSubmit={handleTagsSubmit} className='form-container' id="register-tags-form">

                <label htmlFor="register-tag">Nombre del Tag:</label>
                <input type="text" className='input' id="register-tag" name="register-tag" required/>

                <button type='submit' className='btn submit-button'>Crear Tag</button>
            </form>
        </div>

        <div className='header'>
            <h2 className='subtitle'>Eliminar Tags</h2>
        </div>

        <table className='form-container'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(tag => (
              <tr key={tag.tag_id}>
                <td>{tag.tag_id}</td>
                <td>{tag.nombre}</td>
                <td>
                  <button onClick={() => onDelete(tag.tag_id)} className="btn">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
