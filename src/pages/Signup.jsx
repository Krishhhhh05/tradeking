import { useState } from "react";
import axios from "axios"; // For API calls
import { Link } from "react-router-dom";
// React Icons imports
import {
  FaPercentage,
  FaBolt,
  FaChartLine,
  FaGlobe,
  FaUser,
  FaMobile,
  FaLock,
  FaLanguage,
  FaUserPlus,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../AuthProvider"; // Adjust path
import { useEffect } from "react";
import { useParams } from "react-router-dom";


// Inside your component

const BASE_URL = "https://apexapin.theplatformapi.com/api/apigateway/";

function Signup() {
  const { login, token } = useAuth();

  const params = useParams();

  useEffect(() => {
    if (params.referralCode) {
      setFormData((prev) => ({
        ...prev,
        referralCode: params.referralCode,
      }));
    }
    // eslint-disable-next-line
  }, [params.referralCode]);

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    referralCode: "Tk01", // New input for referral code
  });

  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(null); // For debugging logs/output
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLog("Starting login process...");

    try {
      // 1️⃣ Step 1: Fetch referral code user data
      const url = `/api/admin/public/api/v1/username/${formData.referralCode}`;

      const referralRes = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const referralData = referralRes.data.data;
      console.log("Referral Response:", referralData);

      // 2️⃣ Step 2: Prepare second API request body
      const requestBody = {
        accountID: -1,
        accountMirroringAccountIds:
          referralData.accountMirroringAccountIds || [],
        accountMirroringPolicyId: -1,
        address: referralData.address || "",
        currencySign: referralData.currencySign || "",
        accountIdPrefix: referralData.accountIdPrefix || "",
        clientPriceExecution: referralData.clientPriceExecution,
        canTransferMoney: referralData.canTransferMoney,
        canTransferPosition: referralData.canTransferPosition,
        country: referralData.country || "Afghanistan",
        currenciesPolicyID: referralData.currenciesPolicyId,
        firstName: referralData.firstName || "User",
        forceChangePassword: false,
        genericPolicyID: referralData.genericPolicyId,
        ignoreLiquidation: referralData.ignoreLiquidation,
        isAllowMultiSession: referralData.allowMultiSession,
        isDemo: referralData.demo,
        isLocked: referralData.locked,
        lastName: "",
        mobile: "",
        parentId: referralData.id,
        password: formData.password, // From user input
        secondPassword: formData.password,
        investorPassword: "",
        percentageLevel1: referralData.percentageLevel1,
        percentageLevel2: referralData.percentageLevel2,
        percentageLevel3: referralData.percentageLevel3,
        percentageLevel4: referralData.percentageLevel4,
        creditLoanPercentage: referralData.creditLoanPercentage,
        roboDealerPolicyId: -1,
        telephonePass: "",
        tradingType: referralData.tradingType,
        userCurrencyId: referralData.userCurrencyId,
        userType: 1,
        username: formData.mobile, // You can customize this logic
        validateMoneyBeforeClose: referralData.validateMoneyBeforeClose,
        validateMoneyBeforeEntry: referralData.validateMoneyBeforeEntry,
        closeOnly: referralData.closeOnly,
        openOnly: referralData.openOnly,
        noSellAtLoss: referralData.noSellAtLoss,
        enableCashDelivery: referralData.enableCashDelivery,
        enableDepositRequest: referralData.enableDepositRequest,
        canCreateOrUpdateEntryOrder: referralData.canCreateOrUpdateEntryOrder,
        sendCredentialsEmailToUser: true,
        isVerified: referralData.isVerified,
        ignoreBlockTradeIfInLoss: referralData.ignoreBlockTradeIfInLoss,
        userWhiteListIps: [],
        enableApi: referralData.enableApi,
        chargeMarginForEntry: referralData.chargeMarginForEntry,
      };

      console.log("Second API Request Body:", requestBody);

      const secondApiUrl = `${BASE_URL}admin/public/api/v1/user`; // REPLACE this

      const secondRes = await axios.post(secondApiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Second API Response:", secondRes.data);

      setLog("Login process completed successfully.");

      const userData = secondRes.data?.data; // Assuming response contains user data
      // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE1JTlRFU1QyIiwiYXVkIjoiVU5LTk9XTiIsImlzSW52ZXN0b3IiOmZhbHNlLCJ1c2VyTmFtZSI6IkFETUlOVEVTVDIiLCJleHAiOjI3NjczNDM0MTAyLCJ1c2VySWQiOjk4MjMsImlhdCI6MTc1MzQzNDEwMn0.gBkUkFyvf0c0X9eyonuapkMKXamXrpR4Ucc4jMqaNd7IbLe0a7edKiAgbqeF_v4Dze66w1TiOVWjhwt_zvUqYw';

      // Save to localStorage
      // localStorage.setItem('userData', JSON.stringify(userData));
      // localStorage.setItem('token', token);
      login(userData); // Use the login function from AuthProvider

      setLog("User signed up and logged in successfully.");
    } catch (error) {
      console.error("Error during login process:", error);
      setLog(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    return otp.toString();
  };

  const [otpDisabled, setOtpDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendOTP = async () => {
    const otp = generateRandomOTP();
    setGeneratedOTP(otp);

    const mobile = formData.mobile;

    const message = `Dear Users,%0AYour user ID is active and use OTP ${otp}.%0AThank you for choosing us.%0AWe are happy to help you.%0AProfitVista`;

    const apiUrl = `https://pgapi.smartping.ai/fe/api/v1/send?username=otpsmsgame.trans&password=Qwerty@123&unicode=false&from=PROFN&to=${mobile}&dltPrincipalEntityId=1701172415051608213&dltContentId=1707172467291922195&text=${message}`;
    let response;

    try {
      response = await axios.get(apiUrl);
      console.log(response);
      if (response.status === 200) {
      } else {
        setLog("Failed to send OTP.");
      }
    } catch (error) {
      console.log(response);
      console.error("Error sending OTP:", error);
      // setStatusMessage("Error sending OTP.");
    }
    setLog("OTP sent successfully!");

    // Disable button for 30 seconds
    setOtpDisabled(true);
    setCountdown(30);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOtpDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOTP = () => {
    if (enteredOTP === generatedOTP) {
      setLog("OTP verified successfully!");
    } else {
      setLog("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  overflow-hidden bg-slate-950">
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}

      <div className="relative z-10 flex items-center justify-between h-[100%]">
        {/* Left side - Logo and Features */}
        <div
          className="w-[70%] h-screen relative px-8"
          style={{
            backgroundImage: "url('/eth2.png')", // ensure the image path is correct
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Logo - Positioned at top-left */}
          <div className="absolute top-4 left-4 w-16 h-16 z-10">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Features Grid - Centered horizontally */}
          <div className="absolute bottom-8 grid grid-cols-4 gap-6 justify-items-center w-[85%] left-1/2 transform -translate-x-1/2">
            {/* Zero Brokerage */}
            <div className="group w-full bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md border border-purple-400/30 rounded-3xl p-4 hover:bg-gradient-to-br hover:from-purple-800/60 hover:to-purple-700/40 transition-all duration-500 flex flex-col items-center hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-purple-500/60 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:from-purple-500 group-hover:to-purple-400 transition-all duration-300 shadow-lg">
                <FaPercentage className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-base mb-2 tracking-wide">
                  ZERO BROKERAGE
                </h3>
              </div>
            </div>

            {/* Instant Payouts */}
            <div className="group w-full bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md border border-purple-400/30 rounded-3xl p-4 hover:bg-gradient-to-br hover:from-purple-800/60 hover:to-purple-700/40 transition-all duration-500 flex flex-col items-center hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-purple-500/60 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-500 group-hover:to-purple-400 transition-all duration-300 shadow-lg">
                <FaBolt className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-base mb-2 tracking-wide">
                  INSTANT PAYOUTS
                </h3>
              </div>
            </div>

            {/* Up to 500x */}
            <div className="group w-full bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md border border-purple-400/30 rounded-3xl p-4 hover:bg-gradient-to-br hover:from-purple-800/60 hover:to-purple-700/40 transition-all duration-500 flex flex-col items-center hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-purple-500/60 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-500 group-hover:to-purple-400 transition-all duration-300 shadow-lg">
                <FaChartLine className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-base mb-2 tracking-wide">
                  UPTO 500x
                </h3>
              </div>
            </div>

            {/* Indian & International Markets */}
            <div className="group w-full bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md border border-purple-400/30 rounded-3xl p-4 hover:bg-gradient-to-br hover:from-purple-800/60 hover:to-purple-700/40 transition-all duration-500 flex flex-col items-center hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600/80 to-purple-500/60 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-500 group-hover:to-purple-400 transition-all duration-300 shadow-lg">
                <FaGlobe className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-base mb-2 tracking-wide">
                  GLOBAL MARKETS
                </h3>
              </div>
            </div>
          </div>
        </div>

       
          <div className=" w-[30%] mx-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                REGISTER HERE
              </h1>
              <p className="text-white">Let's Get Started!</p>
            </div>

            <div className="space-y-4">
              {/* Display Referral Code */}
              <div className="w-full px-6 py-4 bg-gradient-to-r from-purple-700/60 to-pink-600/40 border-2 border-purple-400/40 rounded-full text-white font-semibold text-lg flex items-center justify-between shadow-lg">
                <span>Referral Code</span>
                <span className="bg-black/30 px-4 py-1 rounded-full text-cyan-300 tracking-wider font-mono text-base">
            {formData.referralCode}
                </span>
              </div>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Mobile Number"
              />

              <input
                type="text"
                placeholder="Enter OTP"
                value={enteredOTP}
                onChange={(e) => setEnteredOTP(e.target.value)}
                className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="flex justify-center gap-8">
                <button
            disabled={otpDisabled}
            onClick={sendOTP}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
            Send OTP
                </button>

                <button
            onClick={verifyOTP}
            disabled={!formData.mobile || !enteredOTP}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
            Verify
                </button>
              </div>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Password"
              />

              <input
                type="password"
                name="confirmPassword"
                className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                placeholder="Confirm Password"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-white/80">
                Already have an account?{" "}
                <span className="text-cyan-400 font-medium cursor-pointer hover:text-cyan-300">
            Log in here.
                </span>
              </p>
            </div>

            {/* Log output */}
          {log && (
            <div className="mt-4 p-3 bg-black/30 rounded-lg text-green-500 text-sm text-center backdrop-blur-sm">
              {log}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
