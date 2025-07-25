import React, { useState } from "react";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoWallet, IoWalletOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";

const WithdrawalInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
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
    if (userDetails.username && userDetails.password) {
      console.log("Verifying user:", userDetails);
      alert("Verification successful!");
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
                  className={`h-14 rounded-md font-medium transition-all ${
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
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 px-20 border border-slate-700/50">
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
                placeholder="Username"
                value={userDetails.username}
                onChange={(e) =>
                  handleUserDetailsChange("username", e.target.value)
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
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleVerify}
              disabled={!userDetails.username || !userDetails.password}
              className="px-10 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors "
            >
              Verify
            </button>
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
