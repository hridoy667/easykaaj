import { useState, useRef } from 'react';
import axios from 'axios';
import { FaUpload, FaFilePdf, FaCopy } from 'react-icons/fa';

export default function PDFTextExtractor() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are supported.');
        return;
      }
      setFile(selectedFile);
      setError('');
      setExtractedText('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
      setExtractedText('');
    } else {
      setError('Only PDF files are supported.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleExtract = async () => {
    if (!file) return setError('Please select a PDF file.');

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    setError('');
    setExtractedText('');

    try {
      const response = await axios.post('http://localhost:5000/api/pdf-extract/extract-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setExtractedText(response.data.text);
    } catch (err) {
      setError('❌ Failed to extract text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">PDF Text Extractor</h1>

        {/* Drag-and-Drop Box */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed transition-all duration-300 rounded-lg p-6 flex flex-col items-center justify-center mb-6 cursor-pointer ${
            dragActive ? 'border-indigo-700 bg-indigo-50' : 'border-indigo-400'
          }`}
        >
          <FaUpload size={40} className="text-indigo-500 mb-3" />
          <p className="text-indigo-700 font-semibold">
            {file ? file.name : 'Drag & drop a PDF or click to select'}
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {/* Extract Button */}
        <button
          onClick={handleExtract}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded mb-4 transition"
        >
          {loading ? 'Extracting...' : 'Extract Text'}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Result Section */}
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
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center gap-2"
            >
              <FaCopy /> Copy Text
            </button>
          </>
        )}
      </div>
    </div>
  );
}
