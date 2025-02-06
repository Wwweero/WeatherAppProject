require("dotenv").config(); // Loads environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Enables CORS to allow frontend requests
app.use(express.json()); // Allows JSON parsing


console.log("Server script is running");



const cache = {}; // In-memory cache
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    const currentTime = Date.now();

    // Checks if city is in cache & not expired
    if (cache[city] && currentTime - cache[city].timestamp < CACHE_DURATION) {
        console.log(`Serving from cache: ${city}`);
        return res.json(cache[city].data);
    }

    try {
        // Fetches new data from OpenWeather API
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        //  Saves data to cache
        cache[city] = {
            data: response.data,
            timestamp: Date.now(),
        };

        console.log(`Fetched new data for: ${city}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});







// Weather API Route
app.get("/weather", async (req, res) => {
    console.log("Got the request");
    try {
        const city = req.query.city;
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        const API_KEY = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
