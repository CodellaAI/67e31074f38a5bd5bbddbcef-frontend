
import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Info } from 'lucide-react';

export default function DataDisplay({ data }) {
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-6 border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-primary-500" />
          Server Response
        </h2>
        
        <div className="space-y-4">
          <div className="flex">
            <span className="font-medium text-gray-700 dark:text-gray-300 w-24">Message:</span>
            <span className="text-gray-600 dark:text-gray-400">{data.message}</span>
          </div>
          
          {data.timestamp && (
            <div className="flex">
              <span className="font-medium text-gray-700 dark:text-gray-300 w-24">Timestamp:</span>
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(data.timestamp).toLocaleString()}
              </span>
            </div>
          )}
          
          {data.items && data.items.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Items:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {data.items.map((item, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
        This data was fetched from the backend API
      </div>
    </div>
  );
}
