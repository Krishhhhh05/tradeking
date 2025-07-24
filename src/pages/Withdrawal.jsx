import React, { useState } from 'react';

const WithdrawalInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: ''
  });

  const quickAmounts = [500, 1000, 5000, 10000, 50000];

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: value
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
      console.log('Verifying user:', userDetails);
      alert('Verification successful!');
    }
  };

  const renderAmountSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4">
      <div className="max-w-sm mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-wide">
                <span className="text-cyan-300">WITH</span>
                <span className="text-pink-400">DRAWAL</span>
              </h1>
              <p className="text-slate-300 text-xs">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-pink-500 rounded flex items-center justify-center mb-1">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            <span className="text-cyan-300 text-xs font-semibold">TRADEBITS</span>
          </div>
        </div>

        {/* Select Amount Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-sm font-bold">₹</span>
            </div>
            <h2 className="text-white text-base font-semibold">SELECT AMOUNT</h2>
          </div>

          <div className="mb-5">
            <p className="text-slate-300 text-sm mb-3">Quick Selection</p>
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelection(amount)}
                  className={`h-14 rounded-md text-xs font-medium transition-all ${
                    selectedAmount === amount
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  ₹ {amount === 50000 ? '50000' : amount}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3">Custom Amount</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
              <input
                type="number"
                placeholder="Enter Custom Amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!getSelectedAmountValue()}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserVerification = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4">
      <div className="max-w-sm mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-xs">✓</span>
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-wide">
                <span className="text-cyan-300">USER VERIFI</span>
                <span className="text-pink-400">CATION</span>
              </h1>
              <p className="text-slate-300 text-xs">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-pink-500 rounded flex items-center justify-center mb-1">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            <span className="text-cyan-300 text-xs font-semibold">TRADEBITS</span>
          </div>
        </div>

        {/* User Details Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-xs">👤</span>
            </div>
            <h2 className="text-white text-base font-semibold">USER DETAILS</h2>
          </div>

          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Please enter your TradeKing account details to continue with the transaction
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={userDetails.username}
                onChange={(e) => handleUserDetailsChange('username', e.target.value)}
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
              <input
                type="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={(e) => handleUserDetailsChange('password', e.target.value)}
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={!userDetails.username || !userDetails.password}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-sm"
          >
            Verify
          </button>
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