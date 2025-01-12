import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css'

function Register(){
    const [form, setForm]=useState({
        Name: '',
        LastName: '',
        Login: '',
        Email: '',
        Password: '',
        Date: '',
        Adress: '',
        Licence: ''
    });
    const [message,setMessage]=useState('');
    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm((prev)=>({
            ...prev,[name]: value
        }));
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const res= await axios.post('http://localhost:3000/account/register',form);
            console.log(res.data);
            setMessage(res.data.message);
            navigate('./success');
        }catch(err){
            console.error('blad podczas rejestracji');
            setMessage('blad podczas rejestracji');
        }
    }
        
    return(
        <div className='log-reg-container'>
            <div className='reg-area'>
                <div className='login-area'>
                    <h3>Rejestracja</h3>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label><input type="text" name="Name" placeholder='Imię' value={form.Name} onChange={handleChange} required /></label>
                        <label><input type="text" name="LastName" placeholder='Nazwisko' value={form.LastName} onChange={handleChange} required /></label>
                        <label><input type="text" name="Login" placeholder='Login' value={form.Login} onChange={handleChange} required /></label>
                        <label><input type="email" name="Email" placeholder='E-mail' value={form.Email} onChange={handleChange} required /></label>
                        <label><input type="password" name="Password" placeholder='Hasło' value={form.Password} onChange={handleChange} required /></label>
                        <label><input type="date" name="Date" value={form.Date} onChange={handleChange} required /></label>
                        <label><input type="text" name="Adress" placeholder='Adres' value={form.Adress} onChange={handleChange} required /></label>
                        <label><input type="text" name="Licence" placeholder='Numer licencji' value={form.Licence} onChange={handleChange} required /></label>
                        <button type="submit">Załóż konto</button>
                        {message && <p className='message'>{message}</p>}
                        
                        
                    
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;