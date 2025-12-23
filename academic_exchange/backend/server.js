const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const listingsRoute = require('./routes/listings');
const authRoute = require('./routes/auth'); // new

console.log('MONGO_URI is:', process.env.MONGO_URI);
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Academic Exchange Backend');
});

app.use('/api/listings', listingsRoute);
app.use('/api/auth', authRoute); // new

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
