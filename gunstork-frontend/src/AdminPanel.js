import './styles/AdminPanel.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import remove from './assets/images/remove.png';
import { useNavigate } from 'react-router-dom';
function AdminPanel(){

    const [users,setUsers]=useState([]);
    const navigate=useNavigate();
    
    useEffect(()=>{
        const fetchUsers=async ()=>{
            const res=await axios.get('http://localhost:3000/account/users');
            console.log(res.data);
            setUsers(res.data);
        }
        fetchUsers();
    },[]);

    const deleteUser=async (id)=>{
        try{
            await axios.delete(`http://localhost:3000/account/user/${id}`);
            setUsers((prevUsers)=>prevUsers.filter((user)=>user.AccountId!==id));
        }catch(err){
            console.error('blad');
        }
        
    };
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return(
        <div className="admin-container">
    <h2>Admin Panel</h2>
    <div className="admin-second">
        <table className="user-table">
            <thead>
                <tr>
                    <th>Account ID</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Login</th>
                    <th>Usuń</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.AccountId}>
                        <td>{user.AccountId}</td>
                        <td>{user.Name}</td>
                        <td>{user.LastName}</td>
                        <td>{user.Login}</td>
                        <td><button onClick={()=>deleteUser(user.AccountId)} className='button-remove'><img src={remove} alt='Usuń'/></button></td>
                        <td>{user.TotalCost}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={handleLogout} className='logout'>Wyloguj</button>
    </div>
</div>
    )
}
export default AdminPanel;