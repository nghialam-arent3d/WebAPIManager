import { useState } from 'react';

export const CreateKeyModal = ({ isOpen, onClose, onCreate }) => {
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(1000);
  const [limitEnabled, setLimitEnabled] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newKey = {
      name: newKeyName || 'default',
      key: 'wapim-' + Math.random().toString(36).substring(2, 11),
      usage: 0,
      limit: limitEnabled ? monthlyLimit : 1000,
      created_at: new Date().toISOString()
    };
    onCreate(newKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-2xl font-mono text-[#2d4544] mb-6">Create a new API key</h2>
        
        <p className="text-[#5c8d89] text-sm mb-6">
          Enter a name and limit for the new API key.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 