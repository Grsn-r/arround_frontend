export default function ImagePopup(props) {
const {card} = props;
return (
    <>
    <p className="popup__caption">{card.name}</p>
    <img className="popup__image" src={card.link} alt={card.name}/>
    </>
)
}