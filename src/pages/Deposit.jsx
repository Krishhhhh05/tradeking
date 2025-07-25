import React, { useState, useEffect } from "react";
import { CgArrowRight } from "react-icons/cg";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import {
  MdArrowRight,
  MdCurrencyBitcoin,
  MdVerifiedUser,
} from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { useAuth } from "../AuthProvider"; // Adjust path
import axios from "axios";

const DepositInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [utrReference, setUtrReference] = useState("");
  const [availableBanks, setAvailableBanks] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState(0);
  const quickAmounts = [500, 1000, 5000, 10000, 50000];
  const { userData, token } = useAuth(); // Use the AuthProvider context
  console.log("User Data:", userData);
  console.log("Token:", token);
  const [clientId, setClientId] = useState(null);
  const [officeId, setOfficeId] = useState(null);
  const [status, setStatus] = useState("");

  // Update state when userData changes
  useEffect(() => {
    if (userData) {
      setClientId(userData.accountId);
      setOfficeId(userData.officeId);
      console.log("Client ID:", clientId);
      console.log("Office ID:", officeId);
    }
  }, [userData]);

  useEffect(() => {
    const fetchBankDetails = async () => {
      if (
        (selectedPaymentMethod === "bank" || selectedPaymentMethod === "upi") &&
        token
      ) {
        try {
          const response = await fetch(`/api/admin/public/api/v1/bank`, {
            // const response = await fetch(`${BASE_URL}admin/public/api/v1/bank`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Bank Details Fetched:", data.data);
          const enabledBanks = data.data.filter((bank) => bank.enable === true);
          const parentId = userData.parentId;
          const parentEnabledBanks = enabledBanks.filter(
            (bank) => bank.officeIds && bank.officeIds.includes(parentId)
          );
          setAvailableBanks(parentEnabledBanks);
          console.log("Enabled Banks:", enabledBanks);
          // You can store it in state here if needed
        } catch (error) {
          console.error("Error fetching bank details:", error);
        }
      }
    };

    fetchBankDetails();
  }, [selectedPaymentMethod, token]);

  const parseBankDetails = (details) => {
    const cleaned = details.replace(/\r/g, "").split("\n").filter(Boolean);
    const obj = {};
    cleaned.forEach((line) => {
      let key, value;

      // Special handling for IFSC which uses "-" as separator
      if (line.toLowerCase().includes("ifsc")) {
        [key, value] = line.split("-").map((s) => s.trim());
      } else {
        [key, value] = line.split(":").map((s) => s.trim());
      }

      if (key && value) {
        if (key.toLowerCase().includes("account name")) obj.accountName = value;
        else if (key.toLowerCase().includes("account number"))
          obj.accountNumber = value;
        else if (key.toLowerCase().includes("ifsc")) obj.ifsc = value;
        else if (key.toLowerCase().includes("branch")) obj.branch = value;
        else if (key.toLowerCase().includes("upi")) obj.upi = value;
      }
    });
    return obj;
  };

  const handleBankPaymentSubmit = () => {
    let data = JSON.stringify({
      amount: selectedAmount || customAmount,
      bankId: selectedBankId,
      comment: utrReference,
      userId: userData.userId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/admin/public/api/v1/depositRequest",
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
        setStatus(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setStatus(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  };

  const handleUpiPaymentSubmit = () => {
    let data = JSON.stringify({
      amount: selectedAmount || customAmount,
      bankId: selectedBankId,
      comment: utrReference,
      userId: userData.userId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/admin/public/api/v1/depositRequest",
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
        setStatus(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setStatus(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  };

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(null);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const getSelectedAmountValue = () => {
    return customAmount || selectedAmount || 0;
  };

  const renderAmountSelection = () => (
    <div className="min-h-screen bg-slate-950 p-4 pb-20">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="bg-violet-950 rounded-full p-3 flex items-center justify-center">
              <IoWalletOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                DEPOSIT
              </h1>
              <p className="text-slate-300">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col w-20 p-2 items-center">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>
        {/* Select Amount Card */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
              <HiOutlineBanknotes className="text-xl " />
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
                  className={`h-14 rounded-md font-medium text-xs md:text-base transition-all ${
                    selectedAmount === amount
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-800/80"
                  }`}
                >
                  ₹{amount}
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
          {/* <div className="flex justify-center">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!getSelectedAmountValue()}
              className="px-10 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div> */}
        </div>
        {/* Payment Method Card */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
              <RiBankFill className="text-xl " />
            </div>
            <h2 className="text-white text-base font-semibold">
              PAYMENT METHOD
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {
                id: "cash",
                label: "CASH",
                icon: <HiOutlineBanknotes className="text-2xl" />,
              },
              {
                id: "crypto",
                label: "CRYPTO",
                icon: <MdCurrencyBitcoin className="text-2xl" />,
              },
              {
                id: "bank",
                label: "BANK",
                icon: <RiBankFill className="text-2xl" />,
              },
              {
                id: "upi",
                label: "UPI",
                icon: <IoWalletOutline className="text-2xl" />,
              },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`p-2 rounded-md flex flex-col items-center justify-center space-y-1 transition-all ${
                  selectedPaymentMethod === method.id
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                <div className="rounded-full p-3 md:w-16 md:h-16 flex justify-center items-center bg-violet-950 ">
                  {method.icon}
                </div>
                <span className="font-medium">{method.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!selectedPaymentMethod}
              className="px-10 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Proceed with Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUPIPayment = () => (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-violet-950 rounded-full p-3 flex items-center justify-center">
              <IoWalletOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                DEPOSIT
              </h1>
              <p className="text-slate-300">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col w-20 p-2 items-center">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          Payment Details
        </button>

        {/* Payment Method Tabs */}
        <div className="flex space-x-1 mb-6">
          {["cash", "crypto", "bank", "upi"].map((method) => (
            <button
              key={method}
              onClick={() => handlePaymentMethodSelect(method)}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${
                selectedPaymentMethod === method
                  ? "bg-pink-500 text-white"
                  : "bg-slate-950 text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              {method.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Amount Display with Bank Details */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50">
          <div className="text-center mb-4">
            <p className="text-slate-300 text-sm mb-2">AMOUNT</p>
            <p className="text-white text-xl font-bold">
              ₹ {getSelectedAmountValue()}
            </p>
          </div>

          {/* Bank Selection */}
          <div className="mb-6"></div>
          <p className="text-slate-300 text-sm mb-3">Select Bank</p>
          <div className="grid md:grid-cols-2 gap-3">
            {availableBanks.map((bank) => (
              <div
                key={bank.id}
                onClick={() => setSelectedBankId(bank.id)}
                className={`relative bg-slate-900/80 rounded-lg border cursor-pointer transition-all overflow-hidden ${
                  selectedBankId === bank.id
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-slate-700/50 hover:border-slate-600"
                }`}
              >
                <div className="w-full h-64 flex items-center justify-center p-4">
                  <img
                    src={bank.bankImageUrl}
                    alt={bank.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-2 text-center">
                  <p className="text-white text-sm font-medium">{bank.name}</p>
                </div>
                {selectedBankId === bank.id && (
                  <div className="absolute top-2 right-2">
                    <MdVerifiedUser className="text-pink-500 text-xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
              <MdVerifiedUser className="text-xl " />
            </div>
            <h2 className="text-white text-base font-semibold">
              PAYMENT CONFIRMATION
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-slate-300 text-sm mb-3">
              Enter your UTR Reference Number
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="# UTR Reference Number"
                value={utrReference}
                onChange={(e) => setUtrReference(e.target.value)}
                className="flex-1 bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-l-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
              <button
                onClick={handleUpiPaymentSubmit}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg transition-colors"
              >
                <CgArrowRight className="text-xl" />
              </button>
            </div>
          </div>
          {status && (
            <div className="mt-4 text-center text-white font-semibold">
              {status}
            </div>
          )}

          <div>
            <p className="text-slate-300 text-sm mb-3">Pay Using</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Gpay", image: "/gpay.png" },
                { name: "PhonePe", image: "/phonepe.png" },
                { name: "Paytm", image: "/paytm.png" },
              ].map((app) => (
                <button
                  key={app.name}
                  className="bg-slate-950 hover:bg-slate-700/50 border border-slate-600/50 text-white font-medium py-4 rounded-lg transition-all text-sm flex flex-col items-center justify-between space-y-2"
                >
                  <div className="md:w-20 md:h-20 rounded-full overflow-hidden p-1">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankPayment = () => (
    <div className="min-h-screen bg-slate-950 p-4 pb-20">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-violet-950 rounded-full p-3 flex items-center justify-center">
              <IoWalletOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                DEPOSIT
              </h1>
              <p className="text-slate-300">Fast And Secure Transactions</p>
            </div>
          </div>
          <div className="flex flex-col w-20 p-2 items-center">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          Payment Details
        </button>

        {/* Payment Method Tabs */}
        <div className="flex space-x-1 mb-6">
          {["cash", "crypto", "bank", "upi"].map((method) => (
            <button
              key={method}
              onClick={() => handlePaymentMethodSelect(method)}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all ${
                selectedPaymentMethod === method
                  ? "bg-pink-500 text-white"
                  : "bg-slate-950 text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              {method.toUpperCase()}
            </button>
          ))}
        </div>

        {availableBanks.map((bank) => {
          const parsed = parseBankDetails(bank.details);

          return (
            <div
              key={bank.id}
              onClick={() => setSelectedBankId(bank.id)}
              className={`bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 mb-6 border cursor-pointer transition-all ${
                selectedBankId === bank.id
                  ? "border-pink-500 bg-pink-500/10"
                  : "border-slate-700/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
                  <RiBankFill className="text-xl " />
                </div>
                <h2 className="text-white text-base font-semibold">
                  BANK DETAILS
                </h2>
                {selectedBankId === bank.id && (
                  <div className="ml-auto">
                    <MdVerifiedUser className="text-pink-500 text-xl" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50">
                  {bank.name}
                </div>
                <div className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50">
                  {parsed.accountNumber}
                </div>
                <div className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50">
                  {parsed.ifsc}
                </div>
              </div>
            </div>
          );
        })}

        {/* Payment Confirmation */}
        <div className="bg-violet-950/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
              <MdVerifiedUser className="text-xl " />
            </div>
            <h2 className="text-white text-base font-semibold">
              PAYMENT CONFIRMATION
            </h2>
          </div>
          <div>
            <p className="text-slate-300 text-sm mb-3">
              Enter your UTR Reference Number
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="# UTR Reference Number"
                value={utrReference}
                onChange={(e) => setUtrReference(e.target.value)}
                className="flex-1 bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 rounded-l-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500/50"
              />
              <button
                onClick={handleBankPaymentSubmit}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg transition-colors"
              >
                <CgArrowRight className="text-xl" />
              </button>
            </div>
          </div>
          {status && (
            <div className="mt-4 text-center text-white font-semibold">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render based on current step and method
  if (currentStep === 1) {
    return renderAmountSelection();
  } else if (currentStep === 2) {
    return renderAmountSelection();
  } else if (currentStep === 3) {
    if (selectedPaymentMethod === "upi") {
      return renderUPIPayment();
    } else if (selectedPaymentMethod === "bank") {
      return renderBankPayment();
    } else {
      return renderUPIPayment();
    }
  }

  return renderAmountSelection();
};

export default DepositInterface;
