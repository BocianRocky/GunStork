import './styles/NotFound.css'
import notfoundPhoto from './assets/images/notFound111.png'

function NotFound(){


    return(
        <div className='notfound-container'>
            <img src={notfoundPhoto} alt='Error 404'/>
        </div>
    );
}
export default NotFound;