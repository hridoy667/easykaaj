import { useState } from 'react';
import axios from 'axios';

export default function PDFTextExtractor() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please upload a PDF file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/pdf-extract/extract-text',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setText(response.data.text);
    } catch (err) {
      console.error('PDF extract error:', err);
      setError('Failed to extract text from PDF.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Extract Text from PDF</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed p-6 text-center mb-4 transition-all duration-300 ${
          dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <p className="mb-2">Drag & drop a PDF file here</p>
        <p className="text-sm text-gray-500">or</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button
        onClick={handleExtract}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Extract Text
      </button>

      {text && (
        <div className="mt-6 border rounded p-4 bg-gray-100">
          <h3 className="font-semibold mb-2">Extracted Text:</h3>
          <pre className="whitespace-pre-wrap">{text}</pre>
        </div>
      )}
    </div>
  );
}
