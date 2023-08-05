const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const parkingLotRoutes = require('./routes/parkingLotRoutes');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/parking-lot', parkingLotRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
