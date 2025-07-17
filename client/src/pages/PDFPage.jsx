import { useState, useRef } from 'react';
import axios from '../axiosInstance';
import { FaFileUpload } from 'react-icons/fa';

export default function PDFPage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const fileInputRef = useRef();

  const handleGenerate = async () => {
    if (!text.trim() && !file) {
      setError('Please enter some text or upload a .txt file.');
      setPdfUrl(null);
      return;
    }
    setError('');
    setLoading(true);
    setPdfUrl(null);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('txtFile', file);
      } else {
        formData.append('text', text);
      }

      const response = await axios.post(
        '/api/pdf/convert-pdf',  // exactly matches backend mounting in server.js
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      setPdfUrl(url);
    } catch {
      setError('Failed to generate PDF. Try again later.');
      setPdfUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'easykaaj.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== 'text/plain') {
      setError('Only .txt files are allowed.');
      setFile(null);
    } else {
      setFile(selected);
      setError('');
      setText('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/plain') {
      setFile(droppedFile);
      setText('');
      setError('');
    } else {
      setError('Only .txt files are allowed.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 ">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Text or File to PDF Converter
        </h1>

        <textarea
          rows="6"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (file) setFile(null);
          }}
          disabled={!!file}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-4"
        />

        {/* Modern drag-drop uploader */}
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-6 cursor-pointer hover:bg-indigo-50 transition-all"
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FaFileUpload size={36} className="text-indigo-500 mb-2" />
          <p className="text-sm text-indigo-700 font-medium">
            Drag & drop a .txt file here or click to browse
          </p>
          {file && (
            <p className="mt-2 text-green-600 font-semibold">✅ {file.name}</p>
          )}
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          {loading ? 'Generating PDF...' : 'Generate PDF'}
        </button>

        {error && <p className="mt-4 text-red-600 text-center font-medium">{error}</p>}

        {pdfUrl && (
          <div className="mt-6 text-center">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 underline mb-4 inline-block"
            >
              View Generated PDF
            </a>
            <br />
            <button
              onClick={handleDownload}
              className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
