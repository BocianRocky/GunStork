import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState} from 'react';
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


function App() {

  const [cart,setCart]=useState([]);

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
  const removeProductFromCart=(productId)=>{
    setCart((lastCart)=>lastCart.filter((product)=>product.id!==productId))
  }

  const getCartCountProducts=()=>{
    return cart.reduce((sum,item)=>sum+item.Quantity,0); //drugi argument to iteracja po obiektach
  };

  return (
    <Router>
      <Nav countItemCart={getCartCountProducts()}></Nav>
      <SecNav></SecNav>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<div className='page-container'><Products addProductToCart={addProductToCart}/></div>}/>
        <Route path="/products/:productId" element={<div className='page-container'><Item addProductToCart={addProductToCart}/></div>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path='/kontakt' element={<div className='page-container'><Contact/></div>}/>
        <Route path='/koszyk' element={<div className='page-container'><Cart cart={cart}/></div>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
