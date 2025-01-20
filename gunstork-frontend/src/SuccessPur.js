import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SuccessPur.css';
function SuccessPur(){

    const navigate=useNavigate();

    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate('/login');

        },2000);
        return ()=>clearTimeout(timer);
    },[navigate]);

    return(
        <div class='success-info'>
            <h1>Zakup został zrealizowany!</h1>
        </div>
    );

}
export default SuccessPur;