import React, { useState } from 'react';
import { X, Search, MapPin, Check, Filter } from 'lucide-react';
import { BENGALURU_LOCALITIES } from '../data/dishesData';

const BENGALURU_ZONES = [
  "All Zones",
  "Bengaluru North",
  "Bengaluru South",
  "Bengaluru East",
  "Anekal & Suburbs",
  "Central & West"
];

export const LocalitySelectorModal = ({ selectedLocality, onSelectLocality, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');

  const filteredLocalities = BENGALURU_LOCALITIES.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                          loc.zone.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesZone = selectedZone === 'All Zones' || loc.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
          <MapPin size={22} color="#ff8200" />
          <h2 className="modal-title" style={{ fontSize: '1.25rem' }}>Select Bengaluru Area</h2>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
          Covers <strong>Bengaluru North, South, East, Anekal Taluk & Central/West</strong>.
        </p>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            className="search-input"
            style={{ paddingLeft: '2.5rem', paddingRight: '1rem', fontSize: '0.9rem', padding: '0.65rem 0.85rem 0.65rem 2.5rem' }}
            placeholder="Type your area (e.g. Yelahanka, Anekal, Whitefield, JP Nagar)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Zone Filter Chips */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {BENGALURU_ZONES.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              style={{
                background: selectedZone === zone ? '#ff8200' : '#1e293b',
                color: selectedZone === zone ? '#ffffff' : '#cbd5e1',
                border: selectedZone === zone ? '1px solid #ff8200' : '1px solid #334155',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Localities List */}
        <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
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
                    border: isSelected ? '1px solid #ff8200' : '1px solid #334155',
                    background: isSelected ? 'rgba(255,130,0,0.15)' : '#1e293b',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#ff8200' : '#ffffff' }}>
                      📍 {loc.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                      {loc.zone}
                    </div>
                  </div>

                  {isSelected && <Check size={18} color="#ff8200" />}
                </button>
              );
            })
          ) : (
            <div style={{ textTransform: 'center', textAlign: 'center', padding: '1.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
              No area matching "{searchTerm}" in {selectedZone}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
