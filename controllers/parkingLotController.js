const ParkingLot = require('../models/ParkingLot');

//he4a ll creation mt3 slots
exports.createSlots = async (req, res) => {
  try {
    const slotsData = req.body.slotsData;
    const createdSlots = await ParkingLot.createSlots(slotsData);

    res.json({ message: 'Slots created successfully', createdSlots });
  } catch (err) {
    console.error('Error creating slots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//he4a bech yjiblek el free slots bl vehicle type
exports.getFreeSlots = async (req, res) => {
  try {
    const vehicleType = req.params.vehicleType.toLowerCase();
    const freeSlots = await ParkingLot.countDocuments({
      vehicleType,
      isOccupied: false,
    });

    res.json({ freeSlots });
  } catch (err) {
    console.error('Error fetching free slots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//he4a tbooki bih slot bl vehicle type
exports.bookSlot = async (req, res) => {
  try {
    const vehicleType = req.body.vehicleType.toLowerCase();
    const parkingLot = await ParkingLot.findOneAndUpdate(
      {
        vehicleType,
        isOccupied: false,
      },
      { isOccupied: true },
      { new: true }
    );

    if (!parkingLot) {
      return res.status(404).json({ error: 'No available slot found for this vehicle type.' });
    }

    res.json({ ticketId: parkingLot._id });
  } catch (err) {
    console.error('Error booking a slot:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//he4a tunparki bih lvehicule
exports.unparkVehicle = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const parkingLot = await ParkingLot.findByIdAndUpdate(ticketId, { isOccupied: false });

    if (!parkingLot) {
      return res.status(404).json({ error: 'Ticket ID not found or the vehicle is already unparked.' });
    }

    res.json({ message: 'Vehicle has been unparked successfully.' });
  } catch (err) {
    console.error('Error unparking the vehicle:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};