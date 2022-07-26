const { geo } = require('../utils/open-weather')

const geocode = async (city, state, country) => {
    const limit = 1;
    const locations = await geo(city, state, country, limit, process.env.OPEN_WEATHER_API_KEY)

    if (locations.length === 0) {
        return null;
    } 
       
    return { 
        city: locations[0].name, 
        state: locations[0].state,
        country: locations[0].country, 
        lat: locations[0].lat, 
        long: locations[0].lon
    }
}

module.exports = geocode