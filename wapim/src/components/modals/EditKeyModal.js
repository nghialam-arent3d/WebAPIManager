import { useState, useEffect } from 'react';

export const EditKeyModal = ({ isOpen, onClose, onSave, apiKey }) => {
  const [editKeyName, setEditKeyName] = useState('');

  useEffect(() => {
    if (apiKey) {
      setEditKeyName(apiKey.name);
    }
  }, [apiKey]);

  if (!isOpen || !apiKey) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(apiKey.id, { name: editKeyName || 'default' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-2xl font-mono text-[#2d4544] mb-6">Edit API key</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#5c8d89] hover:bg-[#e6e0d0] rounded-lg transition-colors font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5c8d89] text-white rounded-lg hover:bg-[#4a7571] transition-colors font-mono"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 