import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../blocks/register.css'


export default function Register({ handleRegister, children }) {

    const [data, setData] = useState({
    email: "",
    password: "",
});

const handleData = (e) => {
    const {name, value} = e.target;

    setData((prevData) => (
        {...prevData,
            [name]: value,
        }
    ))
};

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(data);
    }

    return (
        <>
        <Link to="/signin" className="register__link register__top" >Inicia sesión</Link>
        <div className="register" >
        <h1 className="register__title">Regístrate</h1>
        <form className="register__form"
        onSubmit={handleSubmit}>
            <input className="register__input" type="email" required name="email" placeholder="Correo electrónico" onChange={handleData}/>
            <input className="register__input" type="password" required name="password" placeholder="contraseña" onChange={handleData}/>
            <button className="register__button">Regístrate</button>
        </form>
        <Link to="/signin" className="register__link" >¿Ya eres miembro? Inicia sesión aquí</Link>
        {children}
        </div>
        </>
    )
}