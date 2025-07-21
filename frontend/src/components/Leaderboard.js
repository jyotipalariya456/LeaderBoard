import React, { useState } from 'react';

const LeaderboardApp = () => {
  const [activeTab, setActiveTab] = useState('party');
  const [activeSubTab, setActiveSubTab] = useState('weekly');

  // Sample data for different categories
  const leaderboardData = {
    party: {
      weekly: [
        { rank: 1, name: 'ℜ𝔦𝔡𝔬𝔶', avatar: '/api/placeholder/50/50', score: '1.13M 590', badge: '👑' },
        { rank: 2, name: '🌸RITESH🌸', avatar: '/api/placeholder/50/50', score: '1.01M 545', badge: '🥈' },
        { rank: 3, name: 'KRISHU RAJP', avatar: '/api/placeholder/50/50', score: '902,036', badge: '🥉' },
        { rank: 4, name: 'ℑ𝔪𝔞𝔞𝔫 𝔞𝔞𝔞 𝔨𝔞𝔞𝔞 𝔞𝔞𝔞', avatar: '/api/placeholder/50/50', score: '558,378' },
        { rank: 5, name: 'ℑ𝔞𝔞𝔞ℑ𝔞', avatar: '/api/placeholder/50/50', score: '503,062' },
        { rank: 6, name: '𝓸☯𝕧𝕚𝔻 🍃', avatar: '/api/placeholder/50/50', score: '352,250' },
        { rank: 7, name: '𝔇𝔞𝔪𝔦𝔫𝔦', avatar: '/api/placeholder/50/50', score: '346,392' },
        { rank: 8, name: '🅜🅤_🅘🅟🅔🅘....💙', avatar: '/api/placeholder/50/50', score: '343,862' },
        { rank: 9, name: '💎𝔽𝔦𝕣𝒶🖤😍', avatar: '/api/placeholder/50/50', score: '321,952' }
      ]
    },
    hourly: {
      hourlyLiveList: [
        { rank: 1, name: 'Rohini Dhani', avatar: '/api/placeholder/50/50', score: '632', badge: '🔥' },
        { rank: 2, name: '🅷🅱🅳💐SN🅰', avatar: '/api/placeholder/50/50', score: '1.81k', badge: '🔥' },
        { rank: 3, name: 'Heartbeat Miami', avatar: '/api/placeholder/50/50', score: '690', badge: '🔥' },
        { rank: 4, name: '🎀valentine❤️ pa...', avatar: '/api/placeholder/50/50', score: '695' },
        { rank: 5, name: '🎀🎯 IRL🎯🥰', avatar: '/api/placeholder/50/50', score: '462' },
        { rank: 6, name: '🎵Heatbeag Mugi..', avatar: '/api/placeholder/50/50', score: '354' },
        { rank: 7, name: 'اي 🅰اsda🌺', avatar: '/api/placeholder/50/50', score: '320' }
      ]
    },
    family: {
      contribution: [
        { rank: 1, name: 'Deva', avatar: '/api/placeholder/50/50', score: '10,005,725' },
        { rank: 2, name: 'Samarpan', avatar: '/api/placeholder/50/50', score: '10,229,695' },
        { rank: 3, name: 'SYAN ANG', avatar: '/api/placeholder/50/50', score: '9,444,665' },
        { rank: 4, name: 'Abhi', avatar: '/api/placeholder/50/50', score: '8,040,750' },
        { rank: 5, name: 'Abhishek', avatar: '/api/placeholder/50/50', score: '8,024,750' },
        { rank: 6, name: 'Jeet', avatar: '/api/placeholder/50/50', score: '8,006,380' },
        { rank: 7, name: 'Brani', avatar: '/api/placeholder/50/50', score: '8,005,100' },
        { rank: 8, name: 'Bren krishna', avatar: '/api/placeholder/50/50', score: '8,005,785' }
      ]
    },
    wealth: {
      daily: [
        { rank: 1, name: 'Robin', avatar: '/api/placeholder/50/50', score: '8****9', badge: '👑' },
        { rank: 2, name: 'Mystery billionaire', avatar: '/api/placeholder/50/50', score: '9****8', badge: '🏆' },
        { rank: 3, name: 'VIDYOU. IOIV**', avatar: '/api/placeholder/50/50', score: '9****5', badge: '💎' },
        { rank: 4, name: '🎵MRS.RAJPUT🎵', avatar: '/api/placeholder/50/50', score: '6****0' },
        { rank: 5, name: '🌸PRITESH🌸', avatar: '/api/placeholder/50/50', score: '4****5' },
        { rank: 6, name: 'Mystery billionaire', avatar: '/api/placeholder/50/50', score: '3****9' }
      ]
    }
  };

  const getTabIcon = (tab) => {
    const icons = {
      party: <span className="text-lg">🏆</span>,
      live: <span className="text-lg">📈</span>,
      hourly: <span className="text-lg">📅</span>,
      family: <span className="text-lg">👥</span>,
      wealth: <span className="text-lg">👑</span>
    };
    return icons[tab] || <span className="text-lg">⭐</span>;
  };

  const getBackgroundGradient = (tab) => {
    const gradients = {
      party: 'from-orange-400 to-pink-500',
      hourly: 'from-purple-400 to-pink-400',
      family: 'from-yellow-300 to-orange-400',
      wealth: 'from-yellow-200 to-yellow-400'
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
            <span className="text-yellow-300 text-xs font-bold">{data[1].score}</span>
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
            <span className="text-yellow-300 text-xs font-bold">{data[0].score}</span>
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
            <span className="text-yellow-300 text-xs font-bold">{data[2].score}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderLeaderboardList = (data, startRank = 4) => {
    if (!data) return null;
    
    return (
      <div className="space-y-2">
        {data.slice(startRank - 1).map((user, index) => (
          <div key={index} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-white font-bold text-lg w-6">{user.rank}</span>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-300 font-bold text-sm">{user.score}</span>
              <span className="text-yellow-300 text-lg">🎁</span>
            </div>
          </div>
        ))}
        
        {/* User at bottom with 0 score */}
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
      </div>
    );
  };

  const getCurrentData = () => {
    if (activeTab === 'party') return leaderboardData.party[activeSubTab];
    if (activeTab === 'hourly') return leaderboardData.hourly.hourlyLiveList;
    if (activeTab === 'family') return leaderboardData.family.contribution;
    if (activeTab === 'wealth') return leaderboardData.wealth.daily;
    return [];
  };

  return (
    <div className="w-full min-w-md mx-auto bg-gray-900 h-screen">
      {/* Header */}
      {/* <div className="flex items-center justify-between p-4 bg-gray-800">
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-white text-lg font-semibold">Ranking</div>
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div> */}

      {/* Main Tab Navigation */}
      <div className="flex bg-gray-800 px-4">
        {['party', 'live', 'hourly', 'family', 'wealth'].map((tab) => (
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

      {/* Sub Tab Navigation */}
      {activeTab === 'party' && (
        <div className="flex bg-gray-700 px-4">
          {['weekly', 'charm', 'family'].map((subTab) => (
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

      {/* Content Area */}
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

        {/* Settlement Time */}
        <div className="mb-6 text-center pt-8 pb-4">
          <p className="text-white/80 text-sm">Settlement time: 2 Day 06:46:47</p>
        </div>

        {/* Top Three */}
        <div className="px-4 mb-6">
          {renderTopThree(getCurrentData())}
        </div>

        {/* Leaderboard List */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-3xl px-4 py-6 mb-10">
          {renderLeaderboardList(getCurrentData())}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardApp;