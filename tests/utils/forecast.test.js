const { onecall } = require('../../src/utils/open-weather')
const forecast = require('../../src/utils/forecast')

jest.mock('../../src/utils/open-weather')

test('Should return null when location not found', async () => {
	onecall.mockReturnValue(Promise.resolve(null))

	const weather = await forecast(20.3184, -105.3216)

	expect(weather).toBeNull()
})

test('Should return weather condition when location found', async () => {
	onecall.mockReturnValue(Promise.resolve({
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
	}))

	const weather = await forecast(20.3184, -105.3216)

	expect(weather).toEqual({
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

test('Should return Error for general error', async () => {
	onecall.mockReturnValue(Promise.reject('Error response from weather service.'))

	await expect(forecast(20.3184, -105.3216)).rejects.toMatch('Error response from weather service.')
})

test('Should return Error for error', async () => {
	onecall.mockReturnValue(Promise.reject('Unable to connect to weather service.'))

	await expect(forecast(20.3184, -105.3216)).rejects.toMatch('Unable to connect to weather service.')
})

describe("Temperature feels", () => {
	it.each([
		[parseInt(process.env.FEELS_COLD) - 1, 'cold'],
		[parseInt(process.env.FEELS_COLD), 'cold'],
		[parseInt(process.env.FEELS_COLD) + 1, 'moderate'],
		[parseInt(process.env.FEELS_HOT) - 1, 'moderate'],
		[parseInt(process.env.FEELS_HOT), 'hot'],
		[parseInt(process.env.FEELS_HOT) + 1, 'hot']
	])(
		'%i degrees should feel %s',
		async (temp, feels) => {
			onecall.mockReturnValue(Promise.resolve({
				at: 20.3184,
				lon: -105.3216,
				timezone: "America/Mexico_City",
				timezone_offset: -18000,
				current: {
					dt: 1658005746,
					sunrise: 1657974604,
					sunset: 1658022254,
					temp,
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
				}
			}))
		
			const weather = await forecast(20.3184, -105.3216)
		
			expect(weather).toMatchObject({ feels })
		}
	)
})

