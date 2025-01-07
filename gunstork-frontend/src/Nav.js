import React from 'react';
import './styles/Nav.css';
import logo from './assets/images/gunstork.png';
import searchIcon from './assets/images/search.svg';
import cartIcon from './assets/images/cart.svg';
import userIcon from './assets/images/user.svg';
import { Link } from "react-router-dom";

function Nav({countItemCart}) {
  return (
    <div className="nav_container">
      <Link to='/' className='logo'>
        <img src={logo} alt="GunStork logo"/>
      </Link>
      <div className="icon-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src={searchIcon} alt="szukaj" className="iconsvg" />
        </a>
        <Link to='/koszyk' aria-label="Koszyk">
          <img src={cartIcon} alt="Koszyk" className="iconsvg" />
          {
            countItemCart>0 && <span className='cart-count'>{countItemCart}</span>
          }
        </Link>
        <a href="login.html" aria-label="login">
          <img src={userIcon} alt="User" className="iconsvg" />
        </a>
      </div>
    </div>
  );
}

export default Nav;
