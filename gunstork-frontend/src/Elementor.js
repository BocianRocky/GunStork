import './styles/Elementor.css'
import Rifle from './assets/images/elementor-rifle.jpg'
import Ammo from './assets/images/elementor-ammo.jpg'
import Scope from './assets/images/elementor-scope.jpg'
import Acc from './assets/images/elementor-acc.jpg'
import { Link } from 'react-router-dom';

function Elementor(){
    return(
    <div className='elementor-space'>  
            <div className='intro'><h3>Przegląd popularnych kategorii</h3></div> 
            <div className='elementor-container'>
                <div className='element'>
                    <img src={Rifle} alt=''/>
                    <div class='overlay'>
                        <p>BROŃ</p>
                        <button className="elementor"><Link to="/products/categories/subcategories?categoryName=broń">Zobacz</Link></button>
                    </div>
                </div>
                <div className='element'>
                    <img src={Ammo} alt=''/>
                    <div class='overlay'>
                        <p>AMUNICJA</p>
                        <button className="elementor"><Link to="/products/categories/subcategories?categoryName=amunicja">Zobacz</Link></button>
                    </div>
                </div>
                <div className='element'>
                    <img src={Scope} alt=''/>
                    <div class='overlay'>
                        <p>OPTYKA</p>
                        <button className="elementor"><Link to="/products/categories/subcategories?categoryName=optyka">Zobacz</Link></button>
                    </div>
                </div>
                <div className='element'>
                    <img src={Acc} alt=''/>
                    <div class='overlay'>
                        <p>AKCESORIA</p>
                        <button className="elementor"><Link to="/products?type=AKCESORIA">Zobacz</Link></button>
                    </div>
                </div>
            </div>
        </div> 
    );
}
export default Elementor;