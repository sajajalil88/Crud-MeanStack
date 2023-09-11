var express = require('express');
var router = express.Router();
const countryController = require('../controllers/countryController')

router.route('/')
    //everyone can access the get route
    .get(countryController.getAllCountries)
    //only admins and editors can access the post 
    .post(countryController.createNewCountry)
    .put(countryController.updateCountry)
    //only admins can delete employees
    .delete(countryController.deleteCountry);

router.route('/:id')
    .get(countryController.getCountry);

module.exports = router;