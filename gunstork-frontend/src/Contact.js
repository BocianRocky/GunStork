import './styles/Contact.css'

function Contact(){
    return(
        <div className='contact-container'>
            <div className='contact-item'>
                <h3>GUNSTORK - SKLEP Z BRONIĄ I AMUNICJĄ</h3>
                <div className='information'>
                    <div className='information-item'>
                        <h4>Adres</h4>
                        <p>01-494 Warszawa, Polska</p>
                        <p>ul. Jerzego Waldorffa 31</p>
                        <p><span className='info-text'>Koncesja:</span> PL-BR-2024-456789</p>
                        <p>NIP: 987 654 32 10</p>
                        <p>nr Bankowy: PL56 1020 3040 0000 7602 0567 8912</p>
                        <h4>Kontakt</h4>
                        <p>Tel: 32 555 22 00</p>
                        <p>Email: gunstork@gmail.com</p>

                        
                    </div>
                    <div className='information-item'>
                        <h4>Godziny otwarcie</h4>
                        <p><span className='info-text'>Poniedziałek: </span>10:00 - 18:00</p>
                        <p><span className='info-text'>Wtorek: </span>10:00 - 18:00</p>
                        <p><span className='info-text'>Środa: </span>10:00 - 18:00</p>
                        <p><span className='info-text'>Czwartek: </span>10:00 - 18:00</p>
                        <p><span className='info-text'>Piątek: </span>10:00 - 18:00</p>
                        <p><span className='info-text'>Sobota: </span>9:00 - 17:00</p>
                        <p><span className='info-text'>Niedziela: </span>Zamknięte</p>
                    </div>
                </div>
            </div>
            <div className='contact-item'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2081.6639969044945!2d20.94610256194737!3d52.25710407801833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecba5adbb358d%3A0xbf55e849532285b5!2sLegia%20Warszawa.%20Klub%20bokserski!5e0!3m2!1spl!2spl!4v1734610794824!5m2!1spl!2spl" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>

    );
}
export default Contact;