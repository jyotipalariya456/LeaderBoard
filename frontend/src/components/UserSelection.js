import React from 'react';

const UserSelection = ({ users, selectedUser, onUserSelect, onClaimPoints, isLoading }) => {
  return (
    <div className="user-selection">
      <h3>Select User</h3>
      <select
        value={selectedUser || ''}
        onChange={(e) => onUserSelect(e.target.value)}
        className="user-dropdown"
        disabled={isLoading}
      >
        <option value="">-- Select a user --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.totalPoints} points)
          </option>
        ))}
      </select>
      
      <button
        onClick={onClaimPoints}
        disabled={!selectedUser || isLoading}
        className="claim-button"
      >
        {isLoading ? 'Claiming...' : 'Claim Points'}
      </button>
    </div>
  );
};

export default UserSelection;