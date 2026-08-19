import React from 'react';
import { Utensils, ShieldCheck, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="site-header">
      <a href="#" className="brand-logo">
        <div className="logo-icon">🍔</div>
        <div>
          <div className="brand-name">BiteSaver</div>
          <div className="brand-tagline">Swiggy vs Zomato vs Ownly Price Finder</div>
        </div>
      </a>

      <div className="header-badges">
        <div className="live-badge">
          <span className="pulse-dot"></span>
          <span>100% Free Live Scraper</span>
        </div>
      </div>
    </header>
  );
};
