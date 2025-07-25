import { useState } from 'react';
import axios from 'axios'; // For API calls
import { Link } from 'react-router-dom';
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
  FaChevronDown 
} from 'react-icons/fa';

const BASE_URL = 'https://apexapin.theplatformapi.com/api/apigateway/';
const REFERRAL_API = '/api/admin/public/api/v1/user/';


// axios.get('/api/admin/public/api/v1/user/' + referralCode)


function Signup() {
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    referralCode: '', // New input for referral code
  });

  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(null); // For debugging logs/output

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLog("Starting login process...");

    try {
      // 1️⃣ Step 1: Fetch referral code user data
      const referralUrl = `${REFERRAL_API}${formData.referralCode}`;
      const referralRes = await axios.get(referralUrl);
      const referralData = referralRes.data.data;
      console.log("Referral Response:", referralData);

      // 2️⃣ Step 2: Prepare second API request body
      const requestBody = {
        accountID: -1,
        accountMirroringAccountIds: referralData.accountMirroringAccountIds || [],
        accountMirroringPolicyId: -1,
        address: referralData.address || "",
        currencySign: referralData.currencySign || "",
        accountIdPrefix: referralData.accountIdPrefix || "",
        userAgentCommissionPolicyAccountDTOS: [
          {
            agentCommissionPolicyId: 0,
            agentCommissionAccountId: 0
          }
        ],
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
        parentId: referralData.parentId,
        password: formData.password, // From user input
        secondPassword: "",
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
        userType: referralData.userType,
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

      // 3️⃣ Step 3: Make second API call (replace below URL with actual endpoint)
      const secondApiUrl = `${BASE_URL}admin/public/api/v1/user`; // REPLACE this
      const secondRes = await axios.post(secondApiUrl, requestBody);
      console.log("Second API Response:", secondRes.data);

      setLog("Login process completed successfully.");
    } catch (error) {
      console.error("Error during login process:", error);
      setLog(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  overflow-hidden bg-slate-950" >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}
      
     
      <div className="relative z-10 flex items-center justify-between h-[100%]">
        {/* Left side - Logo and Features */}
     <div
  className="w-[70%] h-screen relative px-8"
  style={{
    backgroundImage: "url('/eth2.png')", // ensure the image path is correct
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  {/* Logo - Positioned at top-left */}
  <div className="absolute top-4 left-4 w-16 h-16 z-10">
    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
  </div>

  {/* Features Grid - Centered horizontally */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 grid grid-cols-4 gap-4 justify-items-center w-[80%]">
    {/* Zero Brokerage */}
    <div className=" w-full bg-purple-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:bg-purple-800/50 transition-all duration-300 flex flex-col items-center">
      <div className=" w-12 h-12 bg-purple-700/60 rounded-xl flex items-center justify-center mb-4 mx-auto">
        <FaPercentage className="w-6 h-6 text-white" />
      </div>
      <div className="text-center">
        <h3 className="text-white font-semibold text-sm mb-1">ZERO</h3>
        <p className="text-white/80 text-xs">BROKERAGE</p>
      </div>
    </div>
            <div className="w-full  flex flex-col  items-center  bg-purple-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:bg-purple-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-700/60 rounded-xl flex items-center justify-center mb-4">
                <FaBolt className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1">INSTANT</h3>
                <p className="text-white/80 text-xs">PAYOUTS</p>
              </div>
            </div>

            {/* Up to 500x */}
            <div className="w-full  flex flex-col items-center bg-purple-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:bg-purple-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-700/60 rounded-xl flex items-center justify-center mb-4">
                <FaChartLine className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1">UPTO</h3>
                <p className="text-white/80 text-xs">500x</p>
              </div>
            </div>

            {/* Indian & International Markets */}
            <div className="w-full  flex flex-col items-center bg-purple-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:bg-purple-800/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-700/60 rounded-xl flex items-center justify-center mb-4">
                <FaGlobe className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1">INDIAN &</h3>
                <p className="text-white/80 text-xs">INTERNATIONAL</p>
                <p className="text-white/80 text-xs">MARKETS</p>
              </div>
            </div>
          </div>
        </div>


        {/* Right side - Registration Form */}
        <div className=" w-[30%] mx-8" >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                REGISTER
              </span>
              <span className="text-pink-500 ml-2">HERE</span>
            </h1>
            <p className="text-white text-xl">Let's Get Started!</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              placeholder="User Name"
            />

            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              placeholder="Mobile Number"
            />

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

            <div className="relative">
              <select className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm appearance-none">
                <option value="" className="bg-gray-800">RM Support Language</option>
                <option value="english" className="bg-gray-800">English</option>
                <option value="hindi" className="bg-gray-800">Hindi</option>
                <option value="spanish" className="bg-gray-800">Spanish</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <input
              type="text"
              className="w-full px-6 py-4 bg-black/20 border-2 border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              placeholder="Referral Code (Optional)"
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
              Already have an account?{' '}
              <span className="text-cyan-400 font-medium cursor-pointer hover:text-cyan-300">
                Log in here.
              </span>
            </p>
          </div>

          {/* Log output */}
          {log && (
            <div className="mt-4 p-3 bg-black/30 rounded-lg text-white text-sm text-center backdrop-blur-sm">
              {log}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;