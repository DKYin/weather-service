const express = require('express')
const { query } = require('express-validator')
const validate = require('../middleware/validate')
const forecast = require('../utils/forecast')

const router = new express.Router()

router.get('/forecast', validate([
        query('lat')
            .exists().withMessage('required').bail()
            .custom((value) => value >= -90 && value <= 90).withMessage('invalid'),
        query('long')
            .exists().withMessage('required').bail()
            .custom((value) => value >= -180 && value <= 180).withMessage('invalid'),
    ]),
    async (req, res) => {
        const { lat, long } = req.query

        try {
            const weather = await forecast(lat, long)

            if (!weather) {
                return res.status(404).send()
            }

            res.send(weather)
        } catch (e) {
            res.status(500).send()          
        }
    }
)

module.exports = router