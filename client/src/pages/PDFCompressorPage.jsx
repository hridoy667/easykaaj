import { useState, useRef } from 'react';
import axios from '../axiosInstance';
import { FaFilePdf, FaCloudUploadAlt } from 'react-icons/fa';


export default function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setError('');
    setCompressedPdfUrl(null);
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Only PDF files are allowed.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCompress = async () => {
    if (!file) return setError('Please select a PDF file.');
  
    setError('');
    setLoading(true);
    setCompressedPdfUrl(null);
  
    const formData = new FormData();
    formData.append('pdf', file);
  
    try {
      const response = await axios.post(
        '/api/pdf-compress/compress-pdf',
        formData,
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setCompressedPdfUrl(url);
    } catch {
      setError('Failed to compress PDF. Try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDownload = () => {
    if (!compressedPdfUrl) return;
    const link = document.createElement('a');
    link.href = compressedPdfUrl;
    link.setAttribute('download', 'compressed.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-600 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">PDF Compressor</h1>

        {/* Drag and Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-indigo-400 rounded-lg p-6 flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-indigo-50 transition"
          onClick={() => fileInputRef.current.click()}
        >
          <FaCloudUploadAlt className="text-indigo-400 text-4xl mb-2" />
          <p className="text-gray-700">Drag & drop a PDF or <span className="text-indigo-600 underline">browse</span></p>
          {file && (
            <p className="text-sm mt-2 text-green-700 font-semibold">
              Selected: {file.name}
            </p>
          )}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <button
          onClick={handleCompress}
          disabled={loading || !file}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-60 mb-4"
        >
          {loading ? 'Compressing...' : 'Compress PDF'}
        </button>

        {error && <p className="text-center text-red-600 mb-3">{error}</p>}

        {compressedPdfUrl && (
          <div className="text-center">
            <a
              href={compressedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 underline block mb-2"
            >
              View Compressed PDF
            </a>
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
