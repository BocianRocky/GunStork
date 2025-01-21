import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './styles/App.css';
import Nav from './Nav';
import SecNav from './SecNav';
import Footer from './Footer';
import HomePage from './HomePage'
import NotFound from './NotFound'
import Contact from './Contact'
import Products from './Products';
import Item from './Item';
import Cart from './Cart';
import Statute from './Statute';
import Login from "./Login";
import Register from "./Register";
import SuccessReg from "./SuccessReg";
import Profile from "./Profile";
import AdminPanel from "./AdminPanel";
import SuccessPur from "./SuccessPur";
import Subcategories from "./SubCategories";

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (product) => {
    setCart((lastCart) => {
      const productId = cart.findIndex((item)=>item.ProductId===product.ProductId);
      if(productId===-1){
        return [...lastCart, product];
      }else{
        const cartList =[...lastCart];
        cartList[productId].Quantity+=product.Quantity;
        return cartList;
      }
      
    });
  };
  const handleRemoveProductFromCart=(productId)=>{
    const updateCart=cart.filter((product)=>product.ProductId!==productId);
    setCart(updateCart);
};

  const getCartCountProducts=()=>{
    return cart.reduce((sum,item)=>sum+item.Quantity,0); //drugi argument to iteracja po obiektach
  };
  const handleQuantityProduct =(e,productId)=>{
    const updateProducts=cart.map((product)=>{
        if(product.ProductId===productId){
            return{...product,Quantity: parseInt(e.target.value,10)}
        }else{
            return product;
        }
    });
    setCart(updateProducts);
    
};

  return (
    <Router>
      <Nav countItemCart={getCartCountProducts()}></Nav>
      <SecNav></SecNav>
      <Routes>
        <Route path="/" element={<HomePage addProductToCart={addProductToCart}/>}/>
        <Route path="/products" element={<div className='page-container'><Products addProductToCart={addProductToCart}/></div>}/>
        <Route path="/products/:productId" element={<div className='page-container'><Item addProductToCart={addProductToCart}/></div>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path='/kontakt' element={<div className='page-container'><Contact/></div>}/>
        <Route path='/koszyk' element={<div className='page-container'><Cart cart={cart} handleRemoveProductFromCart={handleRemoveProductFromCart} handleQuantityProduct={handleQuantityProduct}/></div>}/>
        <Route path='/regulamin' element={<div className='page-container'><Statute></Statute></div>}/>
        <Route path='/login' element={<div className='page-container'><Login></Login></div>}/>
        <Route path='/rejestracja' element={<div className='page-container'><Register></Register></div>}/>
        <Route path='/rejestracja/success' element={<div className='page-container'><SuccessReg></SuccessReg></div>}/>
        <Route path='/koszyk/success' element={<div className='page-container'><SuccessPur></SuccessPur></div>}/>
        <Route path='/profile' element={<div className='page-container'><Profile></Profile></div>}/>
        <Route path='adminPanel' element={<div className='page-container'><AdminPanel></AdminPanel></div>}/>
        <Route path="/products/categories/subcategories" element={<Subcategories></Subcategories>} />
        
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
