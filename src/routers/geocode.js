const express = require('express')
const { query } = require('express-validator')
const validate = require('../middleware/validate')
const geocode = require('../utils/geocode')

const router = new express.Router()

router.get('/geocode', validate([
        query('city').exists().withMessage('required'),
        query('state').exists().withMessage('required'),
        query('country').exists().withMessage('required'),
    ]),
    async (req, res) => {
        const { city, state, country } = req.query

        try {
            const location = await geocode(city, state, country)

            if (!location) {
                return res.status(404).send()
            }

            res.send(location)
        } catch (e) {
            res.status(500).send()          
        }
    }
)

module.exports = router