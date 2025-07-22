import { getScoreForDisplay } from '../utils/leaderboardUtils';

const LeaderboardList = ({ data, activeTab, startRank = 4 }) => {
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
            <span className="text-yellow-300 font-bold text-sm">{getScoreForDisplay(item, activeTab)}</span>
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

export default LeaderboardList;
