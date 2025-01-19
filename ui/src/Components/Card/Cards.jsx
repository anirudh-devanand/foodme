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

// import React, { useState } from 'react';


const Cards = (props) => {
  // Destructure the data prop
  const { name, description, country, price, seller_name, image, _id } = props.data;
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
      // isVisible = false; 
      // setIsVisible = false; 
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };
  

  return (
    <div className="card" style={{display: isVisible ? "block" : "none" }}>
      <div className="card-image">
        <img src={image || food} alt={name} />
      </div>

      <button onClick={() => deleteItem(_id)}>Delete</button>

      <div className="card-details">
        <h3 className="card-title">{name || "Untitled"}</h3>
        <p className="card-description">{description || "Not available"}</p>
        <div className="card-info">
          <p className="card-price">{price ? `$${price}` : "N/A"}</p>
          <p className="card-country">{country || "Not specified"}</p>
        </div>
        <p className="card-seller">{seller_name || "Not specified"}</p>
        {/* <p className="card-seller">{_id || "Not specified"}</p> */}
      </div>
    </div>

  );
};

export default Cards;
