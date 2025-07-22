export const getTimeFilteredData = (users, claimHistory, timeframe) => {
  const now = new Date();
  let cutoffTime;
  
  switch(timeframe) {
    case 'hourly':
      cutoffTime = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case 'daily':
      cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case 'weekly':
      cutoffTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    default:
      return users;
  }

  const recentClaims = claimHistory.filter(claim => 
    new Date(claim.createdAt || claim.claimedAt) >= cutoffTime
  );

  const userPointsMap = {};
  recentClaims.forEach(claim => {
    const userId = claim.userId || claim.user?._id;
    if (userId) {
      userPointsMap[userId] = (userPointsMap[userId] || 0) + (claim.points || claim.pointsClaimed);
    }
  });

  return users.map(user => ({
    ...user,
    timeframePoints: userPointsMap[user._id] || 0,
    rank: 0
  }))
  .sort((a, b) => b.timeframePoints - a.timeframePoints)
  .map((user, idx) => ({ ...user, rank: idx + 1 }));
};

export const getLiveData = (users, claimHistory) => {
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

export const getFamilyData = (users) => {
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

export const getWealthData = (users) => {
  return users
    .slice()
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((user, idx) => ({ ...user, rank: idx + 1 }));
};

export const getTabIcon = (tab) => {
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

export const getBackgroundGradient = (tab) => {
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

export const getScoreForDisplay = (item, activeTab) => {
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
