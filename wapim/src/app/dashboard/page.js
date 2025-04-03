'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyDescription, setNewKeyDescription] = useState('');

  const handleCreateKey = async () => {
    // TODO: Implement API call to create new key
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      description: newKeyDescription,
      key: 'generated-key-' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyDescription('');
  };

  const handleDeleteKey = async (id) => {
    // TODO: Implement API call to delete key
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">API Key Management</h1>
      
      {/* Create New Key Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Key Name</label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter key name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newKeyDescription}
              onChange={(e) => setNewKeyDescription(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter key description"
            />
          </div>
          <button
            onClick={handleCreateKey}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Generate API Key
          </button>
        </div>
      </div>

      {/* API Keys List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your API Keys</h2>
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="border dark:border-gray-700 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{key.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{key.description}</p>
                <p className="text-sm font-mono mt-1">{key.key}</p>
                <p className="text-xs text-gray-500 mt-1">Created: {new Date(key.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDeleteKey(key.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
          {apiKeys.length === 0 && (
            <p className="text-gray-500 text-center py-4">No API keys found. Create one to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
} 