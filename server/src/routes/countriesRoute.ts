import express, { Router } from 'express'
import { getCountries, browseCitiesByCountry, browseHotelsByCity } from '../controllers/country-controller'

const router: Router = express.Router()

router.get('/', getCountries)
router.post('/cities', browseCitiesByCountry)
router.post('/hotels', browseHotelsByCity)

export default router