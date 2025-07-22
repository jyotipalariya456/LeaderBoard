import { useState } from 'react';

const UserManagement = ({ 
  users, 
  claimHistory, 
  isLoading, 
  addUser, 
  claimPoints 
}) => {
  const [newUserName, setNewUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [claimResult, setClaimResult] = useState(null);

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    try {
      await addUser(newUserName);
      setNewUserName('');
    } catch (e) {
      console.error('Error adding user:', e);
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUserId) return;
    setClaimResult(null);
    try {
      const data = await claimPoints(selectedUserId);
      setClaimResult(`${data.user.name} awarded ${data.pointsClaimed} points!`);
    } catch (e) {
      setClaimResult('Error claiming points');
    }
    setTimeout(() => setClaimResult(null), 2000);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-orange-200 to-yellow-300 h-[90vh] overflow-y-auto relative p-6">
      <h2 className="text-gray-900 text-2xl font-bold mb-4">Users Management</h2>
      
      {/* User Selection and Claim Points */}
      <div className="w-full max-w-md mb-6">
        <select
          className="w-full p-2 rounded border"
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button
          className="mt-2 w-full bg-yellow-400 text-white font-bold py-2 rounded disabled:opacity-50"
          disabled={isLoading || !selectedUserId}
          onClick={handleClaimPoints}
        >
          Claim Points
        </button>
        {claimResult && (
          <div className="mt-2 text-center text-green-700 font-bold">{claimResult}</div>
        )}
      </div>

      {/* Add New User */}
      <div className="w-full max-w-md mb-6">
        <input
          className="w-full p-2 rounded border mb-2"
          placeholder="Enter user name"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded disabled:opacity-50"
          disabled={isLoading || !newUserName.trim()}
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      {/* Users Leaderboard */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-3xl px-4 py-6 mb-6">
        <div className="flex justify-between px-2 mb-2 text-yellow-700 font-bold">
          <span>Rank</span>
          <span>Name</span>
          <span>Points</span>
        </div>
        {users
          .slice()
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .map((user, idx) => (
            <div key={user._id} className="flex items-center justify-between py-2 px-2 border-b border-white/10 last:border-b-0">
              <span className="w-8 text-center">{idx + 1}</span>
              <span className="flex-1 text-gray-900 font-medium truncate">{user.name}</span>
              <span className="w-16 text-right text-yellow-700 font-bold">{user.totalPoints}</span>
            </div>
          ))}
      </div>

      {/* Claim History */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-3xl px-4 py-6 mb-10">
        <div className="text-yellow-700 font-bold mb-2">Recent Claims</div>
        <div className="space-y-1 text-sm">
          {(!Array.isArray(claimHistory) || claimHistory.length === 0) && (
            <div className="text-gray-500">No claim history yet.</div>
          )}
          {Array.isArray(claimHistory) && claimHistory.slice(0, 10).map((entry, idx) => (
            <div key={entry._id || idx} className="flex items-center justify-between border-b border-white/10 py-1 last:border-b-0">
              <span className="flex-1 truncate">{entry.user?.name || entry.userName || 'Unknown'}</span>
              <span className="text-green-700 font-bold">+{entry.points || entry.pointsClaimed}</span>
              <span className="text-gray-500 text-xs">
                {new Date(entry.createdAt || entry.claimedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;