import './styles/Footer.css'
import Telephone from './assets/images/telephone.svg'
import Time from './assets/images/time.svg'
import Location from './assets/images/location.svg'
function Footer(){
    return(
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-column'>
                    <div className='title-column'>
                        <h3>Sklep</h3>
                    </div>
                    <ul>
                        <li><a href="#">O firmie</a></li>
                        <li><a href="#">Kontakt</a></li>
                        <li><a href="#">Nr konta</a></li>
                        <li><a href="#">Skup broni</a></li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <div className='title-column'>
                        <h3>Zakupy</h3>
                    </div>
                    <ul>
                        <li><a href="#">Regulamin</a></li>
                        <li><a href="#">Dostawa i płatność</a></li>
                        <li><a href="#">Polityka prywatności</a></li>
                        <li><a href="#">Gwarancja</a></li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <div className='title-column'>
                        <h3>Info</h3>
                    </div>
                    <ul>
                    <li><a href="#">Regulamin</a></li>
                        <li><a href="#">Dostawa i płatność</a></li>
                        <li><a href="#">Polityka prywatności</a></li>
                        <li><a href="#">Gwarancja</a></li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <div className='logo'>

                    </div>
                    <div className='info-container'>
                        <div className='info'>
                            <img src={Telephone} alt="Phone" className="iconsvg"/>
                            <div className='info-details'>
                                <p>Infolinia</p>
                                <p>32 555 22 00</p>
                            </div>
                        </div>
                        <div className='info'>
                        <img src={Time} alt="Time" className="iconsvg"/>
                            <div className='info-details'>
                                <p>pon. - pt.</p>
                                <p>10:00 - 18:00</p>
                                <p>sobota</p>
                                <p>9:00 - 17:00</p>
                            </div>
                        </div>
                        <div className='info'>
                            <img src={Location} alt="Location" className="iconsvg"/>
                            <div className='info-details'>
                                <p>01-494 Warszawa, Polska</p>
                                <p>ul. Jerzego Waldorffa 31</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Footer;