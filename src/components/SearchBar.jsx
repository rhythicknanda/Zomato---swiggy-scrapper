import React from 'react';
import { Search, X, Sparkles, RefreshCw, ArrowUpDown, Filter, MapPin } from 'lucide-react';
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
        Compare Food Prices in <span style={{ color: '#fc8019', textDecoration: 'underline' }}>{selectedLocality.name}, Bengaluru</span>
      </h1>
      <p className="hero-subtitle">
        Type any dish or restaurant below to compare exact prices across <strong>Swiggy</strong>, <strong>Zomato</strong> & <strong>Ownly</strong>.
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
              background: 'linear-gradient(135deg, #fc8019, #e23744)',
              border: 'none',
              color: '#fff',
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              fontWeight: '700',
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
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Bengaluru Area:</span>
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
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', color: '#fc8019', borderStyle: 'dashed' }}
            onClick={onOpenLocalityModal}
          >
            🔍 More Areas...
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#ffffff', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <ArrowUpDown size={14} color="#64748b" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#0f172a', fontSize: '0.82rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
            >
              <option value="cheapest">🏷️ Sort: Cheapest First</option>
              <option value="rating">⭐ Sort: Highest Rating</option>
              <option value="deliveryTime">⚡ Sort: Fastest Delivery</option>
              <option value="savings">💰 Sort: Max Savings</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#ffffff', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <Filter size={14} color="#64748b" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#0f172a', fontSize: '0.82rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
            >
              <option value="all">💵 Price: All</option>
              <option value="under250">💵 Under ₹250</option>
              <option value="250to450">💵 ₹250 – ₹450</option>
              <option value="above450">💵 Above ₹450</option>
            </select>
          </div>

          {/* Veg / Non-Veg Buttons */}
          <button
            type="button"
            className={`chip-btn ${isVegOnly ? 'active' : ''}`}
            onClick={() => { setIsVegOnly(!isVegOnly); if (!isVegOnly) setIsNonVegOnly(false); }}
            style={isVegOnly ? { background: '#f0fdf4', border: '1px solid #16a34a', color: '#16a34a' } : {}}
          >
            🟢 Veg
          </button>

          <button
            type="button"
            className={`chip-btn ${isNonVegOnly ? 'active' : ''}`}
            onClick={() => { setIsNonVegOnly(!isNonVegOnly); if (!isNonVegOnly) setIsVegOnly(false); }}
            style={isNonVegOnly ? { background: '#fef2f2', border: '1px solid #dc2626', color: '#dc2626' } : {}}
          >
            🔴 Non-Veg
          </button>
        </div>
      </div>
    </div>
  );
};
