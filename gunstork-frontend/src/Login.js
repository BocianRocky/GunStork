import { Link } from 'react-router-dom';
import './styles/Login.css';

function Login(){
    return(
        <div className='log-reg-container'>
            <div className='login-container'>
                <div className='login-area'>
                    <h3>Zaloguj się</h3>
                    <form class="login-form" action="/login" method="POST">
                        <div className='inputs'>
                            <input type='text' placeholder='E-mail lub login'></input>
                            <input type='password' placeholder='Hasło'></input>
                        </div>
                        <span className='forget'><Link to='/'>Zapomniałeś hasła?</Link></span>
                        <button>Zaloguj się</button>
                    </form>
                </div>
                
            </div>
            <div className='register-container'>
                <div className='register-area'>
                    <h3>Nie posiadasz konta?</h3>
                    <div className='register-info'>
                    <Link to='/rejestracja'><button>Załóż konto</button></Link>
                        <ul className="benefits-list">
                            <li>Uzyskaj dostęp do ekskluzywnych ofert!</li>
                            <li>Śledź swoje zamówienia w czasie rzeczywistym!</li>
                            <li>Otrzymuj specjalne rabaty i promocje!</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Login;