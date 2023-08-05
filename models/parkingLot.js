const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
  floor: Number,
  slotNumber: Number,
  vehicleType: String,
  isOccupied: { type: Boolean, default: false },
});

const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = ParkingLot;
