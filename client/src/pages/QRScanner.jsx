import { useState } from 'react';
import axios from 'axios';
import { QrReader } from '@blackbox-vision/react-qr-reader';

export default function QRScanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [cameraResult, setCameraResult] = useState('');
  const [cameraError, setCameraError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setScanResult('');
    setError('');
  };

  const handleScanImage = async () => {
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/scan-qr-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setScanResult(res.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to scan QR code');
      setScanResult('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">QR Code Scanner</h1>

      {/* Upload Image Scan */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Upload QR Code Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={handleScanImage}
          className="mt-2 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Scan from Image
        </button>
        {scanResult && (
          <p className="mt-4 text-green-700 font-semibold break-words">
            Result: {scanResult}
          </p>
        )}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </div>

      <hr />

      {/* Live Camera Scan */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Scan with Camera</h2>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
              setCameraResult(result?.text);
              setCameraError('');
            }
            if (!!error) {
              setCameraError(error.message);
            }
          }}
          videoContainerStyle={{ paddingTop: '56.25%' }}
          containerStyle={{ width: '100%' }}
        />
        {cameraResult && (
          <p className="mt-4 text-green-700 font-semibold break-words">
            Result: {cameraResult}
          </p>
        )}
        {cameraError && <p className="mt-4 text-red-600 font-semibold">{cameraError}</p>}
      </div>
    </div>
  );
}
