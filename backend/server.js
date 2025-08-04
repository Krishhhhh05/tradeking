const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tradeking-tan.vercel.app"]
  })
);
app.use(express.json());

// Route to call the external login API
app.get("/get_token", async (req, res) => {
 
  let data = JSON.stringify({
  "companyName": "Trade king",
  "password": "1234578",
  "userName": "test02"
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

// In-memory OTP store: { mobile: { otp, expiresAt } }
const otpStore = {};

// Utility to generate 4-digit OTP
const generateRandomOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP API
app.post('/api/send-otp', async (req, res) => {
  const { mobile } = req.body;

  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({ error: 'Invalid or missing mobile number' });
  }

  const otp = generateRandomOTP();
  const message = `Dear Users,%0AYour user ID is active and use OTP ${otp}.%0AThank you for choosing us.%0AWe are happy to help you.%0AProfitVista`;

  const apiUrl = `https://pgapi.smartping.ai/fe/api/v1/send?username=otpsmsgame.trans&password=Qwerty@123&unicode=false&from=PROFN&to=${mobile}&dltPrincipalEntityId=1701172415051608213&dltContentId=1707172467291922195&text=${message}`;

  try {
    await axios.get(apiUrl);
    // Save OTP in memory with 5-min expiry
    otpStore[mobile] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    };
    res.status(200).json({ status: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP API
app.post('/api/verify-otp', (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ error: 'Mobile and OTP are required' });
  }

  const record = otpStore[mobile];
  if (!record) {
    return res.status(400).json({ error: 'No OTP sent to this mobile' });
  }

  const { otp: validOtp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    delete otpStore[mobile]; // Clean up expired OTP
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (otp === validOtp) {
    delete otpStore[mobile]; // OTP is used, clean up
    return res.status(200).json({ status: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
