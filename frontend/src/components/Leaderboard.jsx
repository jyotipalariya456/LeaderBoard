import  { useState } from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import { 
  getTimeFilteredData, 
  getLiveData, 
  getFamilyData, 
  getWealthData 
} from '../utils/leaderboardUtils';
import TabNavigation from './TabNavigation';
import UserManagement from './UserManagement';
import LeaderboardContent from './LeaderboardContent';

const LeaderboardApp = () => {
  const [activeTab, setActiveTab] = useState('party');
  const [activeSubTab, setActiveSubTab] = useState('weekly');
  
  const { 
    users, 
    claimHistory, 
    isLoading, 
    addUser, 
    claimPoints 
  } = useLeaderboardData();

  const getCurrentData = () => {
    switch(activeTab) {
      case 'party':
        return getTimeFilteredData(users, claimHistory, activeSubTab === 'weekly' ? 'weekly' : 'daily');
      case 'live':
        return getLiveData(users, claimHistory);
      case 'hourly':
        return getTimeFilteredData(users, claimHistory, 'hourly');
      case 'family':
        return getFamilyData(users);
      case 'wealth':
        return getWealthData(users);
      default:
        return getWealthData(users);
    }
  };

  return (
    <div className="w-full min-w-md mx-auto bg-gray-900 h-screen">
      <TabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      {activeTab === 'users' ? (
        <UserManagement 
          users={users}
          claimHistory={claimHistory}
          isLoading={isLoading}
          addUser={addUser}
          claimPoints={claimPoints}
        />
      ) : (
        <LeaderboardContent 
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          currentData={getCurrentData()}
        />
      )}
    </div>
  );
};

export default LeaderboardApp;