import React, { useState } from "react";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoWallet, IoWalletOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { useAuth } from "../AuthProvider"; // Adjust path

import axios from "axios";

const WithdrawalInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const { userData, token } = useAuth();
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState({
    mobile: "",
    password: "",
    comment:""
  });

  const quickAmounts = [500, 1000, 5000, 10000, 50000];

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getSelectedAmountValue = () => {
    return customAmount || selectedAmount || 0;
  };

  const handleContinue = () => {
    if (getSelectedAmountValue()) {
      setCurrentStep(2);
    }
  };

const handleVerify = () => {
    if (!userDetails.mobile || !userDetails.password) {
      alert("Please enter your mobile number and password.");
      return;
    }

    //  let data = JSON.stringify({
    //   amount: selectedAmount || customAmount,
    //   branchId: 3,
    //   comment: userDetails.comment ||"comment",
    //   userId: userData.userId,
    //   secondPassword: "1122"
    // }); 

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `/api/admin/public/api/v1/username/${userDetails.mobile}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
     
    };

    axios
      .request(config)
      .then((response) => {
        setUser(response.data);
// if(user.id === userData.userId && userDetails.password ===user.password){
 if(response){
          alert("Verification successful. Proceeding with withdrawal request.");
       } else {
         alert("Invalid mobile number or password.");
       }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const submitWithdrawalRequest = () => {
   

        let data = JSON.stringify({
      amount: selectedAmount || customAmount,
      branchId: 3,
      comment: userDetails.comment ||"comment",
      userId: user.id || userData.userId,
      secondPassword: "1122"
    }); 

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/trading/public/api/v1/cashRequest",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [generatedOTP, setGeneratedOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [statusMessage, setStatusMessage] = useState("");



  const generateRandomOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    return otp.toString();
  };

  const sendOTP = async () => {
    const otp = generateRandomOTP();
    setGeneratedOTP(otp);

    const mobile = userDetails.mobile;

    const message = `Dear Users,%0AYour user ID is active and use OTP ${otp}.%0AThank you for choosing us.%0AWe are happy to help you.%0AProfitVista`;

    const apiUrl = `https://pgapi.smartping.ai/fe/api/v1/send?username=otpsmsgame.trans&password=Qwerty@123&unicode=false&from=PROFN&to=${mobile}&dltPrincipalEntityId=1701172415051608213&dltContentId=1707172467291922195&text=${message}`;
    let response;


    try {
       response = await axios.get(apiUrl);
      console.log( response);
      if (response.status === 200) {
        
      } else {
        setStatusMessage("Failed to send OTP.");
      }
    } catch (error) {
      console.log( response);
      console.error("Error sending OTP:", error);
      // setStatusMessage("Error sending OTP.");
    }
    setStatusMessage("OTP sent successfully!");
  };

  const verifyOTP = () => {
    if (enteredOTP === generatedOTP) {
      setStatusMessage("OTP verified successfully!");
    } else {
      setStatusMessage("Invalid OTP. Please try again.");
    }
  };



  const renderAmountSelection = () => (
    <div className="min-h-screen bg-slate-950 s-slate-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className=" bg-violet-950 rounded-full p-3 flex items-center justify-center">
              <IoWalletOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                WITHDRAWAL
              </h1>
              <p className="text-slate-300 ">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col w-20 p-2 items-center">
            <img src="/logo.png" />
          </div>
        </div>
        {/* Select Amount Card */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
              <HiOutlineBanknotes className="text-xl" />
            </div>
            <h2 className="text-white text-base font-semibold">
              SELECT AMOUNT
            </h2>
          </div>

          <div className="mb-5">
            <p className="text-slate-300 text-sm mb-3">Quick Selection</p>
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelection(amount)}
                  className={`h-14 rounded-md text-xs md:text-base font-medium transition-all ${
                    selectedAmount === amount
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-800/80"
                  }`}
                >
                  ₹ {amount === 50000 ? "50000" : amount}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3">Custom Amount</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                ₹
              </span>
              <input
                type="text"
                placeholder="Enter Custom Amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50 appearance-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!getSelectedAmountValue()}
              className="px-10 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors "
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserVerification = () => (
    <div className="min-h-screen bg-slate-950 s-slate-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className=" bg-violet-950 rounded-full p-3 flex items-center justify-center">
              <MdVerifiedUser className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                USER VERIFICATION
              </h1>
              <p className="text-slate-300 ">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col w-20 p-2 items-center">
            <img src="/logo.png" />
          </div>
        </div>

        {/* User Details Card */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 sm:px-20 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
              <span className="text-slate-900 text-xs">👤</span>
            </div>
            <h2 className="text-white text-base font-semibold">USER DETAILS</h2>
          </div>

          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Please enter your TradeKing account details to continue with the
              transaction
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Mobile Number"
                value={userDetails.mobile}
                onChange={(e) =>
                  handleUserDetailsChange("mobile", e.target.value)
                }
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
              <input
                type="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={(e) =>
                  handleUserDetailsChange("password", e.target.value)
                }
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />

              <div className="flex justify-center">
            <button
              onClick={handleVerify}
              disabled={!userDetails.mobile || !userDetails.password}
              className="px-10 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors "
            >
              Verify
            </button>
          </div>
              <textarea
  placeholder="Comment (Optional)"
  value={userDetails.comment}
  onChange={(e) =>
    handleUserDetailsChange("comment", e.target.value)
  }
  rows={1}
  className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50 resize-none"
/>

<div className="flex justify-center">
            <button
              onClick={submitWithdrawalRequest}
              // disabled={!verified}
              className="px-10 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors "
            >
              Submit request
            </button>
          </div>
            </div>


            <div className="p-6 space-y-4 bg-gray-900 text-white max-w-md mx-auto rounded-lg shadow-md">
      <h2 className="text-xl font-bold">OTP Verification</h2>

      <input
        type="text"
        placeholder="Mobile Number"
        value={userDetails.mobile}
        onChange={(e) =>
          handleUserDetailsChange("mobile", e.target.value)
        }
        className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
      />
      

      <button
        onClick={sendOTP}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={enteredOTP}
        onChange={(e) => setEnteredOTP(e.target.value)}
        className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
      />

      <button
        onClick={verifyOTP}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Verify OTP
      </button>

      {statusMessage && (
        <div className="mt-4 text-center font-semibold">{statusMessage}</div>
      )}
    </div>
          </div>

          
        </div>
      </div>
    </div>
  );

  // Render based on current step
  if (currentStep === 1) {
    return renderAmountSelection();
  } else if (currentStep === 2) {
    return renderUserVerification();
  }

  return renderAmountSelection();
};

export default WithdrawalInterface;
