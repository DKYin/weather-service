const request = require('request')
const supertest = require('supertest')
const app = require('../../src/app')

jest.mock('request')

test('Should return 404 when no location', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 200 }, [])
    })

    await supertest(app).get('/geocode?city=X&state=X&country=X')
        .send()
        .expect(404)
})

test('Should return 200 when location found', async () => {
    request.mockImplementation((options, callback) => {
        callback(undefined, { statusCode: 200 }, [{
            name: 'Lilburn',
            lat: 33.8901036,
            lon: -84.1429719,
            country: 'US',
            state: 'Georgia'
        }])
    })

    const response = await supertest(app).get('/geocode?city=lilburn&state=ga&country=us')
        .send()
        .expect(200)

    expect(response.body).toEqual({ 
        city: 'Lilburn', 
        state: 'Georgia',
        country: 'US', 
        lat: 33.8901036, 
        long: -84.1429719 
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

    await supertest(app).get('/geocode?city=X&state=X&country=X')
        .send()
        .expect(500)
})

test('Should return 400 when missing city', async () => {
    const response = await supertest(app).get('/geocode?state=X&country=X')
        .send()
        .expect(400)

    expect(response.body).toEqual({
        "errors": [
            {
                "msg": "required",
                "param": "city",
                "location": "query"
            }
        ]
    })
})

test('Should return 400 when missing state', async () => {
    const response = await supertest(app).get('/geocode?city=X&country=X')
        .send()
        .expect(400)

    expect(response.body).toEqual({
        "errors": [
            {
                "msg": "required",
                "param": "state",
                "location": "query"
            }
        ]
    })
})

test('Should return 400 when missing country', async () => {
    const response = await supertest(app).get('/geocode?city=X&state=X')
        .send()
        .expect(400)

    expect(response.body).toEqual({
        "errors": [
            {
                "msg": "required",
                "param": "country",
                "location": "query"
            }
        ]
    })
})