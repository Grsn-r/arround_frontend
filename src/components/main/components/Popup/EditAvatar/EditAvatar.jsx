import { useContext, useRef } from "react"
import CurrentUserContext from "../../../../../contexts/CurrentUserContext"

export default function EditAvatar() {
    const avatarRef = useRef();
    const {handleUpdateAvatar} = useContext(CurrentUserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <form className="popup__form" onSubmit={handleSubmit} noValidate>
                <label className="popup__field">
                    <input className="popup__input" 
                    type="url" 
                    id="avatar-url" 
                    name="avatar-url" 
                    placeholder="Enlace a foto" 
                    minLength="2" 
                    ref={avatarRef}
                    required/>
                    <span id="avatar-url-error"></span>
                </label>
                <button type="submit" className="popup__button" id="form__save-button" >Guardar</button>
        </form>
    )
}