import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation,Link } from 'react-router-dom';
import "./styles/SubCategories.css";

function Subcategories(){
    const location=useLocation();
    const [subcategories,setSubcategories]=useState([]);
    const [categoryName,setCategoryName]=useState('');

    useEffect(()=>{
        const fetchSubcategories=async ()=>{
            const params=new URLSearchParams(location.search);
            const categoryNameFromParams=params.get('categoryName');
            setCategoryName(categoryNameFromParams);

            try{
                const response=await axios.get('http://localhost:3000/products/categories/subcategories', {
                    params:{categoryName: categoryNameFromParams},
                });
                setSubcategories(response.data);
            }catch(error){
                console.error('Błąd podczas pobierania podkategorii:');
            }
        };

        fetchSubcategories();
    },[location.search]); 

    return (
        <div className='subcategories-container'>
            <h1>{categoryName}</h1>
            <div className='subcategories-details'>
                {subcategories.length > 0 ? (
                    subcategories.map(subcategory => (
                        <div key={subcategory.CategoryId} className="subcategory-item">
                            <Link to={`/products?type=${subcategory.CategoryName}`}>
                                {subcategory.CategoryName.replace(/-/g, ' ')}
                            </Link>
                        </div>
                    ))
                ):(
                    <p>Brak dostępnych podkategorii</p>
                )}
            </div>
        </div>
    );
}

export default Subcategories;
