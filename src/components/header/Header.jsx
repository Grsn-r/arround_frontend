import { useNavigate } from 'react-router-dom';
import logo from '../../images/header_img.svg'
import '../../index.css'

function Header({isLoggedIn, userData, logout}) {

    return (
        <header className="header page__section">
                    <img className="header__logo" src={logo} alt="logo header"/>
                    { isLoggedIn && ( <>
                    <p className='header__user' >{userData}</p> <button className='header__logout' onClick={logout} >Cerrar sesión</button>
                    </> ) }  
        </header>
    )
}

export default Header;