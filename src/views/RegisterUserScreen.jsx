import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterLogin } from '../components/login/RegisterLogin'

export const RegisterUserScreen = () => {
    const navigate = useNavigate()

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const userData = {
            correo: formData.get('register-usuario'),
            contrasena: formData.get('register-password'),
            nombre: formData.get('register-nombre'),
            fechaInscripcion: new Date().toISOString()
        }

        try {
            await RegisterLogin(userData)
            navigate('/login')
        } catch (error) {
            console.error('Error al registrar el usuario:', error)
        }
    }

    return (
        <section className='section-flex'>
            <h2 className='subtitle'>Crear nueva cuenta</h2>

            <div>
                <form onSubmit={handleRegisterSubmit} className='form-container' id="register-login-form">

                    <label htmlFor="register-usuario">Correo</label>
                    <input type="email" className='input' id="register-usuario" name="register-usuario" required/>

                    <label htmlFor="register-nombre">Nombre</label>
                    <input type="text" className='input' id="register-nombre" name="register-nombre" required/>

                    <label htmlFor="register-password">Contraseña</label>
                    <input type="password" className='input' id="register-password" name="register-password" required/>

                    <button type='submit' className='btn submit-button'>Crear Cuenta</button>
                </form>
            </div>

        </section>
    )
}
