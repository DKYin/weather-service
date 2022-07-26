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
```
city is required
state is required
country is required
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
    alerts: [{
				event: 'Hurricane Warning',
				description: 'Offshore Waters Forecast for the E Pacific within 250 nm of\n' +
					'Mexico\n' +
					'Seas given as significant wave height, which is the average\n' +
					'height of the highest 1/3 of the waves. Individual waves may be\n' +
					'more than twice the significant wave height.\n' +
					'...HURRICANE WARNING...\n' +
					'.TODAY...Near Cabo Corrientes, N to NE winds 10 kt, shifting to\n' +
					'W to NW in the afternoon. Elsewhere, N to NE winds 10 to 15 kt,\n' +
					'shifting to W to NW 15 to 20 kt in the afternoon. Seas 4 to\n' +
					'6 ft. Period 16 seconds.\n' +
					'.TONIGHT...HURRICANE CONDITIONS POSSIBLE. Near Cabo Corrientes,\n' +
					'W to NW winds 10 to 15 kt, shifting to E late.\n' +
					'Elsewhere, NW winds 25 to 30 kt. Seas 6 to 8 ft in S swell.\n' +
					'Period 17 seconds. Scattered showers and isolated tstms.\n' +
					'.SUN...TROPICAL STORM CONDITIONS EXPECTED. Near Cabo\n' +
					'Corrientes, NE to E winds 20 to 25 kt, shifting to SE in the\n' +
					'afternoon. Elsewhere, E winds 60 to 65 kt, becoming SE 45 to\n' +
					'50 kt in the afternoon. Seas 9 to 13 ft in SE to S swell. Period\n' +
					'21 seconds. Scattered showers and isolated tstms.\n' +
					'.SUN NIGHT...TROPICAL STORM CONDITIONS EXPECTED. SE winds 20 to\n' +
					'25 kt Near Cabo Corrientes, and SE 35 to 45 kt Elsewhere. Seas\n' +
					'12 to 18 ft in SE to S swell. Period 21 seconds. Scattered\n' +
					'showers and isolated tstms. Vsby 1 NM or less.\n' +
					'.MON...HURRICANE CONDITIONS POSSIBLE. E to SE winds 35 to\n' +
					'40 kt, becoming SE to S 25 to 30 kt in the afternoon. Seas 10 to\n' +
					'16 ft in S swell. Period 19 seconds.\n' +
					'.MON NIGHT...SE to S winds 20 to 25 kt. Seas 9 to 13 ft in S to\n' +
					'SW swell. Period 18 seconds.\n' +
					'.TUE...E to SE winds 15 to 20 kt. Seas 7 to 11 ft in SW swell.\n' +
					'Period 17 seconds.\n' +
					'.TUE NIGHT...W to NW winds 15 to 20 kt. Seas 6 to 9 ft in SW\n' +
					'swell. Period 16 seconds.\n' +
					'.WED...NW to N winds 15 to 20 kt. Seas 5 to 7 ft. Period\n' +
					'16 seconds.'
			},
            ...
    ]
}
```
lat is required (between -90 and 90)
long is required (between -180 and 180)
If any of these fields are omitted or go outside of allowed range, a 400 Bad Request will be returned.

