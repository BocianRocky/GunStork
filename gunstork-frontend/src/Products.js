import './styles/Products.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Products({addProductToCart}){
    const location=useLocation();
    const [products, setProducts]= useState([]);
    const [categories,setCategories]=useState([]);
    const [catName,setCatName]=useState();
    const [currentPage,setCurrentPage]=useState(1);
    const [total,setTotal]=useState(0);
    const [previousLocation,setPreviousLocation]=useState('');

    useEffect(()=>{
        const fetchProducts=async ()=>{
            
            const params=new URLSearchParams(location.search);
            const type=params.get('type');
            const limit=params.get('limit') || 12;
            const offset=(currentPage-1)*limit;
            const caliber = params.get('caliber');
            const producer = params.get('producer');
            const previousType=new URLSearchParams(previousLocation).get('type');
            setCatName(params.get('type'));
            
            if(type!==previousType){
                setCurrentPage(1);
                setPreviousLocation(location.search);
            }
            try{
                const res=await axios.get('http://localhost:3000/products',{
                    params: {categoryName: type,limit: limit,offset: offset,caliber: caliber, producer:producer},
                });
                setProducts(res.data.products);
                setTotal(res.data.total);
            }catch(err){
                console.log(`errr ${err}`);
            }
        };
        fetchProducts();

    },[location.search,currentPage,previousLocation]);
    
    useEffect(()=>{
        const fetchCategories=async ()=>{
            const params=new URLSearchParams(location.search);
            const type=params.get('type');
            try{
                const res=await axios.get('http://localhost:3000/products/categories',{
                    params: {categoryName: type},
                });
                setCategories(res.data);
            }catch(err){
                console.log(`errrrr ${err}`);
            }
        }
        fetchCategories();
    },[location.search]);

    const handleAddProductToCart=(product)=>{
        if(product){
            const addProduct={
                ProductId:product.ProductId,
                ProductName:product.ProductName,
                Image:product.image,
                Price:product.Price,
                DiscountPrice:product.DiscountPrice,
                Quantity:1
            };
            addProductToCart(addProduct);
        }
    }
    const isAvailable =(quantity)=>{
        return quantity>0;
    };

    const pagination = ()=>{
        const pages=[];
        const totalPages=Math.ceil(total/12)
        for(let i=1;i<=totalPages;i++){
            const isActive=currentPage===i;
            pages.push(<button key={i} className={isActive ? 'active' : 'inactive'} onClick={
                ()=>{setCurrentPage(i); 
                window.scrollTo(0, 0);
            }}>{i}</button>);
        }
        return pages;
    }
    

    const filterCaliber=categories.filter((category)=>category.Type==='Caliber');

    return(
        <div className='main-products-container'>
            <div className='sort-container'>
                {
                    filterCaliber.length>0 ?
                    <h3>Kaliber</h3> : null
                }
                {
                        filterCaliber.map((category,index)=>(
                        <div className='link-container'><Link key={index} to={`/products?type=${catName}&caliber=${encodeURIComponent(category.ProdCal)}` }className='link'>{category.ProdCal}</Link></div>
                ))}
                <h3>Producent</h3>                
                {   
                        categories.filter((category)=>category.Type==='Producer').map((category,index)=>(
                        <div className='link-container'><Link key={index} to={`/products?type=${catName}&producer=${encodeURIComponent(category.ProdCal)}`}className='link'>{category.ProdCal}</Link></div>
                ))} 
            </div>
            <div className='products-container'>
                <div className='products-grid'>
                    {
                        products.map((product)=>(
                            <div className='product-item'>
                                <div key={product.ProductId}>     
                                    <div className='image-item'>
                                        {!isAvailable(product.Quantity) ?
                                            (<span className='out-of-stock'><b>OUT OF STOCK</b></span>) 
                                            : product.DiscountPrice>0 ? (<span className='sale'><b>PROMOCJA -{product.DiscountPrice}%</b></span>)
                                            : null
                                        }
                                        <Link to={`/products/${product.ProductId}`}>
                                            <img src={require(`./assets/images/${product.image}`)} alt={product.ProductName}/>
                                        </Link>
                                    </div>
                                    <Link to={`/products/${product.ProductId}`}>
                                        <p className='product-name'>{product.ProductName}</p>
                                    </Link>
                                    <p><span className='producer-info'>Producent: </span><span className='producer-info2'>{product.Producer}</span></p>
                                    <p>{product.DiscountPrice===0 ? (<span>{product.Price} zł</span>) : (<><span className='old-price'>{product.Price} zł</span>{" "}<span className='new-price'>{(product.Price-product.Price*(product.DiscountPrice/100)).toFixed(2)} zł</span></>)
                                    }</p>
                                    {
                                    isAvailable(product.Quantity) ?
                                    <button onClick={()=>handleAddProductToCart(product)}>Do koszyka</button> :
                                    <button disabled className='disabled-button'>Niedostępny</button>
                                    }
                                </div>
                            </div>    
                        ))
                    }
                </div>
                <div className='pagination-container'>
                    <div className='buttons-space'>
                        {pagination()}
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Products;