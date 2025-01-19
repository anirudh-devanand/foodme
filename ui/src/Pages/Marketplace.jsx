// import React, {useEffect, useState} from 'react';
// import Cards from '../Components/Card/Cards';
// import "./Marketplace.css";
// import TuneIcon from '@mui/icons-material/Tune';
// import Map from '../Components/Map/Map';
// import Cuisine from '../Components/Cuisines/Cuisines';
// import {marketPlaceData} from "../../api/api";

// const Marketplace = () => {

//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);

//   const toggleFilters = () => {
//     setIsFiltersOpen(true);
//   };

//   const [price, setPrice] = useState(50); // initial value of the slider
  
//   const handleChange = (event) => {
//     setPrice(event.target.value);
//   };

//   const getMarketPlaceItems = async() => {
//       await marketPlaceData()
//         .then((res) => {
//           console.log(res.data);
//         })
//           .catch((error) => {
//               alert(error.response.data.message);
//       });
//   }

//   useEffect(() => {
//     getMarketPlaceItems();
//   }, [])


//   return (
//     <div className="mainMarketplace">
//         <div className="top">
//               <input className="search" placeholder='Search For a Food Item'> 
//               </input>
//             <div className="filter"  onClick={toggleFilters}>
//               <div><TuneIcon style={{color: "black", margin: "0px"}}/></div>
//               <div>Filters

//                   {isFiltersOpen && (
//                       <div className="filterHiddenDiv">
//                       <h3>Filter Options</h3>
                      
//                       <div className="price-slider-container">
//                           <h3>Price: ${price}</h3>
//                           <input
//                             type="range"
//                             min="0"
//                             max="100"
//                             value={price}
//                             onChange={handleChange}
//                             className="price-slider"
//                           />
//                         </div>

//                         <Cuisine/>

//                         <Map/>
//                     </div>
//                     )}
//                   </div>
              
//             </div>
//         </div>

//         {/* <div className="bottom">

//             <Cards/>

//             <Cards />
//             <Cards/>
//           </div> */}

//         <div className="bottom">
//           {marketPlaceItems.map((item, index) => (
//           <Cards key={index} data={item} /> // Pass each item as a prop to Cards
//         ))}
//         </div>
        

//     </div>
//   )
// }

// export default Marketplace


import React, { useEffect, useState } from 'react';
import Cards from '../Components/Card/Cards';
import "./Marketplace.css";
import TuneIcon from '@mui/icons-material/Tune';
import Map from '../Components/Map/Map';
import Cuisine from '../Components/Cuisines/Cuisines';
import { marketPlaceData } from "../../api/api";
import Nav from '../Components/Nav/Nav';

const Marketplace = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [price, setPrice] = useState(50); // Initial value of the slider
  const [marketPlaceItems, setMarketPlaceItems] = useState([]); // State to store marketplace items

  // Toggle filter visibility
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  // Handle price slider change
  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  // Fetch marketplace items
  const getMarketPlaceItems = async () => {
    try {
      const res = await marketPlaceData(); // Fetch data
      console.log(res.data);
      setMarketPlaceItems(res.data); // Store fetched data in state
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  // Fetch marketplace items on mount
  useEffect(() => {
    getMarketPlaceItems();
  }, []);

  return (
    <>
       <Nav/>
    <div className="mainMarketplace">
      <div className="top">
        <input className="search" placeholder="Search For a Food Item" />
        <div className="filter" onClick={toggleFilters}>
          <div><TuneIcon style={{ color: "white", margin: "0px" }} sx={{color: "white"}}/></div>
          {isFiltersOpen && (
            <div className="filterHiddenDiv">
              <h3>Filter Options</h3>

              <div className="price-slider-container">
                <h3>Price: ${price}</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={price}
                  onChange={handleChange}
                  className="price-slider"
                />
              </div>

              <Cuisine />
            </div>
          )}
        </div>
      </div>

        <div className="bottom">
              <Cards name="Dev"
                     description="This Is desc."
                     country="Country" 
                     price ="Price" 
                     seller_name="Seller Name" 
                     image = " " 
                     _id />

          </div>
        

    </div>

    </>
  );
};

export default Marketplace;

