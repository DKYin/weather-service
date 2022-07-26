const { onecall } = require('../utils/open-weather')

const forecast = async (lat, long) => {
    const exclude = 'minutely,hourly,daily'
    const units = 'imperial'

    const weather = await onecall(lat, long, exclude, units, process.env.OPEN_WEATHER_API_KEY)

    if (!weather) {
        return null;
    } 

    return {
        condition: weather.current.weather[0].main,
        temp: weather.current.temp,
        feels: getFeels(weather.current.temp),
        alerts: getAlerts(weather.alerts)
    }
}

const getFeels = (temperature) => {
    if (temperature <= parseInt(process.env.FEELS_COLD)) {
        return 'cold'
    } else if (temperature >= parseInt(process.env.FEELS_HOT)) {
        return 'hot'
    } else {
        return 'moderate'
    }
}

const getAlerts = (alerts = []) => {
    return alerts.map(({ event, description }) => ({ event, description }))
}

module.exports = forecast