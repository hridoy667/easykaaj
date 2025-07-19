import { useState } from 'react';
import axiosInstance from '../axiosInstance';

const currencyOptions = [
  'BDT','USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 
  // add more currencies as you want
];

export default function CurrencyConverterPage() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    setError('');
    setConvertedAmount(null);
    setRate(null);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const res = await axiosInstance.post('/api/currency/convert-currency', {
        from: fromCurrency,
        to: toCurrency,
        amount: Number(amount),
      });

      setConvertedAmount(res.data.converted);
      setRate(res.data.rate);
    } catch (err) {
      setError('Conversion failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Currency Converter</h1>

      <div className="mb-4">
        <label htmlFor="fromCurrency" className="block mb-2 font-semibold text-gray-700">
          From
        </label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="toCurrency" className="block mb-2 font-semibold text-gray-700">
          To
        </label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2 font-semibold text-gray-700">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={handleConvert}
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
      >
        Convert
      </button>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {convertedAmount !== null && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-800">
            {amount} {fromCurrency} = <span className="text-indigo-700">{convertedAmount.toFixed(2)}</span> {toCurrency}
          </p>
          <p className="text-sm text-gray-500 mt-1">Conversion rate: 1 {fromCurrency} = {rate} {toCurrency}</p>
        </div>
      )}
    </div>
  );
}
