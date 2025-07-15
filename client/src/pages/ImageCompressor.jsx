import { useRef, useState } from 'react';
import axios from 'axios';
import { FaUpload, FaImage, FaDownload } from 'react-icons/fa';

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      setFile(files[0]);
      setCompressedUrl(null);
      setError('');
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleCompress = async () => {
    if (!file) return setError('Please upload an image.');

    setLoading(true);
    setError('');
    setCompressedUrl(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/compress-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
      setCompressedUrl(url);
    } catch {
      setError('Compression failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = 'compressed.jpg';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Image Compressor</h2>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
          className={`cursor-pointer border-2 border-dashed p-8 rounded-lg flex flex-col items-center justify-center transition ${
            dragActive ? 'border-indigo-700 bg-indigo-50' : 'border-indigo-400'
          }`}
        >
          <FaUpload size={36} className="text-indigo-500 mb-3" />
          <p className="text-indigo-600 font-medium">
            {file ? 'Change Image' : 'Click or drag an image to upload'}
          </p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {file && (
          <div className="mt-4 bg-indigo-50 p-3 rounded flex items-center gap-2 text-indigo-700">
            <FaImage /> {file.name}
          </div>
        )}

        <button
          onClick={handleCompress}
          disabled={loading}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? 'Compressing...' : 'Compress Image'}
        </button>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {compressedUrl && (
          <div className="mt-6 text-center">
            <img src={compressedUrl} alt="Compressed" className="max-w-full rounded shadow" />
            <button
              onClick={handleDownload}
              className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
            >
              <FaDownload /> Download Compressed Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
