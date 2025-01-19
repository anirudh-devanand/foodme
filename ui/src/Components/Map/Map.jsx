import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 49.3, // Example latitude
  lng: -123,  // Example longitude
};

const MyMapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newLocation = { lat: latLng.lat(), lng: latLng.lng() };
    setSelectedLocation(newLocation);
    console.log(selectedLocation);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbkKJLGN4enUH8Bmlk5OdTn_uVl_5lveg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            onClick={() => setSelectedLocation(selectedLocation)}
          />
        )}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h4>Selected Location</h4>
              <p>Latitude: {selectedLocation.lat}</p>
              <p>Longitude: {selectedLocation.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
