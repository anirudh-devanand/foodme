// // import React from 'react'; 
// // import "./Cards.css"; 
// // import food from "../../assets/img1.png";


// // const Cards = (props) => {
// //   const{}
// //   return (
// //     <div className="main">
// //         <div className="img"><img src={food}></img></div>
// //         <h3>PASTA</h3>
// //         <p>PRICE</p>
// //         <p>Ingredients</p>
// //         <p>Location</p>
// //     </div>
// //   )
// // }

// // export default Cards

// import React from "react";
// import "./Cards.css";
// import food from "../../assets/img1.png"; // Fallback image

// const Cards = (props) => {
//   // Destructure the data prop
//   const { name, description, country, price, seller, image } = props.data;

//   return (
//     <div className="main">
//       <div className="img">
//         <img src={image || food} alt={name} /> {/* Use the image from props or fallback */}
//       </div>
//       <h3>{name || "Untitled"}</h3> {/* Default value if name is missing */}
//       <p><strong>Price:</strong> {price ? `$${price}` : "N/A"}</p>
//       <p><strong>Description:</strong> {description || "Not available"}</p>
//       <p><strong>Country:</strong> {country || "Not specified"}</p>
//       <p><strong>Seller:</strong> {seller || "Not specified"}</p>
//     </div>



//   );
// };

// export default Cards;


import React, { useState } from "react";
import "./Cards.css";  // Make sure to import your custom CSS file
import food from "../../assets/img1.png"; // Fallback image
import { delItem } from "../../../api/api";
import { Block } from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// import React, { useState } from 'react';


const Cards = (props) => {
  // Destructure the data prop
  const { name, description, country, price, seller_name, image, _id } = props;

  const [showComponent, setShowComponent] = useState(true);

  const handleRemove = () => {
    setShowComponent(false); // Set to false to remove the component
  };

  // var isVisible = true; 
  const [isVisible, setIsVisible] = useState(true);

  // function deleteItem(){
  //   // MAKE POST REQUEST TO /deleteItem
  // }

  // const deleteItem = async () => {
  //     try {
  //       // NEED TO SEND currUser as 
  //       console.log("SENDING DELETE"); 
  //       const toDel = {'_id': _id}; 
  //       const res = await delItem(toDel); // Fetch data
  //       console.log(res.data);
  //     } catch (error) {
  //       alert(error.response?.data?.message || "An error occurred");
  //     }
  //   };

  const deleteItem = async (_id) => {
    try {
      console.log("SENDING DELETE"); 
      const toDel = { '_id': _id }; 
      const res = await delItem(toDel); // Make sure delItem is a valid function
      console.log(res.data);
      handleRemove();
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };
  
  const addToCart =() => {
    alert("Item added to cart");
  }

  return (
<>
    { showComponent && (
    <div className="card" style={{display: isVisible ? "block" : "none" }}>
      <div className="card-image">
        {/* <img src={image || food} alt={name}  /> */}
        <img src={"/src/assets/img1.png"} />

      </div>


      <div className="card-details">
        <div className="topDiv">
          <h3 className="card-title">{name || "Untitled"}</h3>
          <DeleteForeverIcon style={{cursor: "pointer"}} onClick={() => deleteItem(_id)}/>
        </div>
      
        <p className="card-description">{description || "Not available"}</p>
        <div className="card-info">
          <p className="card-price">{price ? `$${price}` : "N/A"}</p>
          <p className="card-country"><span>Cuisine Type: </span>{country || "Not specified"}</p>
        </div>
        <div className="card-seller">
            <span>Sold By: {seller_name || "Not specified"}</span>
            <ShoppingCartIcon style={{cursor: "pointer"}} onClick={() => addToCart()}/>
        </div>
      </div>
    </div>
   
    )} 
    </>
  );
};

export default Cards;
