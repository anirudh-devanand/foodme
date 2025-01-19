import requests

def get_distance_and_duration(origin, destination, api_key):
    try:
        # Base URL for the Google Maps Distance Matrix API
        base_url = "https://maps.googleapis.com/maps/api/distancematrix/json"

        # Parameters for the API request
        params = {
            "origins": origin,
            "destinations": destination,
            "key": api_key
        }

        # Make the API request
        response = requests.get(base_url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            # Check if rows exist
            if "rows" in data and len(data["rows"]) > 0:
                elements = data["rows"][0].get("elements", [])
                
                # Check if elements exist
                if len(elements) > 0 and elements[0].get("status") == "OK":
                    distance = elements[0]["distance"]["text"]
                    duration = elements[0]["duration"]["text"]
                    return f"Distance: {distance}, Duration: {duration}"
                else:
                    return f"Error: {elements[0]['status']}" if elements else "No elements found in response."
            else:
                return "No rows found in response."
        else:
            return f"HTTP Error: {response.status_code}"
    except Exception as e:
        return f"An error occurred: {str(e)}"

origin = "5955 Student Union Blvd"
destination = "6137 Cambie Stret"
api_key = "AIzaSyBFohVz8rmdM6jz2AvFUNXavXwtMBiSYoY"
print(get_distance_and_duration(origin, destination, api_key))
