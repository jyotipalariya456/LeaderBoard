import React, { useState, useEffect } from 'react';
import { claimAPI } from '../services/api';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await claimAPI.getClaimHistory({ page, limit: 10 });
      setHistory(response.data.claimHistory);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching claim history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="claim-history">
      <h3>📈 Claim History</h3>
      {loading && <p>Loading...</p>}
      <div className="history-list">
        {history.map((claim) => (
          <div key={claim._id} className="history-item">
            <span className="user-name">{claim.userName}</span>
            <span className="points">+{claim.pointsClaimed}</span>
            <span className="time">
              {new Date(claim.claimedAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimHistory;