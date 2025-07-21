import React, { useState, useEffect } from 'react';

const LeaderboardApp = () => {
  const [activeTab, setActiveTab] = useState('party');
  const [activeSubTab, setActiveSubTab] = useState('weekly');
  const [users, setUsers] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [claimResult, setClaimResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setUsers([]);
    }
    setIsLoading(false);
  };

  const fetchClaimHistory = async () => {
    try {
      const res = await fetch('/api/claims/history');
      let data = await res.json();
      if (!Array.isArray(data)) data = [];
      setClaimHistory(data);
    } catch (e) {
      setClaimHistory([]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchClaimHistory();
  }, []);

  // Helper function to get time-based filtered data
  const getTimeFilteredData = (timeframe) => {
    const now = new Date();
    let cutoffTime;
    
    switch(timeframe) {
      case 'hourly':
        cutoffTime = new Date(now.getTime() - 60 * 60 * 1000); // Last hour
        break;
      case 'daily':
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours
        break;
      case 'weekly':
        cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last week
        break;
      default:
        return users;
    }

    // Filter claim history by timeframe
    const recentClaims = claimHistory.filter(claim => 
      new Date(claim.createdAt || claim.claimedAt) >= cutoffTime
    );

    // Calculate points for each user in the timeframe
    const userPointsMap = {};
    recentClaims.forEach(claim => {
      const userId = claim.userId || claim.user?._id;
      if (userId) {
        userPointsMap[userId] = (userPointsMap[userId] || 0) + (claim.points || claim.pointsClaimed);
      }
    });

    // Create leaderboard data
    return users.map(user => ({
      ...user,
      timeframePoints: userPointsMap[user._id] || 0,
      rank: 0 // Will be calculated after sorting
    }))
    .sort((a, b) => b.timeframePoints - a.timeframePoints)
    .map((user, idx) => ({ ...user, rank: idx + 1 }));
  };

  // Get live data (most recent activity)
  const getLiveData = () => {
    const recentClaims = claimHistory
      .sort((a, b) => new Date(b.createdAt || b.claimedAt) - new Date(a.createdAt || a.claimedAt))
      .slice(0, 10);

    const userActivity = {};
    recentClaims.forEach(claim => {
      const userId = claim.userId || claim.user?._id;
      const userName = claim.userName || claim.user?.name || 'Unknown';
      if (userId && !userActivity[userId]) {
        userActivity[userId] = {
          _id: userId,
          name: userName,
          lastActivity: new Date(claim.createdAt || claim.claimedAt),
          recentPoints: claim.points || claim.pointsClaimed || 0,
          totalPoints: users.find(u => u._id === userId)?.totalPoints || 0,
          rank: 0
        };
      }
    });

    return Object.values(userActivity)
      .sort((a, b) => b.lastActivity - a.lastActivity)
      .map((user, idx) => ({ ...user, rank: idx + 1 }));
  };

  // Get family data (simulate family grouping - in real app, users would have family IDs)
  const getFamilyData = () => {
    // For demo purposes, group users by first letter of name as "families"
    const families = {};
    
    users.forEach(user => {
      const familyKey = user.name.charAt(0).toUpperCase();
      if (!families[familyKey]) {
        families[familyKey] = {
          name: `Family ${familyKey}`,
          members: [],
          totalPoints: 0,
          rank: 0
        };
      }
      families[familyKey].members.push(user);
      families[familyKey].totalPoints += user.totalPoints;
    });

    return Object.values(families)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((family, idx) => ({ ...family, rank: idx + 1 }));
  };

  // Get wealth data (top performers by total points)
  const getWealthData = () => {
    return users
      .slice()
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((user, idx) => ({ ...user, rank: idx + 1 }));
  };

  const getTabIcon = (tab) => {
    const icons = {
      party: <span className="text-lg">🏆</span>,
      live: <span className="text-lg">📈</span>,
      hourly: <span className="text-lg">📅</span>,
      family: <span className="text-lg">👥</span>,
      wealth: <span className="text-lg">👑</span>,
      users: <span className="text-lg">👤</span>
    };
    return icons[tab] || <span className="text-lg">⭐</span>;
  };

  const getBackgroundGradient = (tab) => {
    const gradients = {
      party: 'from-orange-400 to-pink-500',
      live: 'from-green-400 to-blue-500',
      hourly: 'from-purple-400 to-pink-400',
      family: 'from-yellow-300 to-orange-400',
      wealth: 'from-yellow-200 to-yellow-400',
      users: 'from-orange-200 to-yellow-300'
    };
    return gradients[tab] || 'from-blue-400 to-purple-500';
  };

  const renderTopThree = (data) => {
    if (!data || data.length < 3) return null;
    
    return (
      <div className="flex justify-center items-end gap-4 mb-8 px-4">
        {/* Second Place */}
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-yellow-300 overflow-hidden mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-1 text-2xl">🥈</div>
          </div>
          <p className="text-white text-sm font-semibold truncate max-w-20">{data[1].name}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-yellow-300 text-lg">🎁</span>
            <span className="text-yellow-300 text-xs font-bold">{getScoreForDisplay(data[1])}</span>
          </div>
        </div>

        {/* First Place */}
        <div className="text-center -mt-6">
          <div className="relative mb-3">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-yellow-400 overflow-hidden mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
            </div>
            <div className="absolute -top-3 -right-1 text-3xl">👑</div>
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl">👑</span>
          </div>
          <p className="text-white text-sm font-semibold truncate max-w-24">{data[0].name}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-yellow-300 text-lg">🎁</span>
            <span className="text-yellow-300 text-xs font-bold">{getScoreForDisplay(data[0])}</span>
          </div>
        </div>

        {/* Third Place */}
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-orange-300 overflow-hidden mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-1 text-2xl">🥉</div>
          </div>
          <p className="text-white text-sm font-semibold truncate max-w-20">{data[2].name}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-yellow-300 text-lg">🎁</span>
            <span className="text-yellow-300 text-xs font-bold">{getScoreForDisplay(data[2])}</span>
          </div>
        </div>
      </div>
    );
  };

  const getScoreForDisplay = (item) => {
    switch(activeTab) {
      case 'party':
        return item.timeframePoints || 0;
      case 'live':
        return item.recentPoints || 0;
      case 'hourly':
        return item.timeframePoints || 0;
      case 'family':
        return item.totalPoints || 0;
      case 'wealth':
        return item.totalPoints || 0;
      default:
        return item.totalPoints || 0;
    }
  };

  const renderLeaderboardList = (data, startRank = 4) => {
    if (!data || data.length < startRank) return null;
    
    return (
      <div className="space-y-2">
        {data.slice(startRank - 1).map((item, index) => (
          <div key={item._id || index} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-white font-bold text-lg w-6">{item.rank}</span>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{item.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{item.name}</p>
                {activeTab === 'live' && item.lastActivity && (
                  <p className="text-white/70 text-xs">
                    {new Date(item.lastActivity).toLocaleTimeString()}
                  </p>
                )}
                {activeTab === 'family' && (
                  <p className="text-white/70 text-xs">
                    {item.members?.length} members
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-300 font-bold text-sm">{getScoreForDisplay(item)}</span>
              <span className="text-yellow-300 text-lg">🎁</span>
            </div>
          </div>
        ))}
        
        {/* Current user at bottom */}
        {activeTab !== 'family' && (
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-white/70 font-bold text-lg w-6">999</span>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">You</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 font-medium text-sm">You</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/70 font-bold text-sm">0</span>
              <span className="text-white/70 text-lg">🎁</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getCurrentData = () => {
    switch(activeTab) {
      case 'party':
        return getTimeFilteredData(activeSubTab === 'weekly' ? 'weekly' : 'daily');
      case 'live':
        return getLiveData();
      case 'hourly':
        return getTimeFilteredData('hourly');
      case 'family':
        return getFamilyData();
      case 'wealth':
        return getWealthData();
      default:
        return getWealthData();
    }
  };

  return (
    <div className="w-full min-w-md mx-auto bg-gray-900 h-screen">
      {/* Main Tabs */}
      <div className="flex bg-gray-800 px-4">
        {['party', 'live', 'hourly', 'family', 'wealth', 'users'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-2 text-sm font-medium capitalize ${
              activeTab === tab 
                ? 'text-yellow-400 border-b-2 border-yellow-400' 
                : 'text-white/70'
            }`}
          >
            <div className="flex flex-row justify-center items-center gap-1">
              {getTabIcon(tab)}
              <span>{tab}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Sub Tabs for Party */}
      {activeTab === 'party' && (
        <div className="flex bg-gray-700 px-4">
          {['weekly', 'daily', 'charm'].map((subTab) => (
            <button
              key={subTab}
              onClick={() => setActiveSubTab(subTab)}
              className={`flex-1 py-2 text-sm font-medium capitalize ${
                activeSubTab === subTab 
                  ? 'text-yellow-400 border-b-2 border-yellow-400' 
                  : 'text-white/70'
              }`}
            >
              {subTab}
            </button>
          ))}
        </div>
      )}

      {/* Users Management Tab */}
      {activeTab === 'users' ? (
        <div className={`flex flex-col items-center bg-gradient-to-b ${getBackgroundGradient(activeTab)} h-[90vh] overflow-y-auto relative p-6`}>
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
              onClick={async () => {
                if (!selectedUserId) return;
                setIsLoading(true);
                setClaimResult(null);
                try {
                  const res = await fetch('/api/claims', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: selectedUserId })
                  });
                  const data = await res.json();
                  setClaimResult(`${data.user.name} awarded ${data.pointsClaimed} points!`);
                  await fetchUsers();
                  await fetchClaimHistory();
                } catch (e) {
                  setClaimResult('Error claiming points');
                }
                setIsLoading(false);
                setTimeout(() => setClaimResult(null), 2000);
              }}
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
              onClick={async () => {
                if (!newUserName.trim()) return;
                setIsLoading(true);
                try {
                  await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newUserName })
                  });
                  setNewUserName('');
                  await fetchUsers();
                } catch (e) {}
                setIsLoading(false);
              }}
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
      ) : (
        /* Other Tabs Content */
        <div className={`flex flex-col items-center bg-gradient-to-b ${getBackgroundGradient(activeTab)} h-[90vh] overflow-y-auto relative`}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-4 w-8 h-8 bg-white/20 rounded-lg rotate-12"></div>
            <div className="absolute top-20 right-8 w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="absolute top-32 left-8 w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="absolute top-16 right-4 w-10 h-10 bg-white/10 rounded-lg rotate-45"></div>
          </div>

          {/* Gift Icon */}
          <div className="absolute top-4 right-4 z-10">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎁</span>
            </div>
          </div>

          {/* Tab Title */}
          <div className="pt-8 pb-4">
            <h2 className="text-white text-2xl font-bold capitalize text-center">
              {activeTab} Leaderboard
              {activeTab === 'party' && <span className="text-lg ml-2">({activeSubTab})</span>}
            </h2>
          </div>

          {/* Top Three */}
          <div className="px-4 mb-6">
            {renderTopThree(getCurrentData())}
          </div>

          {/* Leaderboard List */}
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-3xl px-4 py-6 mb-10">
            {renderLeaderboardList(getCurrentData())}
          </div>

          {/* Empty State */}
          {getCurrentData().length === 0 && (
            <div className="text-white/70 text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p>No data available for {activeTab} leaderboard</p>
              <p className="text-sm mt-2">Start claiming points to see rankings!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaderboardApp;