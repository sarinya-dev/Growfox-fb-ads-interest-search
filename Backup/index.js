const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Enable CORS to allow requests from React frontend

// Endpoint for searching Facebook Ads interests
app.post('/search', async (req, res) => {
    const query = req.body.query;
    const tokey_key = 'EAAXwiZB4nGnMBO3NkCbmuGAPCrTsNUzs0IjQGQZBQoYxIQggnEp3rIVcex9p7J383my8aJ7ezF8PwbBwRdcZCCW8PHCHUYTOAMVdyhycTENkZCUTKECcCWgFWXhGCQrFjkVxVJZC1Rr8gWnuw5JlC9ZCbEwfMkUVk8CUO7CoVHMVfLfMSvkZACdE3iFpcMVVwr6p4u9gMjzeRm2mBdwMCzMuIWw';
    //const url = `https://graph.facebook.com/v17.0/search?type=adinterest&q=${query}&access_token=${process.env.FB_ACCESS_TOKEN}`;
    const url = `https://graph.facebook.com/v17.0/search?type=adinterest&q=${query}&access_token=${tokey_key}`;

    try {
        const response = await axios.get(url);
        const interests = response.data.data;
        res.json(interests);
    } catch (error) {
        console.error('Error fetching data from Facebook API:', error);
        res.status(500).send('Error fetching data from Facebook');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});