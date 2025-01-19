import React, { useEffect, useState } from 'react';
import './Seller.css';
import {addItem} from "../../api/api";
import { useSelector } from 'react-redux';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';

import Cards from '../Components/Card/Cards';

import Nav from '../Components/Nav/Nav';

import { LineChart } from '@mui/x-charts';

import { current } from '@reduxjs/toolkit';


import { sellerList } from '../../api/api';
import { Provider } from 'react-redux';
import {store} from '../Redux/Store';


const Seller = ({user}) => {

  console.log(user);
  // const {user1} = props;
  const {currentUser} = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const [newListing, setNewListing] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    country: '',
    price: '',
    location: '',
  });

const TotalSales = [3632, 2342, 5000, 4530, 2432, 3901, 4235];
const DailySales = [400, 235, 540, 430, 312, 421, 443];
const volume = [15, 21, 23, 20, 22, 25, 26];
const xLabels = [
  'January',
  'Febraury',
  'March',
  'April',
  'May',
  'June',
  'July',
];




  const handleSubmit = async () => {

    console.log(currentUser);
    // Check if all fields are filled, else set error messages
    console.log("USER: ", currentUser);
    let formErrors = { name: '', description: '', country: '', price: '', currentUser: currentUser};
    let isValid = true;

    if (!name) {
      formErrors.name = 'Food item name is required';
      isValid = false;
    }
    if (!description) {
      formErrors.description = 'Description is required';
      isValid = false;
    }
    if (!country) {
      formErrors.country = 'Country is required';
      isValid = false;
    }
    if (!price) {
      formErrors.price = 'Price is required';
      isValid = false;
    }
    if (!location) {
      formErrors.location = 'Location of pickup is required';
      isValid = false;
    }


    setErrors(formErrors); // Set the error messages

    if (isValid) {  
      // Prepare form data      
      const formData = { name, description, country, price, currentUser, location};


      try {
        console.log("form: " , formData);
        console.log("RUNNING"); 

        await addItem(formData)
        .then((res) => {
          console.log("RUNNING2"); 
          console.log(res);
        })
      } catch (error) {
          console.log(error);
      }

      // try {
      //   // Send POST request to the server
      //   const response = await fetch('/addItem', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(formData),
      //   });

      //   if (response.ok) {
      //     console.log('Item added successfully');
      //     // Handle success (e.g., clear form or show a success message)
      //   } else {
      //     console.error('Failed to add item');
      //     // Handle failure (e.g., show an error message)
      //   }
      // } catch (error) {
      //   console.error('Error sending data:', error);
      // }
    }
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [binaryData, setBinaryData] = useState(null);

  const handleImageChange = (e) => {
    console.log("IMAGE: ", e.target.files); 
    setImage(e.target.files[0]); // Store the uploaded image
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };


  const [dishes, setDishes] = useState([]);
  
  const getSellerList = async() => {
    // console.log(user1);
    console.log("User is: ", user)
    await sellerList(currentUser)
    .then((res) => {
      console.log(res.data); 
      setDishes(res.data); 
    })
  }
  
  useEffect(() => {
    getSellerList(); 
  },[]);

  return (

    <>
    <Nav/>

    <div className="sellerContainer">
    <div className="seller-form"  style={{ display: newListing ? 'block' : 'none' ,height: '60vh', marginTop: '10%', overflow: 'scroll'}}>
      <h2>Create new listing</h2>
      <form
        // style = {{maxHeight: '800px', }}
        onSubmit={(e) => e.preventDefault()} // Prevent default form submission behavior
        onKeyDown={handleKeyPress}
      >
        {/* <div className="input-container">
          <label htmlFor="name">Food Item Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter Food Item Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div> */}
        <div
  className="input-container"
  style={{
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <label
    htmlFor="name"
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    }}
  >
    Food Item Name
  </label>
  <input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    placeholder="Enter Food Item Name"
    style={{
      width: '95%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#555',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'border-color 0.3s',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  />
  {errors.name && (
    <p
      className="error"
      style={{
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {errors.name}
    </p>
  )}
</div>


        {/* <div className="input-container">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter Description"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div> */}

<div
  className="input-container"
  style={{
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <label
    htmlFor="description"
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    }}
  >
    Description
  </label>
  <textarea
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    placeholder="Enter Description"
    style={{
      width: '95%',
      minHeight: '100px',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#555',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color 0.3s',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  ></textarea>
  {errors.description && (
    <p
      className="error"
      style={{
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {errors.description}
    </p>
  )}
</div>


        {/* <div className="input-container">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="" disabled>Select Country</option>
            <option value="Afghanistan">American</option>
                <option value="Åland Islands">French</option>
                <option value="Albania">German</option>
                <option value="Algeria">Thai</option>
                <option value="American Samoa">Japanese</option>
                <option value="Andorra">Italian</option>
                <option value="Angola">Greek</option>
                <option value="Anguilla">Lebanese</option>
                <option value="Anguilla">Indian</option>
                <option value="Anguilla">Chinese</option>
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div> */}

<div
  className="input-container"
  style={{
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <label
    htmlFor="country"
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    }}
  >
    Country
  </label>
  <select
    id="country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    required
    style={{
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#555',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'border-color 0.3s',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  >
    <option value="" disabled>Select Country</option>
    <option value="American">American</option>
    <option value="French">French</option>
    <option value="German">German</option>
    <option value="Thai">Thai</option>
    <option value="Japanese">Japanese</option>
    <option value="Italian">Italian</option>
    <option value="Greek">Greek</option>
    <option value="Lebanese">Lebanese</option>
    <option value="Indian">Indian</option>
    <option value="Chinese">Chinese</option>
    {/* Add more countries as needed */}
  </select>
  {errors.country && (
    <p
      className="error"
      style={{
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {errors.country}
    </p>
  )}
</div>


        {/* <div className="input-container">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => {
              // Ensure the value starts with "$" and is followed by numbers
              let formattedValue = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
              formattedValue = formattedValue ? `$${formattedValue}` : ''; // Prepend "$" if there's a value
              setPrice(formattedValue); // Update the state with the formatted value
            }}
            required
            placeholder="$"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div> */}

<div
  className="input-container"
  style={{
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <label
    htmlFor="price"
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    }}
  >
    Price
  </label>
  <input
    type="text"
    id="price"
    value={price}
    onChange={(e) => {
      // Ensure the value starts with "$" and is followed by numbers
      let formattedValue = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
      formattedValue = formattedValue ? `$${formattedValue}` : ''; // Prepend "$" if there's a value
      setPrice(formattedValue); // Update the state with the formatted value
    }}
    required
    placeholder="$"
    style={{
      width: '95%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#555',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'border-color 0.3s',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  />
  {errors.price && (
    <p
      className="error"
      style={{
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {errors.price}
    </p>
  )}
</div>
{/* 

        <div className="input-container">
          <label htmlFor="location">Location for Pickup</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Enter location"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div> */}

<div
  className="input-container"
  style={{
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <label
    htmlFor="location"
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    }}
  >
    Location for Pickup
  </label>
  <input
    type="text"
    id="location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    required
    placeholder="Enter location"
    style={{
      width: '95%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#555',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'border-color 0.3s',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  />
  {errors.location && (
    <p
      className="error"
      style={{
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {errors.location}
    </p>
  )}
</div>
{/* 

        <div className="input-container">
          <label htmlFor="image">Food Item Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div> */}

{/* <div
  className="input-container"
  style={{
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
>
  <label
    htmlFor="image"
    style={{
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    }}
  >
    Food Item Image
  </label>
  <input
    type="file"
    id="image"
    accept="image/*"
    onChange={handleImageChange}
    required
    style={{
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#555',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'border-color 0.3s',
      cursor: 'pointer',
    }}
    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
  />
  {errors.image && (
    <p
      className="error"
      style={{
        color: 'red',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {errors.image}
    </p>
  )}
</div> */}


        <button type="button" onClick={handleSubmit}>
          Enter
        </button>
      </form>
    </div>

    <div className="performanceOverview">
      <div className="perfTop">
         <h2>Performance Overview</h2>
      </div>

      <div className="perfBottom">
          <div className="bottomBox totalSales">
              <p>
                Daily Sales
              </p>
              <h2>$700</h2>
          </div>

          <div className="bottomBox totalRevenue">
              <p>
               Montly Revenue
              </p>
              <h2>$2300</h2>
          </div>

          <div className="bottomBox avgOrderVol">
              <p>
                Avg. Order Volume
              </p>
              <h2>12</h2>
          </div>

          
      </div>
      <div className="lineChartContainer">
        <LineChart className='lineChart'
          width={500}
          height={300}
          series={[
            {data: DailySales, label: 'DailySales' ,yAxisId: 'leftAxisId' },
            {data: TotalSales, label: 'TotalSales', yAxisId: 'rightAxisId' },
          ]}
          sx={{
            stroke: '#FFFFFF',
            strokeWidth: 1,
        }}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
          rightAxis="rightAxisId"
        />
</div>

    </div>


    <div className="sellerListings">
      <div className="top">
        <div className="currentListings">
          <FormatListNumberedOutlinedIcon/>
          <h3>Your Current Listings</h3>


        </div>
        <h3 className='createListing' onClick={() => setNewListing(!newListing)}>
          <AddCircleOutlinedIcon/>
         <h3>Add a listing</h3>
        </h3>
      </div>

      <div className="bottom">
      {dishes.length === 0 ? (
            <p>Loading marketplace items...</p>
          ) : (
            dishes.map(item => (
              <Cards
                key={item._id}
                name={item.name}
                description={item.description}
                country={item.country}
                price={item.price}
                seller_name={item.seller_name}
                image={item.image}
                _id={item._id}
              />
            ))
          )}

      </div>

    </div>
    </div>
    </>
  );
};

export default Seller;
