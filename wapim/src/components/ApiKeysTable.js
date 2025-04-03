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
    <div className="divide-y divide-brand-border">
      {/* Table Header - Hidden on mobile */}
      <div className="hidden md:grid px-6 py-4 bg-brand-border/10 grid-cols-12 gap-4 text-sm font-mono text-brand-primary">
        <div className="col-span-2">NAME</div>
        <div className="col-span-2">USAGE</div>
        <div className="col-span-6">KEY</div>
        <div className="col-span-2">OPTIONS</div>
      </div>

      {apiKeys.map((key) => (
        <div key={key.id} className="px-4 sm:px-6 py-4 hover:bg-brand-border/5">
          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            <div className="flex justify-between items-start">
              <div className="font-mono text-brand-text text-lg font-medium">{key.name}</div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="p-2.5 hover:bg-brand-border/20 rounded-lg transition-colors active:bg-brand-border/30"
                  title={visibleKeys.has(key.id) ? "Hide API key" : "Show API key"}
                >
                  {visibleKeys.has(key.id) ? '👁️' : '👁️‍🗨️'}
                </button>
                <button 
                  onClick={() => onEdit(key)}
                  className="p-2.5 hover:bg-brand-border/20 rounded-lg transition-colors active:bg-brand-border/30"
                  title="Edit key name"
                >
                  📝
                </button>
                <button
                  onClick={() => onDelete(key)}
                  className="p-2.5 hover:bg-brand-border/20 rounded-lg transition-colors active:bg-brand-border/30 text-red-500"
                  title="Delete key"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-20 bg-brand-border/50 rounded-full">
                  <div 
                    className="h-full bg-brand-primary rounded-full" 
                    style={{ width: `${(key.usage / key.limit) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-brand-primary font-medium">Usage: {key.usage}/{key.limit}</span>
              </div>
              
              <div className="font-mono flex items-center gap-2">
                <code className="bg-brand-border/20 px-3 py-2 rounded-lg text-brand-text flex-1 font-mono text-sm break-all">
                  {visibleKeys.has(key.id) ? key.key : maskApiKey(key.key)}
                </code>
                <button
                  onClick={() => onCopyKey(key.id, key.key)}
                  className="p-2.5 hover:bg-brand-border/20 rounded-lg transition-all hover:scale-110 active:scale-95 text-brand-primary"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 font-mono text-brand-text font-medium">{key.name}</div>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-brand-border/50 rounded-full">
                  <div 
                    className="h-full bg-brand-primary rounded-full" 
                    style={{ width: `${(key.usage / key.limit) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-brand-primary">{key.usage}</span>
              </div>
            </div>
            <div className="col-span-6 font-mono flex items-center gap-2">
              <code className="bg-brand-border/20 px-3 py-1 rounded text-brand-text flex-1 font-mono">
                {visibleKeys.has(key.id) ? key.key : maskApiKey(key.key)}
              </code>
              <button
                onClick={() => onCopyKey(key.id, key.key)}
                className="p-2 hover:bg-brand-border/20 rounded-lg transition-all hover:scale-110 active:scale-95 text-brand-primary"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <button 
                onClick={() => toggleKeyVisibility(key.id)}
                className="p-2 hover:bg-brand-border/20 rounded-lg transition-colors"
                title={visibleKeys.has(key.id) ? "Hide API key" : "Show API key"}
              >
                {visibleKeys.has(key.id) ? '👁️' : '👁️‍🗨️'}
              </button>
              <button 
                onClick={() => onEdit(key)}
                className="p-2 hover:bg-brand-border/20 rounded-lg transition-colors"
                title="Edit key name"
              >
                📝
              </button>
              <button
                onClick={() => onDelete(key)}
                className="p-2 hover:bg-brand-border/20 rounded-lg transition-colors text-red-500"
                title="Delete key"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}

      {apiKeys.length === 0 && (
        <div className="px-6 py-8 text-center">
          <p className="font-mono text-brand-primary">No API keys yet!</p>
          <p className="font-mono text-sm text-brand-primary/80 mt-2">Create your first API key to begin</p>
        </div>
      )}
    </div>
  );
}; 