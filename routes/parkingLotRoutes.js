
const express = require('express');
const parkingLotController = require('../controllers/parkingLotController');

const router = express.Router();

router.get('/free-slots/:vehicleType', parkingLotController.getFreeSlots);
router.post('/book-slot', parkingLotController.bookSlot);
router.post('/unpark/:ticketId', parkingLotController.unparkVehicle);

module.exports = router;
