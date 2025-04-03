'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyDescription, setNewKeyDescription] = useState('');

  const handleCreateKey = async () => {
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      description: newKeyDescription,
      key: 'generated-key-' + Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyDescription('');
  };

  const handleDeleteKey = async (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f5f1e4]">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-[#e6e0d0] border-r border-[#d4cdb7] flex flex-col items-center py-4 gap-4">
        <div className="w-8 h-8 rounded-full bg-[#5c8d89] text-white flex items-center justify-center text-sm">👤</div>
        <div className="w-8 h-8 rounded-full bg-[#e6e0d0] border-2 border-[#5c8d89] flex items-center justify-center">✏️</div>
        <div className="w-8 h-8 rounded-full bg-[#e6e0d0] border-2 border-[#5c8d89] flex items-center justify-center">🔗</div>
        <div className="w-8 h-8 rounded-full bg-[#e6e0d0] border-2 border-[#5c8d89] flex items-center justify-center">📦</div>
      </div>

      {/* Main Content */}
      <div className="pl-24 pr-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <h1 className="text-4xl font-mono text-[#2d4544]">API Management</h1>
            <div className="px-4 py-2 bg-[#e6e0d0] rounded-full text-[#5c8d89] font-mono text-sm flex items-center gap-2 cursor-pointer hover:bg-[#d4cdb7] transition-colors">
              <span>📄</span> Docs
            </div>
          </div>

          {/* Create New Key Form */}
          <div className="bg-[#e6e0d0] rounded-xl p-6 mb-8 border border-[#d4cdb7]">
            <h2 className="text-xl font-mono text-[#2d4544] mb-6">Add new API key</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-[#5c8d89] mb-2">Key Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full p-3 bg-[#f5f1e4] border border-[#d4cdb7] rounded-lg font-mono text-[#2d4544]
                           focus:outline-none focus:ring-2 focus:ring-[#5c8d89] transition-all"
                  placeholder="Enter key name"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-[#5c8d89] mb-2">Description</label>
                <textarea
                  value={newKeyDescription}
                  onChange={(e) => setNewKeyDescription(e.target.value)}
                  className="w-full p-3 bg-[#f5f1e4] border border-[#d4cdb7] rounded-lg font-mono text-[#2d4544]
                           focus:outline-none focus:ring-2 focus:ring-[#5c8d89] transition-all min-h-[100px]"
                  placeholder="Enter key description"
                />
              </div>
              <button
                onClick={handleCreateKey}
                className="w-full bg-[#5c8d89] text-[#f5f1e4] px-6 py-3 rounded-lg font-mono
                         hover:bg-[#4a7571] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🔑</span> Generate New Key
              </button>
            </div>
          </div>

          {/* API Keys List */}
          <div className="bg-[#e6e0d0] rounded-xl p-6 border border-[#d4cdb7]">
            <h2 className="text-xl font-mono text-[#2d4544] mb-6">All work and no play</h2>
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="bg-[#f5f1e4] border border-[#d4cdb7] p-4 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-mono text-[#2d4544]">{key.name}</h3>
                      <p className="font-mono text-sm text-[#5c8d89]">{key.description}</p>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm bg-[#e6e0d0] px-3 py-1 rounded text-[#2d4544]">
                          {key.key}
                        </code>
                        <button
                          onClick={() => navigator.clipboard.writeText(key.key)}
                          className="text-[#5c8d89] hover:text-[#4a7571] transition-colors"
                        >
                          📋
                        </button>
                      </div>
                      <p className="text-xs font-mono text-[#5c8d89]">
                        Created: {new Date(key.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-[#c15b5b] hover:text-[#a44d4d] transition-colors p-2 hover:bg-[#e6e0d0] rounded"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              {apiKeys.length === 0 && (
                <div className="text-center py-8">
                  <p className="font-mono text-[#5c8d89]">No API keys yet!</p>
                  <p className="font-mono text-sm text-[#7ba7a3] mt-2">Create your first API key to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 