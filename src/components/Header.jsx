import React from 'react';
import { MapPin, Crown, Sparkles } from 'lucide-react';
import { POPULAR_CITIES } from '../data/dishesData';

export const Header = ({ selectedCity, setSelectedCity, isGoldMember, setIsGoldMember }) => {
  return (
    <header className="site-header">
      <a href="#" className="brand-logo">
        <div className="logo-icon">🍔</div>
        <div>
          <div className="brand-name">BiteSaver</div>
          <div className="brand-tagline">Swiggy vs Zomato vs Ownly Multi-Restaurant Scraper</div>
        </div>
      </a>

      <div className="header-badges" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Swiggy One / Zomato Gold Toggle */}
        <button
          onClick={() => setIsGoldMember(!isGoldMember)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: isGoldMember ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.06)',
            color: isGoldMember ? '#000000' : '#ffffff',
            border: isGoldMember ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.12)',
            padding: '0.4rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isGoldMember ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none'
          }}
        >
          <Crown size={15} fill={isGoldMember ? '#000' : 'none'} color={isGoldMember ? '#000' : '#f59e0b'} />
          <span>{isGoldMember ? 'Gold / One Membership Active' : 'Enable Gold/One Prices'}</span>
        </button>

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
          <span>Live Multi-Scraper</span>
        </div>
      </div>
    </header>
  );
};
