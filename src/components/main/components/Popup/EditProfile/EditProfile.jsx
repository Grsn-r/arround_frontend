import {useState, useContext} from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';



export default function EditProfile() {

  const {currentUser, handleUpdateUser} = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameCange = (event) => {
    setName(event.target.value);
  }

  const handleDescriptionCange = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({name, about: description});
  }

    return (
    <form className="popup__form"
     onSubmit={handleSubmit} 
     noValidate>
      <label className="popup__field"><input 
        className="popup__input" 
        id="name" 
        type="text" 
        placeholder="Nombre" 
        minLength="2" 
        maxLength="20"
        value={name}
        onChange={handleNameCange}
        required
      />
      <span className="popup__error" id="name-error"></span>
      </label>
      <label className="popup__field">
        <input 
        className="popup__input" 
        id="about" 
        type="text" 
        placeholder="Acerca de mi" 
        minLength="2" 
        maxLength="200"
        value={description}
        onChange={handleDescriptionCange} 
        required
      />
      <span className="popup__error" id="about-error"></span>
      </label>
      
      <button 
        type="submit" 
        className="popup__button" 
        id="form__save-button" 
      >
        Guardar
      </button>
    </form>
    )
}