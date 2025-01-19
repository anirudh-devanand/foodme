import React, {useState} from 'react';
import Cards from '../Components/Card/Cards';
import "./Marketplace.css";
import TuneIcon from '@mui/icons-material/Tune';
import Map from '../Components/Map/Map';
import Cuisine from '../Components/Cuisines/Cuisines';

const Marketplace = () => {

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen(true);
  };

  const [price, setPrice] = useState(50); // initial value of the slider
  
  const handleChange = (event) => {
    setPrice(event.target.value);
  };


  return (
    <div className="mainMarketplace">
        <div className="top">
              <input className="search" placeholder='Search For a Food Item'> 
              </input>
            <div className="filter"  onClick={toggleFilters}>
              <div><TuneIcon style={{color: "black", margin: "0px"}}/></div>
              <div>Filters

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

                        <Cuisine/>

                        <Map/>
                    </div>
                    )}
                  </div>
              
            </div>
        </div>

        <div className="bottom">

            <Cards/>
            <Cards/>
            <Cards/>
          </div>
        

    </div>
  )
}

export default Marketplace