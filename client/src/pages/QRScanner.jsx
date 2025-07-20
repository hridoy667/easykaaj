import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { QrReader } from '@blackbox-vision/react-qr-reader';

export default function QRScanner() {
  const location = useLocation();
  const initialPath = location.pathname;

  const [selectedFile, setSelectedFile] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [cameraResult, setCameraResult] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const videoRef = useRef(null);     
  const streamRef = useRef(null);    
  const previewRef = useRef(null);   

  // Manually stop all camera streams
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (previewRef.current) {
      previewRef.current.srcObject = null;
    }
  }, []);

  // Start preview on camera open
  const startCameraPreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (previewRef.current) {
        previewRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera preview error:', err);
      setCameraError('Could not access camera preview.');
    }
  };

  // Watch for QRReader internal stream change
  const handleVideoRef = useCallback((ref) => {
    if (ref) {
      videoRef.current = ref.video;
      const observer = new MutationObserver(() => {
        if (ref.video.srcObject && ref.video.srcObject !== streamRef.current) {
          streamRef.current = ref.video.srcObject;
        }
      });
      observer.observe(ref.video, { attributes: true, attributeFilter: ['srcObject'] });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      if (window.location.pathname !== initialPath) {
        setTimeout(() => window.location.reload(), 100);
      }
    };
  }, [initialPath, stopCamera]);

  useEffect(() => {
    if (!showCamera) {
      stopCamera();
    } else {
      startCameraPreview();
    }
  }, [showCamera, stopCamera]);

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
      const res = await axiosInstance.post('/api/qrscan/scan-qr-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setScanResult(res.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to scan QR code');
      setScanResult('');
    }
  };

  const handleScanCamera = useCallback((result, err) => {
    if (result && !hasScanned) {
      setHasScanned(true);
      setCameraResult(result.text || '');
      setCameraError('');
      setTimeout(() => setShowCamera(false), 1500); // auto-close
    }

    if (err && !cameraError) {
      console.warn('Camera error:', err);
      setCameraError('Camera scanning error');
    }
  }, [hasScanned, cameraError]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-8">
      <h1 className="text-2xl font-bold text-center">QR Code Scanner</h1>

      {/* Image Upload Scanner */}
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
          <p className="mt-4 text-green-700 font-semibold break-words">Result: {scanResult}</p>
        )}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </div>

      <hr />

      {/* Camera Scanner */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Scan with Camera</h2>

        {!showCamera && (
          <button
            onClick={() => {
              setCameraError('');
              setCameraResult('');
              setHasScanned(false);
              setShowCamera(true);
            }}
            className="mb-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Open Camera
          </button>
        )}

        {showCamera && (
          <div className="w-full mb-4 space-y-4">
            {/* 🔍 Preview Video Feed */}
            <video
              ref={previewRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded border border-gray-400 shadow-md"
            />

            {/* Hidden QR Reader (processes only) */}
            {/* Hidden QR Reader (processes only) */}
            <QrReader
              constraints={{ facingMode: 'environment' }}
              onResult={handleScanCamera}
              containerStyle={{ width: '0px', height: '0px', overflow: 'hidden' }}
              videoStyle={{ display: 'none' }}
              videoRef={handleVideoRef}
            />


            <button
              onClick={() => setShowCamera(false)}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Close Camera
            </button>
          </div>
        )}

        {cameraResult && (
          <p className="mt-4 text-green-700 font-semibold break-words">Result: {cameraResult}</p>
        )}
        {cameraError && <p className="mt-4 text-red-600 font-semibold">{cameraError}</p>}
      </div>
    </div>
  );
}
