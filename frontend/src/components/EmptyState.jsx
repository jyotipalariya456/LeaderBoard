const EmptyState = ({ activeTab }) => (
  <div className="text-white/70 text-center py-8">
    <div className="text-4xl mb-4">📊</div>
    <p>No data available for {activeTab} leaderboard</p>
    <p className="text-sm mt-2">Start claiming points to see rankings!</p>
  </div>
);

export default EmptyState;