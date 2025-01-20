import './styles/Profile.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [activeNav,setActiveNav] = useState('profile');
    const [error,setError]=useState(null);
    const [profileData, setProfileData]=useState(null);
    const [role,setRole]=useState(null);
    const [orders,setOrders]=useState([]);
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

    const fetchOrders=useCallback(async ()=>{
        if(!token){
            setError('Brak tokenu. Zaloguj się ponownie.');
            return;
        }
        try{
            const res=await axios.get('http://localhost:3000/account/user',{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setOrders(res.data);
        }catch(err){
            setError('Bląd podczas pobierania zamówień');
        }
    }, [token]);

    useEffect(() => {
        if (activeNav==='profile') {
            fetchProfileData();
        }else if(activeNav==='orders'){
            fetchOrders();
        }
    },[activeNav, fetchProfileData, fetchOrders]);

    const handleLogout=()=>{
        localStorage.removeItem('accessToken');
        navigate('/login');
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
                        <div className='info-details'>
                            
                            <p><strong className='color-font'>Imię: </strong>{profileData.Name}</p>
                            <p><strong className='color-font'>Nazwisko: </strong>{profileData.LastName}</p>
                            <p><strong className='color-font'>Login: </strong>{profileData.Login}</p>
                            <p><strong className='color-font'>Email: </strong>{profileData.Email}</p>
                            <p><strong className='color-font'>Adres: </strong>{profileData.Adress}</p>
                            <p><strong className='color-font'>Numer licencji: </strong>{profileData.LicenseNumber}</p>
                            <p><strong className='color-font'>Rola: </strong>{profileData.Role}</p>
                            <p><strong className='color-font'>Data urodzenia: </strong>{new Date(profileData.DateOfBirth).toLocaleDateString()}</p>
                        </div>
                    </div>
                    )}
                     {activeNav==='orders' && (
                        <div>
                            <h3>Zamówienia</h3>
                            {orders.length===0 ? (
                                <p>Brak zamówień</p>
                            ):(
                                orders.map((order)=>(
                                    <div key={order.PurchaseId} className="order">
                                        <div className='order-details'>
                                            <p>nr {order.PurchaseId}</p>
                                            <p>{new Date(order.PurchaseDate).toLocaleDateString()}</p>
                                            <p><strong>{order.TotalCost} zł</strong></p>
                                        </div>
                                    
                                        <div className="order-images">
                                            {order.ProductImages.map((image, index)=>(
                                                <img key={index} src={require(`./assets/images/${image}`)} alt='product' />
                                            ))
                                            }
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
