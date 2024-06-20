import { useState } from 'react';
import { useParams } from 'react-router-dom';


router.get('/currencies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    // Fetch all currencies (replace with your actual data fetching logic)
    const allCurrencies = await fetchAllCurrencies(); // You'll need to implement this function

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currencies = allCurrencies.slice(startIndex, endIndex);

    res.json(currencies); 
  } catch (error) {
    // ... error handling ...
  }
});


// routes/data.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // For making HTTP requests

// Replace 'YOUR_COINAPI_KEY' with your actual CoinAPI key
const COINAPI_KEY = "8133BBD2-A2DD-4153-88E5-1FC13483F153";

router.get('/price/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const response = await fetch(
      `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${COINAPI_KEY}`
    );
    const data = await response.json();

    if (response.ok) {
      // Check if the 'rate' property exists in the response
      if (data.rate) {
        res.json({ symbol, price: data.rate });
      } else {
        res.status(404).json({ error: 'Invalid cryptocurrency symbol' });
      }
    } else {
      res.status(response.status).json({ error: data.error || 'API request failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
