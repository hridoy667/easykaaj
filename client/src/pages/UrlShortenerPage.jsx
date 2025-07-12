import { useState } from 'react';
import axios from 'axios';

export default function UrlShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    setShortUrl('');
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError('Failed to shorten the URL');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">URL Shortener</h1>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter long URL"
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleShorten}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Shorten
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {shortUrl && (
        <p className="mt-4 text-green-600 font-semibold">
          Short URL: <a href={shortUrl} target="_blank" className="underline">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
