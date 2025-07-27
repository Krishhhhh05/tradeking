const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Route to call the external login API
app.get("/get_token", async (req, res) => {
 
  let data = JSON.stringify({
  "companyName": "Trade king",
  "password": "15498",
  "userName": "ADMINTEST2"
});


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://apexapin.theplatformapi.com/api/apigateway/login/public/api/v1/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
  try {
    const response = await axios.request(config);
    res.json(response.data.data.token);
  } catch (error) {
    // console.error("Login API Error:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

app.post('/api/cash-request', async (req, res) => {
  const { amount, comment, userId, authToken } = req.body;

  // Basic validation
  if (!authToken || !amount || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const requestData = {
    amount,
    branchId: 3,
    comment,
    userId,
    secondPassword: "1122"
  };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://apexapin.theplatformapi.com/api/apigateway/trading/public/api/v1/cashRequest',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': authToken
    },
    data: JSON.stringify(requestData)
  };

  try {
    const response = await axios.request(config);
    res.status(200).json(response.data); // Send response back to frontend
  } catch (error) {
    console.error('API request failed:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data); // Forward API error
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
