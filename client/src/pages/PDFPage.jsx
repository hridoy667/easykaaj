import { useState } from 'react';
import axios from 'axios';

export default function PDFPage() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/convert-pdf',
        { text },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'easykaaj.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError('Failed to generate PDF. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Text to PDF Converter
        </h1>

        <textarea
          rows="8"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-6"
        />

        <button
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </button>

        {error && <p className="mt-4 text-red-600 text-center font-medium">{error}</p>}
      </div>
    </div>
  );
}
