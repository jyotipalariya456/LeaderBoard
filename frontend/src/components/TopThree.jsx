import { getScoreForDisplay } from '../utils/leaderboardUtils';

const TopThree = ({ data, activeTab }) => {
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
          <span className="text-yellow-300 text-xs font-bold">{getScoreForDisplay(data[1], activeTab)}</span>
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
          <span className="text-yellow-300 text-xs font-bold">{getScoreForDisplay(data[0], activeTab)}</span>
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
          <span className="text-yellow-300 text-xs font-bold">{getScoreForDisplay(data[2], activeTab)}</span>
        </div>
      </div>
    </div>
  );
};

export default TopThree;