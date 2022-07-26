# weather-service
Express api application utilizing Open Weather API to get current weather conditions at a specific lat/long.

## Getting Started Dev

Create a config/dev.env file with the following configurations:
```configurations
PORT=[port to run app on]
OPEN_WEATHER_API_KEY=[api key for open weather api]
FEELS_COLD=[fahrenheit degree where feels "cold" starts]
FEELS_HOT=[fahrenheit degree where feels "hot" starts]
```
For FEELS_COLD, if the temp is less than or equals to the value, the api will return "cold" for "feels" property.  
For FEELS_HOT, if the temp is greater than or equals to the value, the api will return "hot" for the "feels" property.

Install dependent packages
```bash
npm i
```

Run application
```bash
npm run dev
```

Run tests
```bash
npm run test
```

Run test coverage
```bash
npm run coverage
```

## Geocode Endpoint
Api has a geocoding endpoint to retrieve lat/long data for a specific location.

Geocode example endpoint
```request
GET localhost:3000/geocode?city=Lilburn&state=GA&country=US

Response 200 OK: 
{
    "city": "Norcross",
    "state": "Georgia",
    "country": "US",
    "lat": 33.9412127,
    "long": -84.2135309
}

city is required
state is required
country is required
```
If any of these fields are omitted, a 400 Bad Request will be returned.

404 Not Found will return if city, state, and country combination does not return a valid location.

## Forecast Endpoint
Api has a forecast endpoint to retrieve current conditions at a given lat/long.  If there are any alerts, they will be displayed in the alerts array.

Forecast example endpoint
```request
GET localhost:3000/forecast?lat=33.9412127&long=-84.2135309

Response 200 OK: 
{
    "condition": "Clouds",
    "temp": 89.53,
    "feels": "hot",
    "alerts": [
    	{
		"event": "Hurricane Warning",
		"description": "Offshore Waters Forecast for the E Pacific"
	},
        ...
    ]
}

lat is required (between -90 and 90)
long is required (between -180 and 180)
```
If any of these fields are omitted or go outside of allowed range, a 400 Bad Request will be returned.

