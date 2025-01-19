import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Login.css';

function Login(){
    const [loginOrEmail,setLoginOrEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const navigate= useNavigate();

    useEffect(()=>{
        const token=localStorage.getItem('accessToken');
        if (token) {
            navigate('/profile');
        }
    },[navigate]);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/auth/login',{
                loginOrEmail, Password: password,
            });
            if(res.status===200){
                localStorage.setItem('accessToken', res.data.accessToken);
                navigate('/');
            }
        }catch(err){
            setErrorMessage('błędny Email/Login lub hasło użytkownika');
        }
    };


    return(
        <div className='log-reg-container'>
            <div className='login-container'>
                <div className='login-area'>
                    <h3>Zaloguj się</h3>
                    <form class="login-form" onSubmit={handleSubmit}>
                        <div className='inputs'>
                            <input type='text' placeholder='E-mail lub login' value={loginOrEmail} onChange={(e) => setLoginOrEmail(e.target.value)}></input>
                            <input type='password' placeholder='Hasło' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <span className='forget'><Link to='/'>Zapomniałeś hasła?</Link></span>
                        {errorMessage && <span className='error'>{errorMessage}</span>}
                        <button type="submit">Zaloguj się</button>
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