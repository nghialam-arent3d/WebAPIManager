'use client';

import { useState } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import Notification from '@/components/Notification';
import ConfirmDialog from '@/components/ConfirmDialog';
import Sidebar from '@/components/Sidebar';
import { CreateKeyModal } from '@/components/modals/CreateKeyModal';
import { EditKeyModal } from '@/components/modals/EditKeyModal';
import { ApiKeysTable } from '@/components/ApiKeysTable';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    keyId: null,
    keyName: ''
  });

  const {
    apiKeys,
    isLoading,
    createApiKey,
    updateApiKey,
    deleteApiKey
  } = useApiKeys();

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const handleCreateKey = async (keyData) => {
    try {
      await createApiKey(keyData);
      showNotification('API key created successfully');
    } catch (error) {
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleEditClick = (key) => {
    setEditingKey(key);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (id, updates) => {
    try {
      await updateApiKey(id, updates);
      showNotification('API key name updated successfully');
    } catch (error) {
      showNotification('Failed to update API key name', 'error');
    }
  };

  const handleDeleteClick = (key) => {
    setDeleteConfirm({
      isOpen: true,
      keyId: key.id,
      keyName: key.name
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteApiKey(deleteConfirm.keyId);
      showNotification('API key deleted successfully');
    } catch (error) {
      showNotification('Failed to delete API key', 'error');
    }
    setDeleteConfirm(prev => ({ ...prev, isOpen: false }));
  };

  const handleCopyKey = async (keyId, key) => {
    try {
      await navigator.clipboard.writeText(key);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      console.error('Failed to copy key:', err);
      showNotification('Failed to copy API key', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <nav className="border-b border-brand-border bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 hidden sm:inline">Pages</span>
                  <span className="text-gray-400 hidden sm:inline">/</span>
                  <span className="font-medium text-gray-900">Overview</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900">Overview</h1>
          </div>

          {/* Current Plan Card */}
          <div className="mb-8 rounded-xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    CURRENT PLAN
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-medium mb-4">Researcher</h2>
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
              <button className="w-full sm:w-auto px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium">
                Manage Plan
              </button>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-brand-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-mono text-brand-text">API Keys</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-hover transition-colors font-mono"
                >
                  + New Key
                </button>
              </div>
              <p className="mt-2 text-sm text-brand-primary">
                The key is used to authenticate your requests to the Research API. 
                To learn more, see the <span className="underline cursor-pointer">documentation</span> page.
              </p>
            </div>

            <ApiKeysTable
              apiKeys={apiKeys}
              isLoading={isLoading}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onCopyKey={handleCopyKey}
            />
          </div>

          {/* Contact Section */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-brand-primary text-sm">
              Have any questions, feedback or need support? We'd love to hear from you!
            </p>
            <button className="w-full sm:w-auto px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-hover transition-colors font-mono">
              Contact us
            </button>
          </div>
        </main>
      </div>

      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleDeleteConfirm}
        title="Delete API Key"
        message={`Are you sure you want to delete the API key "${deleteConfirm.keyName}"?`}
      />

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateKey}
      />

      <EditKeyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveEdit}
        apiKey={editingKey}
      />
    </div>
  );
} 