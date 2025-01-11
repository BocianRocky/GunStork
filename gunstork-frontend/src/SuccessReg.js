import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SuccessReg.css'

function SuccessReg(){

    const navigate=useNavigate();

    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate('/login');

        },3000);
        return ()=>clearTimeout(timer);
    },[navigate]);

    return(
        <div class='success-info'>
            <h1>Rejestracja zakończona sukcesem!</h1>
        </div>
    );
}
export default SuccessReg;