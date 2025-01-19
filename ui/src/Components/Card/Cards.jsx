import React from 'react'; 
import "./Cards.css"; 
import food from "../../assets/img1.png";


const Cards = () => {
  return (
    <div className="main">
        <div className="img"><img src={food}></img></div>
        <h3>PASTA</h3>
        <p>PRICE</p>
        <p>Ingredients</p>
        <p>Location</p>
    </div>
  )
}

export default Cards