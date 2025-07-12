import { useState } from 'react';
import axios from 'axios';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAge(null);

    if (!dob) {
      setError('Please select a date of birth.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/age/calculate', {
        dob,
      });

      setAge(res.data.age);
    } catch (err) {
      setError('Failed to calculate age. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Age Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Calculate Age
        </button>
      </form>

      {age !== null && (
        <div className="mt-4 text-center text-green-700 font-semibold">
          Your age is: {age} years
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-600 font-medium">{error}</div>
      )}
    </div>
  );
}
