import React from 'react';
import { Search, X, Sparkles, RefreshCw, ArrowUpDown, Filter } from 'lucide-react';
import { BENGALURU_LOCALITIES } from '../data/dishesData';

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocality,
  onOpenLocalityModal,
  sortBy,
  setSortBy,
  isVegOnly,
  setIsVegOnly,
  isNonVegOnly,
  setIsNonVegOnly,
  priceRange,
  setPriceRange,
  isScraping,
  handleSearchSubmit
}) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">
        Compare Food Prices in <span style={{ color: '#ff8200', textDecoration: 'underline' }}>{selectedLocality.name}, Bengaluru</span>
      </h1>
      <p className="hero-subtitle">
        Type any dish or restaurant below to compare exact checkout prices across <strong>Swiggy</strong>, <strong>Zomato</strong> & <strong>Ownly</strong>.
      </p>

      <div className="search-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder={`Search dish or restaurant in ${selectedLocality.name} (e.g. Biryani, Truffles, Meghana, Dosa)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            style={{
              position: 'absolute',
              right: '6px',
              background: 'linear-gradient(135deg, #ff8200, #ef4444)',
              border: 'none',
              color: '#ffffff',
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isScraping ? <RefreshCw className="spin" size={15} /> : <Sparkles size={15} />}
            <span>{isScraping ? 'Scraping...' : 'Compare'}</span>
          </button>
        </form>

        {/* Bengaluru Locality Chips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>Bengaluru Area:</span>
          {BENGALURU_LOCALITIES.slice(0, 5).map((loc) => (
            <button
              key={loc.id}
              type="button"
              className={`chip-btn ${selectedLocality.name === loc.name ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
              onClick={() => onOpenLocalityModal()}
            >
              📍 {loc.name}
            </button>
          ))}
          <button
            type="button"
            className="chip-btn"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', color: '#ff8200', borderStyle: 'dashed', borderColor: '#ff8200' }}
            onClick={onOpenLocalityModal}
          >
            🔍 More Areas...
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#151d2a', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
            <ArrowUpDown size={14} color="#94a3b8" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.82rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }}
            >
              <option value="cheapest" style={{ background: '#151d2a' }}>🏷️ Sort: Cheapest First</option>
              <option value="rating" style={{ background: '#151d2a' }}>⭐ Sort: Highest Rating</option>
              <option value="deliveryTime" style={{ background: '#151d2a' }}>⚡ Sort: Fastest Delivery</option>
              <option value="savings" style={{ background: '#151d2a' }}>💰 Sort: Max Savings</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#151d2a', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
            <Filter size={14} color="#94a3b8" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.82rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }}
            >
              <option value="all" style={{ background: '#151d2a' }}>💵 Price: All</option>
              <option value="under250" style={{ background: '#151d2a' }}>💵 Under ₹250</option>
              <option value="250to450" style={{ background: '#151d2a' }}>💵 ₹250 – ₹450</option>
              <option value="above450" style={{ background: '#151d2a' }}>💵 Above ₹450</option>
            </select>
          </div>

          {/* Veg / Non-Veg Buttons */}
          <button
            type="button"
            className={`chip-btn ${isVegOnly ? 'active' : ''}`}
            onClick={() => { setIsVegOnly(!isVegOnly); if (!isVegOnly) setIsNonVegOnly(false); }}
            style={isVegOnly ? { background: 'rgba(34,197,94,0.2)', border: '1px solid #22c55e', color: '#4ade80' } : {}}
          >
            🟢 Veg
          </button>

          <button
            type="button"
            className={`chip-btn ${isNonVegOnly ? 'active' : ''}`}
            onClick={() => { setIsNonVegOnly(!isNonVegOnly); if (!isNonVegOnly) setIsVegOnly(false); }}
            style={isNonVegOnly ? { background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: '#f87171' } : {}}
          >
            🔴 Non-Veg
          </button>
        </div>
      </div>
    </div>
  );
};
