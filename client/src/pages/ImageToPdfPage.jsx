import { useRef, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Make sure this is configured with baseURL from env

import { FaImage, FaTrashAlt, FaUpload } from 'react-icons/fa';

export default function ImageToPdfPage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (incoming) => {
    const valid = Array.from(incoming).filter(file => file.type.startsWith('image/'));
    if (valid.length === 0) {
      setError('Only image files are allowed.');
      return;
    }
    setImages(valid);
    setPdfBlobUrl(null);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      handleFiles(e.target.files);
    }
  };

  const handleConvert = async () => {
    setError('');
    setPdfBlobUrl(null);

    if (images.length === 0) {
      setError('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append('images', img));

    try {
      setLoading(true);
      // Using axiosInstance so baseURL is automatically prefixed
      const res = await axiosInstance.post('/api/image-to-pdf', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
    } catch (err) {
      console.error('PDF conversion error:', err);
      setError('❌ Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Image(s) to PDF</h1>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClickUpload}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center mb-6 cursor-pointer transition ${
            dragActive ? 'border-indigo-700 bg-indigo-50' : 'border-indigo-400'
          }`}
        >
          <FaUpload size={36} className="text-indigo-400 mb-2" />
          <p className="text-indigo-700 font-medium">
            {dragActive ? 'Drop images here...' : 'Click or drag & drop images'}
          </p>
          <p className="text-gray-500 text-sm mt-1">Accepted formats: JPG, PNG, WEBP...</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {/* Preview list */}
        {images.length > 0 && (
          <ul className="mb-6 space-y-2">
            {images.map((img, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-indigo-50 px-4 py-2 rounded-lg"
              >
                <span className="flex items-center gap-2 text-indigo-700">
                  <FaImage /> {img.name}
                </span>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleConvert}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Converting...' : 'Convert to PDF'}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {pdfBlobUrl && (
          <div className="mt-6 p-4 border rounded text-center bg-gray-50">
            <p className="text-lg font-semibold text-green-700 mb-2">📄 EasyKaaj_Converted.pdf</p>
            <a
              href={pdfBlobUrl}
              download="EasyKaaj_Converted.pdf"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
