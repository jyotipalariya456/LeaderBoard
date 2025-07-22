import { getTabIcon } from '../utils/leaderboardUtils';

const TabNavigation = ({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) => {
  const tabs = ['party', 'live', 'hourly', 'family', 'wealth', 'users'];
  const subTabs = ['weekly', 'daily', 'charm'];

  return (
    <>
      {/* Main Tabs */}
      <div className="flex bg-gray-800 px-4">
        {tabs.map((tab) => (
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
          {subTabs.map((subTab) => (
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
    </>
  );
};

export default TabNavigation;