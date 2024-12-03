import { useState } from 'react';
import axios from 'axios';

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/url/shorten', 
        { original_url: url },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter URL to shorten"
        required
      />
      <button
        type="submit"
        className="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Shorten URL
      </button>
      {shortUrl && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          Short URL: {window.location.origin}/{shortUrl}
        </div>
      )}
    </form>
  );
}
