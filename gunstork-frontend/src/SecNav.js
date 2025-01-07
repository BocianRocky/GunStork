import React from "react";
import { Link } from "react-router-dom";
import "./styles/SecNav.css";

function SecNav(){
  return (
    <div className="nav_second">
      <nav>
        <ul>
          <li>
            <Link to="/products?type=broń">BROŃ</Link>
            <ul className="sub-menu">
              <li><Link to="/products?type=broń-krótka-bocznego-zapłonu">Broń krótka bocznego zapłonu</Link></li>
              <li><Link to="/products?type=broń-długa-bocznego-zapłonu">Broń długa bocznego zapłonu</Link></li>
              <li><Link to="/products?type=broń-krótka-centralnego-zapłonu">Broń krótka centralnego zapłonu</Link></li>
              <li><Link to="/products?type=broń-długa-centralnego-zapłonu">Broń długa centralnego zapłonu</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/main2">AMUNICJA</Link>
            <ul className="sub-menu">
              <li><Link to="/products?type=Amunicja-bocznego-zapłonu">Amunicja bocznego zapłonu</Link></li>
              <li><Link to="/products?type=Amunicja-centralnego-zapłonu">Amunicja centralnego zapłonu</Link></li>
              <li><Link to="/products?type=Amunicja-śrutowa">Amunicja śrutowa</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/main3">OPTYKA</Link>
            <ul className="sub-menu">
              <li><Link to="/products?type=Kolimatory">Kolimatory</Link></li>
              <li><Link to="/products?type=Termowizja">Termowizja</Link></li>
              <li><Link to="/products?type=Noktowizja">Noktowizja</Link></li>
              <li><Link to="/products?type=Lunety-celownicze">Lunety celownicze</Link></li>
              <li><Link to="/products?type=Dalmierze">Dalmierze</Link></li>
            </ul>
          </li>
          <li><Link to="/products?type=AKCESORIA">AKCESORIA</Link></li>
          <li><Link to="/products?type=SAMOOBRONA">SAMOOBRONA</Link></li>
          <li><Link to="/regulamin">REGULAMIN</Link></li>
          <li><Link to="/kontakt">KONTAKT</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default SecNav;
