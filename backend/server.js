const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookfinder')
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log("DB Connection Error: ", err));

// Routes
app.use("/api/auth", authRoute);

app.get('/', (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
