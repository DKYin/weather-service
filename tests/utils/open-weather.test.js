const request = require('request')
const { onecall, geo } = require('../../src/utils/open-weather.js')

jest.mock('request')

test('Should reject when error connection to onecall service', async () => {
    request.mockImplementation((options, callback) => {
        callback({
            errno: -3008,
            code: 'ENOTFOUND',
            syscall: 'getaddrinfo',
            hostname: 'api.openweathermap.org'
        }, undefined)
    })

    await expect(onecall(20.3184, -105.3216, 'minutely,hourly,daily', 'imperial', 'apiKey')).rejects.toMatch('Unable to connect to weather service.')
})

test('Should be null when no location match returned from onecall service', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 400 }, {
            cod: "400",
            message: "wrong latitude"
        })
    })
    
    const weather = await onecall(20.3184, -105.3216, 'minutely,hourly,daily', 'imperial', 'apiKey')
    
    expect(weather).toBeNull()
})

test('Should return weather when weather returned from onecall service', async () => {
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

    const weather = await onecall(20.3184, -105.3216, 'minutely,hourly,daily', 'imperial', 'apiKey')

    expect(weather).toMatchObject({
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

test('Should reject when 401 statusCode returned from onecall service', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 401 }, {})  
    })

    await expect(onecall(20.3184, -105.3216, 'minutely,hourly,daily', 'imperial', 'apiKey')).rejects.toMatch('Error response from weather service.')
})

test('Should reject when error connection to geo service', async () => {
    request.mockImplementation((options, callback) => {
        callback({
            errno: -3008,
            code: 'ENOTFOUND',
            syscall: 'getaddrinfo',
            hostname: 'api.openweathermap.org'
        }, undefined)
    })

    await expect(geo('lilburn', 'ga', 'us', 1, 'apiKey')).rejects.toMatch('Unable to connect to geocoding service.')
})

test('Should return empty array when no location match returned from geo service', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 200 }, [])
    })
    
    const weather = await geo('lilburn', 'ga', 'us', 1, 'apiKey')
    
    expect(weather).toEqual([])
})

test('Should return location when location match returned from geo service', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 200 }, [{
            name: 'Lilburn',
            lat: 33.8901036,
            lon: -84.1429719,
            country: 'US',
            state: 'Georgia'
        }])
    })

    const location = await geo('lilburn', 'ga', 'us', 1, 'apiKey')

    expect(location).toMatchObject([{
        name: 'Lilburn',
        lat: 33.8901036,
        lon: -84.1429719,
        country: 'US',
        state: 'Georgia'
    }])
})

test('Should reject when 401 statusCode returned from geo service', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 401 }, {})  
    })

    await expect(geo('lilburn', 'ga', 'us', 1, 'apiKey')).rejects.toMatch('Error response from geocoding service.')
})