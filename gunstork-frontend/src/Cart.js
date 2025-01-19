import './styles/Cart.css';
import remove from './assets/images/remove.png';
import axios from 'axios';
import React, { useState } from 'react';

function Cart({cart, handleRemoveProductFromCart,handleQuantityProduct}){
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckout=async ()=>{
        try{
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('Brak tokena dostępu! Użytkownik niezalogowany.');
            const PaymentMethod='karta płatnicza';
            const TotalCost=totalPrice();
            const Products=cart.map((product)=>({
                ProductId: product.ProductId,
                Quantity: product.Quantity,
                Price: getPriceWithDiscount(product.Price, product.DiscountPrice)
            }));
            const payload={PaymentMethod, TotalCost, Products};

            const res=await axios.post('http://localhost:3000/products/purchase',payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if(res.status===201){
                console.log(res.data.message);
                alert('wszystko git')
            }


        }catch(err){
            setErrorMessage('blad');
            console.error(err);
            
        }
    }

    const totalPrice=()=>{
        return cart.reduce((sum,product)=>sum+(product.Quantity*getPriceWithDiscount(product.Price,product.DiscountPrice)),0).toFixed(2);
    }
    const getPriceWithDiscount =(price,discountPrice)=>{
        if(discountPrice>0){
            return price-(price*discountPrice/100);
        }
        return price;
    };

    return(
        <div className='cart-container'>
            <div className='cart-sec'>
                    <div className='cart-intro'>
                        <h2>Zawartość Twojego koszyka</h2>
                    </div>
                {cart.length === 0 ? (
                    <p>Twój koszyk jest pusty</p>
                ) : (
                    <div className='area'>
                        <div className='cart-area'>
                            <table class='cart-table'>
                                <thead>
                                    <tr>
                                        <th>Zdjęcie</th>
                                        <th>Nazwa produktu</th>
                                        <th>Usuń</th>
                                        <th>Cena</th>
                                        <th>Ilość</th>
                                        <th>Wartość</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((product)=>(
                                            
                                            <tr key={product.ProductId}>
                                                <td className='photo-settings'><img src={require(`./assets/images/${product.Image}`)} alt={product.ProductName}/></td>
                                                <td class='table-name-product'>{product.ProductName}</td>
                                                <td className='center'><button onClick={()=>handleRemoveProductFromCart(product.ProductId)} className='button-remove'><img src={remove} alt='Usuń'/></button></td>
                                                <td className='center'>{getPriceWithDiscount(product.Price,product.DiscountPrice)} zł</td>
                                                <td><input type='number' min='1' value={product.Quantity} onChange={(e)=>handleQuantityProduct(e,product.ProductId)}/></td>
                                                <td className='center'>{(getPriceWithDiscount(product.Price,product.DiscountPrice)*product.Quantity).toFixed(2)} zł</td>
                                            </tr>
                                        ))
                                    }
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Wartość</td>
                                    <td>{totalPrice()} zł</td>
                                </tbody>
                            </table>
                        </div>
                        <div className='delivery-payment-container'>
                                <div className='delivery-payment-item'>
                                    <div className='dp-settings-container'>
                                        <h3>Wybierz kraj dostawy</h3>
                                        <div className='delivery'>
                                            <select id='kraj-dostawy' name='kraj-dostawy'>
                                                <option value='CZ'>Czechy</option>
                                                <option value='PL' selected>Polska</option>
                                                <option value='FR'>Francja</option>

                                            </select>
                                        </div>
                                        <h3>Wybierz formę wysyłki</h3>
                                        <div className='radio-list'>
                                            <label>
                                                <input type='radio' name='metoda-dostawy' value='pickup' checked/>
                                                Odbiór osobisty
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='delivery-payment-item'>
                                    <div className='dp-settings-container'>
                                        <h3>Płatności</h3>
                                        <div className='radio-list'>
                                            <label>
                                                <input type='radio' name='rodzaj-platnosci' value='a' checked/>
                                                Płatność gotówką
                                            </label>
                                            <label>
                                                <input type='radio' name='rodzaj-platnosci' value='a' checked/>
                                                Płatność przelewem
                                            </label>
                                            <label>
                                                <input type='radio' name='rodzaj-platnosci' value='a' checked/>
                                                Płatność kartą w punkcie odbioru
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='delivery-payment-item'>
                                    <div className='dp-settings-container'>
                                        <div className='summary'>
                                            <h3>Koszty</h3>
                                            <div className='summary-info'>
                                                <span>Wartość koszyka:</span><span>{totalPrice()} zł</span>
                                            </div>
                                            <div className='summary-info'>
                                                <span>Koszt wysyłki:</span><span>0.00 zł</span>
                                            </div>
                                            <div className='summary-info'>
                                                <span className='all'>Razem:</span><span className='all'>{totalPrice()} zł</span>
                                            </div>
                                            <div className='button-all'>
                                                <button onClick={handleCheckout}>Do kasy</button>
                                                {errorMessage}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Cart;