import { useContext, useState } from "react"
import CurrentUserContext from "../../../../../contexts/CurrentUserContext"

export default function NewCard() {

  const {handleAddPlaceSubmit} = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit({
      name: name,
      link: link
    });
  };

    return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input"
          id="card-name"
          maxLength="30"
          minLength="2"
          name="card-name"
          placeholder="Título"
          value={name}
          onChange={handleNameChange}
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Enlace a imagen"
          value={link}
          onChange={handleLinkChange}
          required
          type="url"
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>
      <button className="popup__button" type="submit">
        Crear
      </button>
    </form>
    )
}