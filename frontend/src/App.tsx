import React from 'react';
import UrlShortener from './components/UrlShortener';
import UrlList from './components/UrlList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">URL Shortener</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <UrlShortener />
          <div className="mt-12">
            <UrlList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
