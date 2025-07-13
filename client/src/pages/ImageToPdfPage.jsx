import { useState } from 'react';
import axios from 'axios';

export default function ImageToPdfPage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
    setPdfBlobUrl(null); // reset previous result
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
      const res = await axios.post('http://localhost:5000/api/image-to-pdf', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
    } catch (err) {
      console.error('PDF conversion error:', err);
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4 text-center text-indigo-700">🖼️ Image(s) to PDF</h1>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="w-full mb-4"
      />

      <button
        onClick={handleConvert}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Converting...' : 'Convert to PDF'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {pdfBlobUrl && (
        <div className="mt-6 p-4 border rounded text-center bg-gray-50">
          <p className="text-lg font-semibold text-green-700 mb-2">📄 ConvertedFile.pdf</p>
          <a
            href={pdfBlobUrl}
            download="EasyKaaj_Converted.pdf"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
