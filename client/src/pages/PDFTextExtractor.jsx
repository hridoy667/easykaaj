import { useState } from 'react';
import axios from 'axios';

export default function PDFTextExtractor() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtractedText('');
    setError('');
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setLoading(true);
    setError('');
    setExtractedText('');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/api/pdf-extract/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setExtractedText(response.data.text);
    } catch (err) {
      setError('Failed to extract text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">PDF Text Extractor</h1>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          onClick={handleExtract}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded w-full mb-4"
        >
          {loading ? 'Extracting...' : 'Extract Text'}
        </button>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {extractedText && (
          <>
            <textarea
              readOnly
              value={extractedText}
              rows={15}
              className="w-full p-4 rounded border border-gray-300 text-gray-700 mb-4 resize-none"
            />

            <button
              onClick={handleCopy}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Copy Text
            </button>
          </>
        )}
      </div>
    </div>
  );
}
