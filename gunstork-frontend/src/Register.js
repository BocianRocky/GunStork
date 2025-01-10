import './styles/Register.css'

function Register(){
    return(
        <div className='log-reg-container'>
            <div className='reg-area'>
                <div className='login-area'>
                    <h3>Rejestracja</h3>
                    <form class="register-form" action="/register" method="POST">
                        <label><input type="text" name="name" placeholder='Imię' required /></label>
                        <label><input type="text" name="lastName" placeholder='Nazwisko' required /></label>
                        <label><input type="text" name="login" placeholder='Login' required /></label>
                        <label><input type="email" name="email" placeholder='E-mail' required /></label>
                        <label><input type="password" name="password" placeholder='Hasło' required /></label>
                        <label><input type="date" name="date" required /></label>
                        <label><input type="text" name="adress" placeholder='Adres' required /></label>
                        <label><input type="text" name="licence" placeholder='Numer licencji' required /></label>
                        <button>Załóż konto</button>
                        
                    
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;