import './styles/NewSale.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

function NewSale({addProductToCart}){
    const [newProducts,setNewProducts]=useState([]);
    const [saleProducts,setSaleProducts]=useState([]);
    const [error, setError]=useState();

    useEffect(()=>{
        const fetchNewProducts = async ()=>{
            try{
                const res=await axios.get('http://localhost:3000/products/newest');
                setNewProducts(res.data);
            }catch(err){
                setError(err.message);
            }
        };
        fetchNewProducts();
    }, []);

    useEffect(()=>{
        const fetchSaleProducts=async ()=>{
            try{
                const res=await axios.get('http://localhost:3000/products/sale');
                setSaleProducts(res.data);
            }catch(err){
                setError(err.message);
            }
        };
        fetchSaleProducts();

    },[]);

    const handleAddProductToCart=(product)=>{
        if(product){
            const addProduct={
                ProductId:product.ProductId,
                ProductName:product.ProductName,
                Image:product.image,
                Price:product.Price,
                DiscountPrice:product.PercentDiscount,
                Quantity:1
            };
            console.log(addProduct);
            addProductToCart(addProduct);
        }
    }



    return(
       <div className='new-sale-container'>
            <div className='spacing1'>
                <div className='items'>
                    <div className='new-sale-info'>
                        <h2>NOWOŚĆ</h2>
                    </div>
                        <div className='container-items'>
                            {newProducts.map((product)=>(
                                <div key={product.ProductId} className='item'>
                                    <div className='photo'>
                                        <span className='icon-new'>
                                            <b>NOWOŚĆ</b>
                                        </span>
                                        <img src={require(`./assets/images/${product.image}`)} alt={product.ProductName}/>
                                    </div>
                                    <h3>{product.ProductName}</h3>
                                    <p>{product.Price} zł</p>
                                    <div class="add-cart">
                                        <button onClick={()=>handleAddProductToCart(product)}>Do koszyka</button>
                                    </div>   
                                </div>
                            ))
                            }
                        </div>
                </div>
            </div>
            <div className='spacing2'>
                <div className='items'>
                <div className='new-sale-info'>
                        <h2>PROMOCJE</h2>
                    </div>
                        <div className='container-items'>
                            {saleProducts.map((product)=>(
                                <div key={product.ProductId} className='item'>
                                    <div className='photo'>
                                        <span className='icon-sale'>
                                            <b>PROMOCJA -{product.PercentDiscount}%</b>
                                        </span>
                                        <img src={require(`./assets/images/${product.image}`)} alt={product.ProductName}/>
                                    </div>
                                    <h3>{product.ProductName}</h3>
                                    <p><span className='old-price'>{product.Price} zł</span>{" "}<span className='new-price'>{(product.Price-product.Price*(product.PercentDiscount/100)).toFixed(2)} zł</span></p>
                                    <div className='add-cart'>
                                        <button onClick={()=>handleAddProductToCart(product)}>Do koszyka</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
            </div>
        </div>


       </div>
    );
}
export default NewSale;