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
    console.error("Login API Error:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
