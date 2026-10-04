import { useContext } from 'react'
import Card from './components/Card/Card'
import Popup from './components/Popup/Popup'
import EditProfile from './components/Popup/EditProfile/EditProfile'
import EditAvatar from './components/Popup/EditAvatar/EditAvatar'
import NewCard from './components/Popup/NewCard/NewCard'
import editAvatarBtn from '../../images/edit_avatar_btn.png'
import editButton from '../../images/edit-button.png'
import addButton from '../../images/add-btn-img.png'
import '../../index.css'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Main({onOpenPopup, onClosePopup, popup, cards, onCardLike, onCardClick, onCardDelete}) {
    const {currentUser} = useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile />};
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar />};

    return (
        <main>
            <section className="profile">
            <div className="profile__avatar-container"> <img className="profile__avatar" src={currentUser.avatar} alt="foto de perfil"/>
            <img className="profile__avatar_edit" src={editAvatarBtn} alt="editar foto" onClick={() => onOpenPopup(editAvatarPopup)}/></div>
            <div className="profile__info">
                <p className="profile__info profile__info_name">{currentUser.name}</p>
                <p className="profile__info profile__info_explorer">{currentUser.about}</p>
            </div>
            <img className="edit-button" src={editButton} alt="boton de editar" onClick={() => onOpenPopup(editProfilePopup)}/>
            <div className="profile__add-button"onClick={() => onOpenPopup(newCardPopup)}>
                <img className="profile__add-button profile__add-button_img" src={addButton} alt="boton de añadir" />
            </div>
            </section>
            <section>
              <ul className='card__list'>
                {cards.map((card) => (
                  <Card key={card._id}
                  card={card} 
                  onCardClick={onCardClick} 
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}/>
                ))}
              </ul>
            </section>
            {popup && (<Popup 
             onClose={onClosePopup} 
             title={popup.title}>
                 {popup.children} 
                 </Popup>
             )}
        </main>
    )
}
