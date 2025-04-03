import { useState } from 'react';

export const ApiKeysTable = ({ 
  apiKeys, 
  onEdit, 
  onDelete, 
  onCopyKey,
  isLoading 
}) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[#5c8d89] font-mono">Loading API keys...</div>
      </div>
    );
  }

  return (
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
              onClick={() => onCopyKey(key.id, key.key)}
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
              onClick={() => onEdit(key)}
              className="p-2 hover:bg-[#e6e0d0] rounded-lg transition-colors"
              title="Edit key name"
            >
              📝
            </button>
            <button
              onClick={() => onDelete(key)}
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
  );
}; 