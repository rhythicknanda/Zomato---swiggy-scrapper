import React from 'react';
import { PiggyBank, Sparkles } from 'lucide-react';

export const SavingsSummary = ({ stats }) => {
  if (stats.totalPossibleSavings === 0) return null;

  return (
    <div className="savings-banner">
      <div className="savings-info">
        <div className="savings-icon-box">
          <PiggyBank size={26} />
        </div>
        <div>
          <div className="savings-title">Maximum Price Variance Detected!</div>
          <div className="savings-desc">
            Comparing {stats.totalItems} dishes across Swiggy, Zomato & Ownly. Save an average of ₹{stats.avgSavings} per order.
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Total Max Savings</div>
        <div className="savings-badge-amount">₹{stats.totalPossibleSavings}</div>
      </div>
    </div>
  );
};
