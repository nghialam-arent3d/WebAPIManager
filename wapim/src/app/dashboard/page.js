'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editKeyName, setEditKeyName] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState(new Set());

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskApiKey = (key) => {
    return key.substring(0, 6) + '*'.repeat(30);
  };

  const handleEditClick = (key) => {
    setEditingKey(key);
    setEditKeyName(key.name);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingKey) return;
    
    setApiKeys(keys => keys.map(key => 
      key.id === editingKey.id 
        ? { ...key, name: editKeyName || 'default' }
        : key
    ));
    
    setIsEditModalOpen(false);
    setEditingKey(null);
    setEditKeyName('');
  };

  const handleCreateKey = async () => {
    const newKey = {
      id: Date.now(),
      name: newKeyName || 'default',
      key: 'wapim-' + Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      usage: 0,
      limit: limitEnabled ? monthlyLimit : 1000
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setMonthlyLimit(1000);
    setLimitEnabled(false);
    setIsModalOpen(false);
  };

  const handleDeleteKey = async (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // Modal component
  const CreateKeyModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
          <h2 className="text-2xl font-mono text-[#2d4544] mb-6">Create a new API key</h2>
          
          <p className="text-[#5c8d89] text-sm mb-6">
            Enter a name and limit for the new API key.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-[#5c8d89] mb-2">
                Key Name — A unique name to identify this key
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key Name"
                className="w-full p-3 border border-[#d4cdb7] rounded-lg font-mono text-[#2d4544]
                         focus:outline-none focus:ring-2 focus:ring-[#5c8d89] transition-all"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-mono text-[#5c8d89] mb-2">
                <input
                  type="checkbox"
                  checked={limitEnabled}
                  onChange={(e) => setLimitEnabled(e.target.checked)}
                  className="rounded border-[#d4cdb7]"
                />
                Limit monthly usage*
              </label>
              <input
                type="number"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(parseInt(e.target.value) || 0)}
                disabled={!limitEnabled}
                className="w-full p-3 border border-[#d4cdb7] rounded-lg font-mono text-[#2d4544]
                         focus:outline-none focus:ring-2 focus:ring-[#5c8d89] transition-all
                         disabled:bg-gray-100 disabled:text-gray-400"
              />
              <p className="text-xs text-[#5c8d89] mt-2">
                *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-[#5c8d89] hover:bg-[#e6e0d0] rounded-lg transition-colors font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                className="px-4 py-2 bg-[#5c8d89] text-white rounded-lg hover:bg-[#4a7571] transition-colors font-mono"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Key Modal component
  const EditKeyModal = () => {
    if (!isEditModalOpen || !editingKey) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
          <h2 className="text-2xl font-mono text-[#2d4544] mb-6">Edit API key</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-[#5c8d89] mb-2">
                Key Name — A unique name to identify this key
              </label>
              <input
                type="text"
                value={editKeyName}
                onChange={(e) => setEditKeyName(e.target.value)}
                placeholder="Key Name"
                className="w-full p-3 border border-[#d4cdb7] rounded-lg font-mono text-[#2d4544]
                         focus:outline-none focus:ring-2 focus:ring-[#5c8d89] transition-all"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingKey(null);
                  setEditKeyName('');
                }}
                className="px-4 py-2 text-[#5c8d89] hover:bg-[#e6e0d0] rounded-lg transition-colors font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#5c8d89] text-white rounded-lg hover:bg-[#4a7571] transition-colors font-mono"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f1e4]">
      {/* Navigation */}
      <nav className="border-b border-[#d4cdb7] bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center space-x-8">
                <span className="font-mono text-[#2d4544] text-lg">Pages</span>
                <span className="text-[#5c8d89]">/</span>
                <span className="font-mono text-[#2d4544]">Overview</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-[#e6e0d0] transition-colors">
                <span role="img" aria-label="github">🌐</span>
              </button>
              <button className="p-2 rounded-full hover:bg-[#e6e0d0] transition-colors">
                <span role="img" aria-label="twitter">🐦</span>
              </button>
              <button className="p-2 rounded-full hover:bg-[#e6e0d0] transition-colors">
                <span role="img" aria-label="email">✉️</span>
              </button>
              <button className="p-2 rounded-full hover:bg-[#e6e0d0] transition-colors">
                <span role="img" aria-label="theme">🌙</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-mono text-[#2d4544]">Overview</h1>
        </div>

        {/* Current Plan Card */}
        <div className="mb-8 rounded-xl bg-gradient-to-br from-[#5c8d89] via-[#7ba7a3] to-[#e6e0d0] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-mono">
                  CURRENT PLAN
                </span>
              </div>
              <h2 className="text-2xl font-mono mb-4">Researcher</h2>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>API Limit</span>
                    <span className="text-white/60">ⓘ</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full w-full">
                    <div className="h-full bg-white rounded-full" style={{ width: '3.5%' }}></div>
                  </div>
                  <div className="text-sm mt-1">35/1,000 Requests</div>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-mono">
              Manage Plan
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#d4cdb7] overflow-hidden">
          <div className="p-6 border-b border-[#d4cdb7]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-mono text-[#2d4544]">API Keys</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#5c8d89] text-white rounded-lg hover:bg-[#4a7571] transition-colors font-mono"
              >
                + New Key
              </button>
            </div>
            <p className="mt-2 text-sm text-[#5c8d89]">
              The key is used to authenticate your requests to the Research API. 
              To learn more, see the <span className="underline cursor-pointer">documentation</span> page.
            </p>
          </div>

          <div className="divide-y divide-[#d4cdb7]">
            <div className="px-6 py-4 bg-[#e6e0d0]/50 grid grid-cols-12 gap-4 text-sm font-mono text-[#5c8d89]">
              <div className="col-span-2">NAME</div>
              <div className="col-span-2">USAGE</div>
              <div className="col-span-6">KEY</div>
              <div className="col-span-2">OPTIONS</div>
            </div>

            {apiKeys.map((key) => (
              <div key={key.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-[#f5f1e4]/50">
                <div className="col-span-2 font-mono text-[#2d4544]">{key.name}</div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 bg-[#e6e0d0] rounded-full">
                      <div 
                        className="h-full bg-[#5c8d89] rounded-full" 
                        style={{ width: `${(key.usage / key.limit) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#5c8d89]">{key.usage}</span>
                  </div>
                </div>
                <div className="col-span-6 font-mono flex items-center gap-2">
                  <code className="bg-[#e6e0d0] px-3 py-1 rounded text-[#2d4544] flex-1 font-mono">
                    {visibleKeys.has(key.id) ? key.key : maskApiKey(key.key)}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(key.key)}
                    className="text-[#5c8d89] hover:text-[#4a7571] transition-colors"
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <button 
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="p-2 hover:bg-[#e6e0d0] rounded-lg transition-colors"
                    title={visibleKeys.has(key.id) ? "Hide API key" : "Show API key"}
                  >
                    {visibleKeys.has(key.id) ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <button 
                    onClick={() => handleEditClick(key)}
                    className="p-2 hover:bg-[#e6e0d0] rounded-lg transition-colors"
                    title="Edit key name"
                  >
                    📝
                  </button>
                  <button
                    onClick={() => handleDeleteKey(key.id)}
                    className="p-2 hover:bg-[#e6e0d0] rounded-lg transition-colors text-[#c15b5b]"
                    title="Delete key"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {apiKeys.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="font-mono text-[#5c8d89]">No API keys yet!</p>
                <p className="font-mono text-sm text-[#7ba7a3] mt-2">Create your first API key to begin</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 flex justify-between items-center">
          <p className="text-[#5c8d89] text-sm">
            Have any questions, feedback or need support? We'd love to hear from you!
          </p>
          <button className="px-4 py-2 bg-[#5c8d89] text-white rounded-lg hover:bg-[#4a7571] transition-colors font-mono">
            Contact us
          </button>
        </div>
      </main>

      {/* Render the modals */}
      <CreateKeyModal />
      <EditKeyModal />
    </div>
  );
} 