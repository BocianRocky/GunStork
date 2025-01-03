import { useState } from 'react';
import './styles/Cart.css';

function Cart({cart}){

    const [cartItems,setCartItems]=useState(cart);

    const handleQuantityProduct =(e,productId)=>{
        const updateProducts=cartItems.map((product)=>{
            if(product.ProductId===productId){
                return{...product,Quantity: parseInt(e.target.value,10)}
            }else{
                return product;
            }
        });
        setCartItems(updateProducts);
        
    };

    const totalPrice=()=>{
        return cartItems.reduce((sum,product)=>sum+(product.Quantity*product.Price),0).toFixed(2);
    }


    return(
        <div className='cart-container'>
            <div className='cart-sec'>
                    <div className='cart-intro'>
                        <h2>Zawartość Twojego koszyka</h2>
                    </div>
                {cartItems.length === 0 ? (
                    <p>Twój koszyk jest pusty</p>
                ) : (
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
                                    cartItems.map((product)=>(
                                        <tr key={product.ProductId}>
                                            <td className='photo-settings'><img src={require(`./assets/images/${product.Image}`)} alt={product.ProductName}/></td>
                                            <td>{product.ProductName}</td>
                                            <td>usuń</td>
                                            <td className='center'>{product.Price} zł</td>
                                            <td><input type='number' min='1' value={product.Quantity} onChange={(e)=>handleQuantityProduct(e,product.ProductId)}/></td>
                                            <td className='center'>{(product.Price*product.Quantity).toFixed(2)} zł</td>
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
                    
                )}
            </div>
        </div>
    );
}

export default Cart;