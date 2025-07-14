import { useState } from 'react';
import axios from 'axios';

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [mergedUrl, setMergedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.post('http://localhost:5000/api/merge-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob'
      });

      const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setMergedUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to merge PDFs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Merge PDF Files</h2>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="mb-4 w-full"
        />
        <button
          onClick={handleMerge}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Merging...' : 'Merge PDFs'}
        </button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {mergedUrl && (
          <div className="mt-6 text-center">
            <iframe src={mergedUrl} className="w-full h-[500px] border" title="Merged PDF Preview" />
            <a
              href={mergedUrl}
              download="merged.pdf"
              className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download Merged PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
