const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// static image folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// test route
app.get("/", (req,res)=> res.send("API Working"));

// routes mount (we add later)
const authRoutes = require('./routes/auth');
app.use("/api/auth", authRoutes);

const bookRoutes = require('./routes/books');
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server Running on " + PORT));
