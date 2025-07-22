import { useState, useEffect } from 'react';

export const useLeaderboardData = () => {
  const [users, setUsers] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error('Failed to fetch users:', e);
      setUsers([]);
    }
    setIsLoading(false);
  };

  const fetchClaimHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims/history`);
      let data = await res.json();
      if (!Array.isArray(data)) data = [];
      setClaimHistory(data);
    } catch (e) {
      console.error('Failed to fetch claim history:', e);
      setClaimHistory([]);
    }
  };

  const addUser = async (name) => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      await fetchUsers();
    } catch (e) {
      console.error('Error adding user:', e);
      throw e;
    }
    setIsLoading(false);
  };

  const claimPoints = async (userId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/claims`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      await fetchUsers();
      await fetchClaimHistory();
      return data;
    } catch (e) {
      console.error('Error claiming points:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchClaimHistory();
  }, [fetchUsers, fetchClaimHistory]);

  return {
    users,
    claimHistory,
    isLoading,
    fetchUsers,
    fetchClaimHistory,
    addUser,
    claimPoints,
    API_BASE_URL
  };
};
