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


import React from "react";
import "./Cards.css";  // Make sure to import your custom CSS file
import food from "../../assets/img1.png"; // Fallback image

const Cards = (props) => {
  // Destructure the data prop
  const { name, description, country, price, seller_name, image } = props.data;

  return (
    <div className="card">
      <div className="card-image">
        <img src={image || food} alt={name} />
      </div>

      <div className="card-details">
        <h3 className="card-title">{name || "Untitled"}</h3>
        <p className="card-description">{description || "Not available"}</p>
        <div className="card-info">
          <p className="card-price">{price ? `$${price}` : "N/A"}</p>
          <p className="card-country">{country || "Not specified"}</p>
        </div>
        <p className="card-seller">{seller_name || "Not specified"}</p>
      </div>
    </div>
  );
};

export default Cards;
