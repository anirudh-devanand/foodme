import React, { useState } from 'react';
import "./Filter.css";

const Filter = () => {
  const [price, setPrice] = useState(50); // Default price
  const [selectedCuisine, setSelectedCuisine] = useState(''); // Default cuisine

  const cuisines = [
    'Italian',
    'Chinese',
    'Indian',
    'Mexican',
    'Thai',
    'Japanese',
    'French',
    'African',
    'Mediterranean',
    'American',
    'Greek',
  ];

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };

  return (
    <div style={styles.container}>
      {/* Price Slider */}
      <div style={styles.sliderContainer}>
        <label htmlFor="priceSlider" style={styles.label}>
          Price: ${price}
        </label>
        <input
          id="priceSlider"
          type="range"
          min="0"
          max="100"
          value={price}
          onChange={handlePriceChange}
          style={styles.slider}
        />
      </div>

      {/* Dropdown Menu */}
      <div style={styles.dropdownContainer}>
        <label htmlFor="cuisineDropdown" style={styles.label}>
          Cuisine:
        </label>
        <select
          id="cuisineDropdown"
          value={selectedCuisine}
          onChange={handleCuisineChange}
          style={styles.dropdown}
        >
          <option value="" disabled>
            Select a cuisine
          </option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Filters */}
      <div style={styles.selectedFilters}>
        <h4>Selected Filters:</h4>
        <p>Price: ${price}</p>
        <p>Cuisine: {selectedCuisine || 'None'}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sliderContainer: {
    marginBottom: '20px',
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
  },
  dropdown: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  selectedFilters: {
    marginTop: '20px',
    padding: '10px',
    background: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
};

export default Filter;


