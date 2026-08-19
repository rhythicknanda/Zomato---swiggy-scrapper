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
        {/* Bengaluru Locality Trigger */}
        <button
          onClick={onOpenLocalityModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <MapPin size={15} color="#ff8200" />
          <span>{selectedLocality.name}, Bengaluru</span>
          <ChevronDown size={14} color="#94a3b8" />
        </button>

        {/* Swiggy One / Zomato Gold Toggle */}
        <button
          onClick={() => setIsGoldMember(!isGoldMember)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: isGoldMember ? '#f59e0b' : '#1e293b',
            color: isGoldMember ? '#000000' : '#ffffff',
            border: isGoldMember ? '1px solid #f59e0b' : '1px solid #334155',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Crown size={15} color={isGoldMember ? '#000000' : '#f59e0b'} fill={isGoldMember ? '#000000' : 'none'} />
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
