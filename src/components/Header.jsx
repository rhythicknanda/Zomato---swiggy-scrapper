import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { POPULAR_CITIES } from '../data/dishesData';

export const Header = ({ selectedCity, setSelectedCity }) => {
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
        {/* City Selector */}
        <div className="city-selector-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.85rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <MapPin size={16} color="#fc8019" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: '600',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {POPULAR_CITIES.map((city) => (
              <option key={city.id} value={city.name} style={{ background: '#111827', color: '#fff' }}>
                📍 {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="live-badge">
          <span className="pulse-dot"></span>
          <span>Live Scraper Active</span>
        </div>
      </div>
    </header>
  );
};
