import '../index.css'
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import api from '../utils/api';
import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ImagePopup from './main/components/Popup/ImagePopup/ImagePopup'
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth'
import InfoToolTip from './InfoToolTip';
import Spinner from './Spinner';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isRegistred, setIsRegistred] = useState(false);
  const [infoTool, setInfoTool] = useState(null);
  const [email, setEmail] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

function handleOpenPopup(popup) {
  setPopup(popup);
};
  
  
function handleClosePopup() {
  setPopup(null)
};

const navigate = useNavigate();

const handleRegister = ({email, password}) => {
  auth.register(email , password)
  .then((data) => {
    if (data) {
      setIsRegistred(true);
      setInfoTool(true)
      setTimeout(() => {navigate("/signin")}, 2000);
    }
  })
  .catch((err) => {
    setIsRegistred(false);
    setInfoTool(true);
    if (err === 400) {
      return console.error(`Error: ${err} uno de los campos se rellenó de forma incorrecta`);
    }
    return console.error(`Error: ${err}intenta con otros datos`);
  })
}

const handleLogIn = ({email, password}) => {
  if (email && password) {
    auth.login(email, password)
    .then((data) => {
      if (data && data.token) {
      setIsLoggedIn(true);
      api.setAuthToken(data.token);
      Promise.all([
        api.getUserInfo(),
        api.getCardList(),
      ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setEmail(userData.email);
        setCards(cardsData);
      });
      }
      navigate('/');
    })
    .catch(error => console.error(error));
  }
}

//conservar sesion al refrescar página
useEffect(() => {
  setIsCheckingAuth(true); //mientras se realizan las verificaciones
  const token = localStorage.getItem('jwt');
    if (!token) {
      setIsCheckingAuth(false)
      setIsLoggedIn(false);
      localStorage.removeItem('jwt');
    } else {
      api.setAuthToken(token);
      setIsLoggedIn(true);
      Promise.all([
        api.getUserInfo(),
        api.getCardList(),
      ])
      .then(([userData, cardsData]) => {
        setIsCheckingAuth(false)
        setIsLoggedIn(true);
        setCurrentUser(userData);
        setEmail(userData.email);
        setCards(cardsData);
        navigate('/');
      })
      .catch((err) => {
        setIsCheckingAuth(false)
        console.error('token inválido', err);
        setIsLoggedIn(false);
      })
    }
}, []);

const logout = () => {
  localStorage.removeItem('jwt');
  setIsLoggedIn(false);
  navigate('/signin');
}


function handleCardLike(card) {
  const isLiked = card.likes.some(userId => userId === currentUser._id);
    api.likeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((currentCard) => 
      currentCard._id === card._id ? newCard : currentCard ));
    })
  .catch((error) => console.error(error));
};

function handleCardDelete(card) {
  api.eraseCard(card._id).then(() =>{
    setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
  }). catch((error) => console.error(error));
}

const handleAddPlaceSubmit = (data) => {
  api.addCard(data).then((newCard) => {
    setCards([newCard, ...cards]);
    handleClosePopup();
  })
  .catch((error) => console.error(error))
}

const handleUpdateAvatar = (data) => {
  api.setUserAvatar(data)
  .then((newData) => {
    setCurrentUser(newData);
    handleClosePopup();
  })
  .catch((error) => console.error(error));
};

    
function handleImageClick(imageData) {
  const imagePopup = {
    title: null,
    children: <ImagePopup card={imageData} />
  };
  setPopup(imagePopup);
};

const handleUpdateUser = (data) => {
  api.setUserInfo(data).then((newData) => {
    setCurrentUser(newData);
    handleClosePopup();
  })
  .catch((error) => console.error(error))
};

  return (
<div className="page">
  <CurrentUserContext.Provider value={{currentUser,
    handleUpdateUser, 
    handleUpdateAvatar,
    handleAddPlaceSubmit,
    isLoggedIn}}>
    <Header 
    isLoggedIn={isLoggedIn}
    userData={email}
    logout={logout}
    />
    <Routes>
      <Route path="/" element={
        isCheckingAuth ? <Spinner/> : <ProtectedRoute>
          <Main cards={cards}
    onOpenPopup={handleOpenPopup}
    onClosePopup={handleClosePopup}
    onCardLike={handleCardLike}
    onCardClick={handleImageClick}
    onCardDelete={handleCardDelete}
    popup={popup}/>
        </ProtectedRoute>
      } />
      <Route path="/signin" element={
        <Login handleLogin={handleLogIn} />
      } />
      <Route path="/signup" element={
        <Register
        handleRegister={handleRegister}
        >
          {infoTool && <InfoToolTip onClose={() => setInfoTool(null)} isRegistred={isRegistred} />}
        </Register>
      } />
    </Routes>
    <Footer />
  </CurrentUserContext.Provider>
</div>
  );
}

export default App