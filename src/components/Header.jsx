import React from 'react';
import { MapPin, Crown, ChevronDown } from 'lucide-react';

export const Header = ({ selectedLocality, onOpenLocalityModal, isGoldMember, setIsGoldMember }) => {
  return (
    <header className="site-header">
      <a href="#" className="brand-logo">
        <div className="logo-icon">🍔</div>
        <div>
          <div className="brand-name">BiteSaver</div>
          <div className="brand-tagline">Bengaluru Food Price Comparator</div>
        </div>
      </a>

      <div className="header-badges" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Bengaluru Locality Selector Trigger Button */}
        <button
          onClick={onOpenLocalityModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <MapPin size={15} color="#fc8019" />
          <span>{selectedLocality.name}, Bengaluru</span>
          <ChevronDown size={14} color="#64748b" />
        </button>

        {/* Swiggy One / Zomato Gold Toggle */}
        <button
          onClick={() => setIsGoldMember(!isGoldMember)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: isGoldMember ? '#fef3c7' : '#ffffff',
            color: isGoldMember ? '#92400e' : '#475569',
            border: isGoldMember ? '1px solid #f59e0b' : '1px solid #cbd5e1',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Crown size={15} color="#f59e0b" fill={isGoldMember ? '#f59e0b' : 'none'} />
          <span>{isGoldMember ? 'Gold/One Member Active' : 'Enable Gold/One Prices'}</span>
        </button>

        <div className="live-badge">
          <span className="pulse-dot"></span>
          <span>Bengaluru Live</span>
        </div>
      </div>
    </header>
  );
};
