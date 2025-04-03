import { useState, useEffect } from 'react';
import { apiKeysService } from '@/services/apiKeysService';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const data = await apiKeysService.fetchApiKeys();
      setApiKeys(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching API keys:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createApiKey = async (keyData) => {
    try {
      const newKey = await apiKeysService.createApiKey(keyData);
      setApiKeys(prev => [newKey, ...prev]);
      return newKey;
    } catch (err) {
      setError(err.message);
      console.error('Error creating API key:', err.message);
      throw err;
    }
  };

  const updateApiKey = async (id, updates) => {
    try {
      const updatedKey = await apiKeysService.updateApiKey(id, updates);
      setApiKeys(prev => prev.map(key => key.id === id ? updatedKey : key));
      return updatedKey;
    } catch (err) {
      setError(err.message);
      console.error('Error updating API key:', err.message);
      throw err;
    }
  };

  const deleteApiKey = async (id) => {
    try {
      await apiKeysService.deleteApiKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting API key:', err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    apiKeys,
    isLoading,
    error,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    refreshApiKeys: fetchApiKeys
  };
}; 