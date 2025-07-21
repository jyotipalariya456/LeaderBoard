import React, { useState } from 'react';

const AddUser = ({ onAddUser, isLoading }) => {
  const [userName, setUserName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsAdding(true);
      try {
        await onAddUser(userName.trim());
        setUserName('');
      } catch (error) {
        console.error('Error adding user:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return (
    <div className="add-user">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter user name"
          disabled={isLoading || isAdding}
          className="user-input"
        />
        <button
          type="submit"
          disabled={!userName.trim() || isLoading || isAdding}
          className="add-button"
        >
          {isAdding ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;