const { geo } = require('../../src/utils/open-weather')
const geocode = require('../../src/utils/geocode')

jest.mock('../../src/utils/open-weather')

test('Should return null when no location found', async () => {
    geo.mockReturnValue(Promise.resolve([]))

    const location = await geocode('lilburn', 'ga', 'us')
    
    expect(location).toBeNull()
})

test('Should return lat/long when location found', async () => {
    geo.mockReturnValue(Promise.resolve([{
        name: 'Lilburn',
        lat: 33.8901036,
        lon: -84.1429719,
        country: 'US',
        state: 'Georgia'
    }]))

    const location = await geocode('lilburn', 'ga', 'us')

    expect(location).toEqual({ 
        city: 'Lilburn', 
        state: 'Georgia', 
        country: 'US', 
        lat: 33.8901036, 
        long: -84.1429719 
    })
})

test('Should return Error for general error', async () => {
    geo.mockReturnValue(Promise.reject('Error response from geocoding service.'))

    await expect(geocode('lilburn', 'ga', 'us')).rejects.toMatch('Error response from geocoding service.')
})

test('Should return Error for error', async () => {
    geo.mockReturnValue(Promise.reject('Unable to connect to geocoding service.'))

    await expect(geocode('lilburn', 'ga', 'us')).rejects.toMatch('Unable to connect to geocoding service.')
})