import { useState } from 'react';
import axiosInstance from '../axiosInstance';

export default function AgeCalculatorPage() {
  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    if (!birthdate) {
      setError('Please select a birthdate');
      return;
    }

    try {
      const res = await axiosInstance.post('/api/age/calculate-age', { birthdate });
      setResult(res.data.age);
    } catch (err) {
      setError('Failed to calculate age. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Age Calculator</h1>

      <label className="block mb-2 font-semibold" htmlFor="birthdate">
        Select your birthdate:
      </label>
      <input
        type="date"
        id="birthdate"
        value={birthdate}
        onChange={e => setBirthdate(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        max={new Date().toISOString().split('T')[0]} // prevent future dates
      />

      <button
        onClick={handleCalculate}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Calculate Age
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <p className="mt-6 text-lg font-semibold">
          Your age is: {result}
        </p>
      )}
    </div>
  );
}
