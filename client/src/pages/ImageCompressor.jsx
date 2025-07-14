import { useState } from 'react';
import axios from 'axios';

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCompressedUrl(null);
    setError('');
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please upload an image.');
      return;
    }
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

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
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
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Image Compressor</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleCompress}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Compressing...' : 'Compress Image'}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {compressedUrl && (
        <div className="mt-4">
          <img src={compressedUrl} alt="Compressed" className="max-w-full rounded shadow" />
          <button
            onClick={handleDownload}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
}
