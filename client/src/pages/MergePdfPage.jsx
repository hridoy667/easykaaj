import { useRef, useState } from 'react';
import axios from 'axios';
import { FaUpload, FaFilePdf, FaTrashAlt } from 'react-icons/fa';

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [mergedUrl, setMergedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFiles = (incomingFiles) => {
    const pdfFiles = Array.from(incomingFiles).filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfFiles]);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files.');
      return;
    }
  
    const formData = new FormData();
    files.forEach(file => formData.append('pdfs', file));
  
    setLoading(true);
    setError('');
    setMergedUrl(null);
  
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/pdf-merge/merge-pdf', // no trailing slash
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'blob',
        }
      );
  
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      setMergedUrl(url);
    } catch (err) {
      console.error('Merge PDF error:', err);
      setError('❌ Failed to merge PDFs.');
    } finally {
      setLoading(false);
    }
  };
  

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Merge PDF Files</h2>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed p-6 rounded-lg mb-6 flex flex-col items-center justify-center cursor-pointer transition ${
            dragActive ? 'border-indigo-700 bg-indigo-50' : 'border-indigo-400'
          }`}
        >
          <FaUpload size={40} className="text-indigo-400 mb-2" />
          <p className="text-indigo-700 font-medium">
            {dragActive ? 'Drop PDFs here...' : 'Click or drag & drop PDFs to upload'}
          </p>
          <p className="text-gray-500 text-sm mt-1">Only PDF files supported</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <ul className="mb-6 space-y-2">
            {files.map((file, idx) => (
              <li key={idx} className="flex justify-between items-center bg-indigo-50 px-4 py-2 rounded-lg">
                <span className="flex items-center gap-2 text-indigo-700">
                  <FaFilePdf /> {file.name}
                </span>
                <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleMerge}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? 'Merging...' : 'Merge PDFs'}
        </button>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {mergedUrl && (
          <div className="mt-6 text-center">
            <iframe src={mergedUrl} className="w-full h-[500px] border rounded-lg" title="Merged PDF Preview" />
            <a
              href={mergedUrl}
              download="merged.pdf"
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            >
              Download Merged PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
