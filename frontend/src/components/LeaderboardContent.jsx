import { getBackgroundGradient } from '../utils/leaderboardUtils';
import TopThree from './TopThree';
import LeaderboardList from './LeaderboardList';
import EmptyState from './EmptyState';

const LeaderboardContent = ({ activeTab, activeSubTab, currentData }) => {
  return (
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
        <TopThree data={currentData} activeTab={activeTab} />
      </div>

      {/* Leaderboard List */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-3xl px-4 py-6 mb-10">
        <LeaderboardList data={currentData} activeTab={activeTab} />
      </div>

      {/* Empty State */}
      {currentData.length === 0 && <EmptyState activeTab={activeTab} />}
    </div>
  );
};

export default LeaderboardContent;