from geopy.geocoders import Nominatim
import math

# Function to get latitude and longitude from address
def get_lat_lng(address):
    # Initialize Nominatim geolocator
    geolocator = Nominatim(user_agent="myGeocoder")  # Always set a user-agent
    
    # Geocode the address
    location = geolocator.geocode(address)
    
    # Check if the address was found
    if location:
        latitude = location.latitude
        longitude = location.longitude
        return latitude, longitude
    else:
        print(f"Address '{address}' not found!")
        return None, None

# Haversine formula to calculate distance between two points
def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in kilometers
    R = 6371.0
    
    # Convert latitude and longitude from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Difference in coordinates
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    
    # Haversine formula
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    # Distance in kilometers
    distance = R * c
    return distance

# Main logic to calculate distance between two addresses
def calculate_distance_between_addresses(source, destination):
    # Get latitude and longitude for both source and destination
    source_lat, source_lng = get_lat_lng(source)
    dest_lat, dest_lng = get_lat_lng(destination)
    
    if source_lat is not None and dest_lat is not None:
        # Calculate the distance using the Haversine formula
        distance = haversine(source_lat, source_lng, dest_lat, dest_lng)
        print(f"The distance between '{source}' and '{destination}' is {distance:.2f} kilometers.")
    else:
        print("Could not calculate distance due to invalid addresses.")


# Example addresses, change to get from producer/consumer
source = "6080 Student Union Blvd, Vancouver, BC V6T 1Z1"  
destination = "5955 Student Union Blvd, Vancouver, BC"

# Calculate distance between the two addresses
calculate_distance_between_addresses(source, destination)

