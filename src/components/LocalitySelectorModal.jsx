import React, { useState } from 'react';
import { X, Search, MapPin, Check } from 'lucide-react';
import { BENGALURU_LOCALITIES } from '../data/dishesData';

export const LocalitySelectorModal = ({ selectedLocality, onSelectLocality, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocalities = BENGALURU_LOCALITIES.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    loc.zone.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <MapPin size={22} color="#fc8019" />
          <h2 className="modal-title" style={{ fontSize: '1.25rem' }}>Select Bengaluru Area</h2>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Search or choose your neighborhood in Bengaluru to calculate accurate delivery distances & branch addresses.
        </p>

        {/* Search Bar for Localities */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            className="search-input"
            style={{ paddingLeft: '2.5rem', paddingRight: '1rem', fontSize: '0.9rem', padding: '0.65rem 0.85rem 0.65rem 2.5rem' }}
            placeholder="Type your area (e.g. Koramangala, HSR, Indiranagar)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Localities List */}
        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {filteredLocalities.length > 0 ? (
            filteredLocalities.map((loc) => {
              const isSelected = selectedLocality.name === loc.name;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectLocality(loc);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #fc8019' : '1px solid #e2e8f0',
                    background: isSelected ? '#fff7ed' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? '#c2410c' : '#0f172a' }}>
                      📍 {loc.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {loc.zone}
                    </div>
                  </div>

                  {isSelected && <Check size={18} color="#fc8019" />}
                </button>
              );
            })
          ) : (
            <div style={{ textTransform: 'center', textAlign: 'center', padding: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
              No Bengaluru area matching "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
