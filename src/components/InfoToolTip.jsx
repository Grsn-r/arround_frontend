import success from '../assets/success.png';
import failure from '../assets/failure.png';
import '../blocks/info-tool.css';

export default function InfoToolTip({isRegistred, onClose}) {
    if (isRegistred) { return (<div className='container' >
        <div className='info-tool' >
            <button className='info-tool__button' type='button' onClick={onClose} />
        <img className="info-tool__image" src={success} alt="registro exitoso" />
        </div>
        </div>) }
        return (<div className='container' >
        <div className='info-tool' >
            <button className='info-tool__button' type='button' onClick={onClose} />
        <img className="info-tool__image" src={failure} alt="falló registro" />
        </div>
        </div>)
}