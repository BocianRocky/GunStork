import './styles/Profile.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [activeNav,setActiveNav] = useState('profile');
    const [error,setError]=useState(null);
    const [profileData, setProfileData]=useState(null);
    const [role,setRole]=useState(null);
    const token=localStorage.getItem('accessToken');
    const navigate=useNavigate();  

    const fetchProfileData=useCallback(async ()=>{
        if(!token){
            setError('Brak tokenu. Zaloguj się ponownie.');
            return;
        }

        try{
            const res=await axios.get('http://localhost:3000/account/profile', {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setProfileData(res.data);
            setRole(res.data.Role);

            if(res.data.Role==='admin'){
                navigate('/adminPanel');
            }
        } catch (err) {
            setError('Nie udało się pobrać danych profilu. Spróbuj ponownie później.');
        }
    },[token]);

    useEffect(() => {
        if (activeNav==='profile') {
            fetchProfileData();
        }
    },[activeNav, fetchProfileData]);

    const handleLogout=()=>{
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    };

    return (
        <div className='profile-container'>
            <div className='profile-second'>
                <div className='profile-nav'>
                    <div className='username-intro'>
                        <span className='welcome-text'>Cześć,</span>
                        <span className='username'>{profileData && profileData.Name ? profileData.Name : 'Użytkowniku'}</span>
                    </div>
                    <div className='username-nav'>
                        <button onClick={()=>setActiveNav('profile')}>Info o profilu</button>
                        <button onClick={()=>setActiveNav('orders')}>Zamówienia</button>
                        <button onClick={handleLogout}>Wyloguj</button>
                    </div>
                </div>

                <div className='profile-info-container'>
                    {error && <div className="error">{error}</div>}
                    {activeNav==='profile' && profileData && (
                        <div>
                            <h3>Informacje o profilu</h3>
                            <p><strong>Imię:</strong>{profileData.Name}</p>
                            <p><strong>Nazwisko:</strong>{profileData.LastName}</p>
                            <p><strong>Login:</strong>{profileData.Login}</p>
                            <p><strong>Email:</strong>{profileData.Email}</p>
                            <p><strong>Adres:</strong>{profileData.Adress}</p>
                            <p><strong>Numer licencji:</strong>{profileData.LicenseNumber}</p>
                            <p><strong>Rola:</strong>{profileData.Role}</p>
                            <p><strong>Data urodzenia:</strong>{new Date(profileData.DateOfBirth).toLocaleDateString()}</p>
                        </div>
                    )}
                    {activeNav==='orders' && (
                        <div>
                            <h3>Zamówienia</h3>
                            <p>waitttt</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
