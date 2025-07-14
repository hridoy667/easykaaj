import { useState } from 'react';
import axios from 'axios';

export default function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    setError('');
    setCompressedPdfUrl(null);
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }
    setError('');
    setLoading(true);
    setCompressedPdfUrl(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/compress-pdf',
        formData,
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">PDF Compressor</h1>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          onClick={handleCompress}
          disabled={loading || !file}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-60 transition mb-4"
        >
          {loading ? 'Compressing...' : 'Compress PDF'}
        </button>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        {compressedPdfUrl && (
          <div className="text-center">
            <a
              href={compressedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 underline mb-2 block"
            >
              View Compressed PDF
            </a>
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download Compressed PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
