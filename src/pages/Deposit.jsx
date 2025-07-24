import React, { useState } from 'react';

const DepositInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [utrReference, setUtrReference] = useState('');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: ''
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

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleBankDetailsChange = (field, value) => {
    setBankDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSelectedAmountValue = () => {
    return customAmount || selectedAmount || 0;
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
              <h1 className="text-white text-xl font-bold tracking-wide">DEPOSIT</h1>
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
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
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
            onClick={() => setCurrentStep(2)}
            disabled={!getSelectedAmountValue()}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-sm"
          >
            Continue
          </button>
        </div>

        {/* Payment Method Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">₹</span>
            </div>
            <h2 className="text-white text-base font-semibold">PAYMENT METHOD</h2>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { id: 'cash', label: 'CASH', icon: '₹' },
              { id: 'crypto', label: 'CRYPTO', icon: '₿' },
              { id: 'bank', label: 'BANK', icon: '🏦' },
              { id: 'upi', label: 'UPI', icon: '📱' }
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`h-16 rounded-lg flex flex-col items-center justify-center space-y-1 transition-all text-xs ${
                  selectedPaymentMethod === method.id
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span className="text-base">{method.icon}</span>
                <span className="font-medium">{method.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentStep(3)}
            disabled={!selectedPaymentMethod}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-sm"
          >
            Proceed with Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderUPIPayment = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4">
      <div className="max-w-sm mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-wide">DEPOSIT</h1>
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

        {/* Back Button */}
        <button 
          onClick={() => setCurrentStep(1)}
          className="flex items-center text-slate-300 hover:text-white mb-6 transition-colors text-sm"
        >
          <span className="mr-2">←</span>
          Payment Details
        </button>

        {/* Payment Method Tabs */}
        <div className="flex space-x-1 mb-6">
          {['CASH', 'CRYPTO', 'BANK', 'UPI'].map((method) => (
            <button
              key={method}
              onClick={() => handlePaymentMethodSelect(method.toLowerCase())}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all text-xs ${
                selectedPaymentMethod === method.toLowerCase()
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Amount Display */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 mb-6 text-center border border-slate-700/50">
          <p className="text-slate-300 text-xs mb-2">AMOUNT</p>
          <p className="text-white text-xl font-bold">₹ {getSelectedAmountValue()}</p>
          <div className="w-16 h-16 bg-slate-900/80 rounded-lg mx-auto mt-4 flex items-center justify-center border border-slate-700/50">
            <span className="text-slate-400 text-xs">QR CODE</span>
          </div>
          <p className="text-slate-400 text-xs mt-2">UPI ID</p>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-xs">✓</span>
            </div>
            <h2 className="text-white text-base font-semibold">PAYMENT CONFIRMATION</h2>
          </div>

          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3">Enter your UTR Reference Number</p>
            <div className="flex">
              <input
                type="text"
                placeholder="# UTR Reference Number"
                value={utrReference}
                onChange={(e) => setUtrReference(e.target.value)}
                className="flex-1 bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-l-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg transition-colors">
                →
              </button>
            </div>
          </div>

          <div>
            <p className="text-slate-300 text-sm mb-3">Pay Using</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Gpay', color: 'bg-green-600' },
                { name: 'PhonePe', color: 'bg-purple-600' },
                { name: 'Paytm', color: 'bg-blue-600' }
              ].map((app) => (
                <button
                  key={app.name}
                  className={`${app.color} hover:opacity-80 text-white font-medium py-3 rounded-lg transition-opacity text-sm`}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankPayment = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-4">
      <div className="max-w-sm mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-wide">DEPOSIT</h1>
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

        {/* Back Button */}
        <button 
          onClick={() => setCurrentStep(1)}
          className="flex items-center text-slate-300 hover:text-white mb-6 transition-colors text-sm"
        >
          <span className="mr-2">←</span>
          Payment Details
        </button>

        {/* Payment Method Tabs */}
        <div className="flex space-x-1 mb-6">
          {['CASH', 'CRYPTO', 'BANK', 'UPI'].map((method) => (
            <button
              key={method}
              onClick={() => handlePaymentMethodSelect(method.toLowerCase())}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all text-xs ${
                selectedPaymentMethod === method.toLowerCase()
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Bank Details */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🏦</span>
            </div>
            <h2 className="text-white text-base font-semibold">BANK DETAILS</h2>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Bank Name"
              value={bankDetails.bankName}
              onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
              className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
            />
            <input
              type="text"
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
              className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
            />
            <input
              type="text"
              placeholder="IFSC Code"
              value={bankDetails.ifscCode}
              onChange={(e) => handleBankDetailsChange('ifscCode', e.target.value)}
              className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
            />
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-xs">✓</span>
            </div>
            <h2 className="text-white text-base font-semibold">PAYMENT CONFIRMATION</h2>
          </div>

          <div>
            <p className="text-slate-300 text-sm mb-3">Enter your UTR Reference Number</p>
            <div className="flex">
              <input
                type="text"
                placeholder="# UTR Reference Number"
                value={utrReference}
                onChange={(e) => setUtrReference(e.target.value)}
                className="flex-1 bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-l-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg transition-colors">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on current step and selected payment method
  if (currentStep === 1) {
    return renderAmountSelection();
  } else if (currentStep === 2) {
    return renderAmountSelection();
  } else if (currentStep === 3) {
    if (selectedPaymentMethod === 'upi') {
      return renderUPIPayment();
    } else if (selectedPaymentMethod === 'bank') {
      return renderBankPayment();
    } else {
      return renderUPIPayment(); // Default to UPI for other methods
    }
  }

  return renderAmountSelection();
};

export default DepositInterface;