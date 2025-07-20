import { useState } from 'react';
import axios from '../axiosInstance'; // ✅ uses backend base URL

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return setStatus('Please enter feedback.');

    try {
      const res = await axios.post('/api/feedback', { feedback });
      if (res.status === 200) {
        setStatus('✅ Thanks for your feedback!');
        setFeedback('');
      } else {
        setStatus('❌ Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error. Try again later.');
    }
  };

  return (
    <div className="max-w-400 mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-black">
      {/* Left: Mock Feedback */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">What others are saying</h2>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-white shadow">
          <p className="italic">"Simple, fast, and so helpful. EasyKaaj is now part of my daily tools!"</p>
          <p className="text-right mt-2 font-semibold text-indigo-200">— Sarah T.</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-white shadow">
          <p className="italic">"The PDF tools saved me hours. Love the clean design."</p>
          <p className="text-right mt-2 font-semibold text-indigo-200">— Tanvir A.</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-white shadow">
          <p className="italic">"No ads, no signups — just smooth functionality. Highly recommended!"</p>
          <p className="text-right mt-2 font-semibold text-indigo-200">— Jason K.</p>
        </div>
      </div>

      {/* Right: Feedback Form */}
      <div className="backdrop-blur-md border border-white/20 rounded-xl shadow-md p-6 ">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Send us your Feedback</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            className="p-3 rounded-lg bg-indigo-300 text-black border border-white/30 focus:outline-none focus:ring focus:ring-indigo-400"
            placeholder="Let us know what you think about EasyKaaj..."
          />
          <button
            type="submit"
            className="bg-indigo-700 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
          >
            Submit Feedback
          </button>
          {status && <p className="text-sm text-center text-white mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
