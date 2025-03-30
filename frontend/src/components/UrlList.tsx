import React, { useEffect, useState } from 'react';
import { getAllUrls } from '../services/api';
import { UrlData } from '../types';
import { QRCodeSVG } from 'qrcode.react';

const UrlList: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUrls();
  }, [page]);

  const fetchUrls = async () => {
    try {
      const response = await getAllUrls(page);
      setUrls(response.urls);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Failed to fetch URLs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Recent URLs</h2>
      
      <div className="space-x-4 space-y-4 flex flex-row flex-wrap justify-center">
        {urls.map((url) => (
          <div key={url.shortUrl} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Original URL:</p>
                <p className="text-sm truncate">{url.originalUrl.substr(0,Math.min(url.originalUrl.length,40))+'...'}</p>
              </div>
              <button
                onClick={() => copyToClipboard(url.shortUrl)}
                className="ml-4 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Copy
              </button>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-500">Shortened URL:</p>
              <p className="text-sm text-indigo-600">{url.shortUrl}</p>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>Clicks: {url.clicks}</span>
              <span>Created: {new Date(url.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="mt-4 flex justify-center">
              <QRCodeSVG value={url.shortUrl} size={64} />
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlList; 