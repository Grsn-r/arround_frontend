import { useState } from "react";
import { Link } from "react-router-dom";
import '../blocks/login.css';


export default function Login({handleLogin}) {

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
    handleLogin(data);
}

    return (
        <>
        <Link to="/signup" className="login__link login__top" >Regístrate</Link>
        <div className="login" >
        <h1 className="login__title">Inicia sesión</h1>
        <form className="login__form"
        onSubmit={handleSubmit}>
            <input className="login__input" type="email" required name="email" placeholder="Correo electrónico" onChange={handleData}/>
            <input className="login__input" type="password" required name="password" placeholder="contraseña" onChange={handleData}/>
            <button className="login__button">Inicia sesión</button>
        </form>
        <Link to="/signup" className="login__link" >¿Aún no eres miembro? registrate aquí</Link>
        </div>
        </>
       
    )
}