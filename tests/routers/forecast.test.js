const request = require('request')
const supertest = require('supertest')
const app = require('../../src/app')

jest.mock('request')

const mockOpenWeatherResponse200 = () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 200 }, {
            lat: 20.3184,
            lon: -105.3216,
            timezone: "America/Mexico_City",
            timezone_offset: -18000,
            current: {
                dt: 1658005746,
                sunrise: 1657974604,
                sunset: 1658022254,
                temp: 82.92,
                feels_like: 87.21,
                pressure: 1010,
                humidity: 66,
                dew_point: 70.39,
                uvi: 8.64,
                clouds: 71,
                visibility: 10000,
                wind_speed: 4.41,
                wind_deg: 252,
                wind_gust: 4.99,
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d"
                    }
                ]
            },
            alerts: [
                {
                    sender_name: "NWS NWS National Hurricane Center (NWS National Hurricane Center - Miami, Florida)",
                    event: "Hurricane Warning",
                    start: 1657936620,
                    end: 1658009700,
                    description: "Offshore Waters Forecast for the E Pacific within 250 nm of\nMexico\nSeas given as significant wave height, which is the average\nheight of the highest 1/3 of the waves. Individual waves may be\nmore than twice the significant wave height.\n...HURRICANE WARNING...\n.TODAY...Near Cabo Corrientes, N to NE winds 10 kt, shifting to\nW to NW in the afternoon. Elsewhere, N to NE winds 10 to 15 kt,\nshifting to W to NW 15 to 20 kt in the afternoon. Seas 4 to\n6 ft. Period 16 seconds.\n.TONIGHT...HURRICANE CONDITIONS POSSIBLE. Near Cabo Corrientes,\nW to NW winds 10 to 15 kt, shifting to E late.\nElsewhere, NW winds 25 to 30 kt. Seas 6 to 8 ft in S swell.\nPeriod 17 seconds. Scattered showers and isolated tstms.\n.SUN...TROPICAL STORM CONDITIONS EXPECTED. Near Cabo\nCorrientes, NE to E winds 20 to 25 kt, shifting to SE in the\nafternoon. Elsewhere, E winds 60 to 65 kt, becoming SE 45 to\n50 kt in the afternoon. Seas 9 to 13 ft in SE to S swell. Period\n21 seconds. Scattered showers and isolated tstms.\n.SUN NIGHT...TROPICAL STORM CONDITIONS EXPECTED. SE winds 20 to\n25 kt Near Cabo Corrientes, and SE 35 to 45 kt Elsewhere. Seas\n12 to 18 ft in SE to S swell. Period 21 seconds. Scattered\nshowers and isolated tstms. Vsby 1 NM or less.\n.MON...HURRICANE CONDITIONS POSSIBLE. E to SE winds 35 to\n40 kt, becoming SE to S 25 to 30 kt in the afternoon. Seas 10 to\n16 ft in S swell. Period 19 seconds.\n.MON NIGHT...SE to S winds 20 to 25 kt. Seas 9 to 13 ft in S to\nSW swell. Period 18 seconds.\n.TUE...E to SE winds 15 to 20 kt. Seas 7 to 11 ft in SW swell.\nPeriod 17 seconds.\n.TUE NIGHT...W to NW winds 15 to 20 kt. Seas 6 to 9 ft in SW\nswell. Period 16 seconds.\n.WED...NW to N winds 15 to 20 kt. Seas 5 to 7 ft. Period\n16 seconds.",
                    tags: [
                        "Wind"
                    ]
                }
            ]
        })
    })
}

test('Should return 404 when no location', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 400 }, {
            cod: "400",
            message: "wrong latitude"
        })
    })

    await supertest(app).get('/forecast?lat=33.8901036&long=-84.1429719')
        .send()
        .expect(404)
})

test('Should return 200 when location found', async () => {
    mockOpenWeatherResponse200()

    const response = await supertest(app).get('/forecast?lat=33.8901036&long=-84.1429719')
        .send()
        .expect(200)

    expect(response.body).toEqual({
		condition: 'Clouds',
		temp: 82.92,
		feels: 'hot',
		alerts: [
			{
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
			}
		]
	})
})

test('Should return 500 when service errors', async () => {
    request.mockImplementation((options, callback) => {
        callback({
            errno: -3008,
            code: 'ENOTFOUND',
            syscall: 'getaddrinfo',
            hostname: 'api.openweathermap.org'
        }, undefined)
    })

    await supertest(app).get('/forecast?lat=33.8901036&long=-84.1429719')
        .send()
        .expect(500)
})

test('Should return 400 when missing long', async () => {
    const response = await supertest(app).get('/forecast?lat=33.8901036')
        .send()
        .expect(400)

    expect(response.body).toEqual({
        "errors": [
            {
                "msg": "required",
                "param": "long",
                "location": "query"
            }
        ]
    })
})

test('Should return 400 when missing lat', async () => {
    const response = await supertest(app).get('/forecast?long=-84.1429719')
        .send()
        .expect(400)

    expect(response.body).toEqual({
        "errors": [
            {
                "msg": "required",
                "param": "lat",
                "location": "query"
            }
        ]
    })
})

describe("Lat validation", () => {
	it.each([
		['-90.1', 400],
		['-90', 200],
        ['0', 200],
		['90', 200],
		['90.1', 400],
        ['?', 400]
	])(
		'%s lat should return %i',
		async (lat, statusCode) => {
            mockOpenWeatherResponse200()

            const response = await supertest(app).get(`/forecast?lat=${lat}&long=-84.1429719`)
                .send()
                .expect(statusCode)

            if (statusCode === 400) {
                expect(response.body).toEqual({
                    "errors": [
                        {
                            "location": "query",                            
                            "msg": "invalid",
                            "param": "lat",
                            "value": lat
                        }
                    ]
                })
            }
        }
	)
})

describe("Long validation", () => {
	it.each([
		['-180.1', 400],
		['-180', 200],
        ['0', 200],
		['180', 200],
		['180.1', 400],
        ['?', 400]
	])(
		'%s long should return %i',
		async (long, statusCode) => {
            mockOpenWeatherResponse200()

            const response = await supertest(app).get(`/forecast?lat=41.5051613&long=${long}`)
                .send()
                .expect(statusCode)

            if (statusCode === 400) {
                expect(response.body).toEqual({
                    "errors": [
                        {
                            "location": "query",                            
                            "msg": "invalid",
                            "param": "long",
                            "value": long
                        }
                    ]
                })
            }
        }
	)
})