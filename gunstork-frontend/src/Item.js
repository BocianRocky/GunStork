import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Item.css';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function Item({addProductToCart}){
    const [product,setProduct]=useState(null);
    const {productId}=useParams();
    const [quantity,setQuantity]=useState(1);
    useEffect(()=>{
        const fetchProduct= async ()=>{
        try{
            const res= await axios.get(`http://localhost:3000/products/${productId}`);
            setProduct(res.data);
        }catch(err){
            console.log(err);
        }
        }
        fetchProduct();
        },[productId]
    );
    const handleQuantityChange =(e)=>{
        const value=parseInt(e.target.value,10);
        setQuantity(value);
    }
    const handleAddProductToCart=()=>{
        if(product){
            const addProduct={
                ProductId:product.ProductId,
                ProductName:product.ProductName,
                Image:product.image,
                Price:product.Price,
                Quantity:quantity
            };
            addProductToCart(addProduct);
        }
    }

    if(!product){
        return <div>Wait</div>;
    }

    return(
        <div className='item-main'>
            <div className='item-path'>
                <span><Link to='/'>Strona główna</Link> {'>'} {product.ParentPathName} {'>'} <Link to={`/products?type=${product.PathName}`}>{product.PathName.replace(/-/g, ' ')}</Link> {'>'} {product.ProductName}</span>
                
            </div>
            <div className='item-container'>
                <img src={require(`./assets/images/${product.image}`)} alt={product.ProductName}/>
                <div className='item-description'>
                    <div className='item-name'>
                        <h3>{product.ProductName}</h3>
                    </div>
                    <div className='description'>
                        <p><span>Cena: </span> <span className='item-price'>{product.Price} zł</span></p>
                        <div className='spec-desc'>
                            <p>Dane techniczne</p>
                            <p><span className='desc-text'>Kaliber</span> <span className='desc-second-text'>{product.Caliber}</span></p>
                            <p><span className='desc-text'>Producent</span> <span className='desc-second-text'>{product.Producer}</span></p>
                            <p><span className='desc-text'>Masa</span> <span className='desc-second-text'>{product.Mass} g</span></p>
                            <p>
                                <span className='desc-text'>Ilość</span>
                                <input type='number' min='1' value={quantity} onChange={handleQuantityChange}/>
                                <span className='desc-text'>szt.</span>
                                <button onClick={handleAddProductToCart}>DODAJ DO KOSZYKA</button>
                            </p>
                            <p><span className='desc-text'>{product.Description}</span></p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    )
};
export default Item;
