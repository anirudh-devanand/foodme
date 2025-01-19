import React, { useState } from 'react';

const Cuisine = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

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

  return (
    <div>
      <label htmlFor="cuisine">Choose a Cuisine: </label>
      <select
        id="cuisine"
        value={selectedCuisine}
        onChange={handleCuisineChange}
      >
        <option value="">Select Cuisine</option>
        {cuisines.map((cuisine, index) => (
          <option key={index} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Cuisine;
