import { useState } from 'react';
import axios from '../axiosInstance'; // use axios instance with baseURL

export default function UrlShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    setShortUrl('');
    if (!originalUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const res = await axios.post('/api/urlshortener/shorten', {
        originalUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error('Error shortening URL:', err);
      if (err.response) {
        setError(`Error: ${err.response.status} ${err.response.data.error || err.response.statusText}`);
      } else {
        setError('Network error or server is down.');
      }
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
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
