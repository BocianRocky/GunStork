import Elementor from './Elementor';
import NewSale from './NewSale';
import './styles/Entry.css'
function Entry(){

    return(
        <div className='description'>
            <div className='main-container'>
                <div className='introduction'>
                    <h2>GunStork – Najlepszy wybór broni palnej i akcesoriów</h2>
                </div>
                <div class="description">
                    <p>Witamy w GunStork, Twoim zaufanym sklepie z bronią palną, amunicją oraz szeroką gamą akcesoriów strzeleckich. 
                        Nasza oferta skierowana jest do profesjonalistów, pasjonatów strzelectwa, myśliwych i kolekcjonerów. 
                        W GunStork stawiamy na jakość, dlatego w naszym asortymencie znajdziesz wyłącznie produkty od sprawdzonych 
                        i renomowanych marek, takich jak Glock, SIG Sauer, Beretta, Smith & Wesson i wiele więcej. 
                        Oferujemy broń palną każdego rodzaju – od pistoletów po karabiny, a także amunicję i akcesoria, 
                        które spełnią oczekiwania nawet najbardziej wymagających klientów. GunStork – wszystko, 
                        czego potrzebujesz, aby osiągnąć cel!</p>

                </div>
                <Elementor></Elementor>
                <NewSale></NewSale>
            </div>
        </div>
    );
}
export default Entry;