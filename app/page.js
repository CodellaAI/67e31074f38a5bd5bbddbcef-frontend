
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, RefreshCw } from 'lucide-react';
import DataDisplay from '@/components/DataDisplay';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/data`);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Simple Web Stack</h1>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-primary-500 animate-spin" />
              <span className="ml-3 text-gray-600 dark:text-gray-300">Loading data...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
              <p className="ml-3 text-red-700 dark:text-red-300">{error}</p>
            </div>
          ) : (
            <DataDisplay data={data} />
          )}
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={fetchData}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow transition-colors duration-200 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
