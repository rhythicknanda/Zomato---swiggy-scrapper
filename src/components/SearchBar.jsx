import React from 'react';
import { Search, X, MapPin, Sparkles, RefreshCw } from 'lucide-react';
import { CATEGORIES, POPULAR_CITIES } from '../data/dishesData';

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  isScraping,
  handleSearchSubmit
}) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">
        Compare <span className="highlight">Swiggy & Zomato</span> Prices in <span style={{ color: '#fc8019', textDecoration: 'underline' }}>{selectedCity}</span>
      </h1>
      <p className="hero-subtitle">
        Type <strong>ANY</strong> dish or restaurant name below. Our scraper compares item prices, packaging fees, delivery charges, and active coupon codes in real-time.
      </p>

      <div className="search-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="search-input-wrapper">
          <Search className="search-icon" size={22} />
          <input
            type="text"
            className="search-input"
            placeholder={`Type any dish or restaurant in ${selectedCity} (e.g. Sushi, KFC, Biryani, Social, Tacos)...`}
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
              right: '8px',
              background: 'linear-gradient(135deg, #fc8019, #e23744)',
              border: 'none',
              color: '#fff',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(252, 128, 25, 0.4)'
            }}
          >
            {isScraping ? <RefreshCw className="spin" size={16} /> : <Sparkles size={16} />}
            <span>{isScraping ? 'Scraping...' : 'Compare'}</span>
          </button>
        </form>

        {/* City selector chips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>Popular Cities:</span>
          {POPULAR_CITIES.slice(0, 5).map((city) => (
            <button
              key={city.id}
              type="button"
              className={`chip-btn ${selectedCity === city.name ? 'active' : ''}`}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              onClick={() => setSelectedCity(city.name)}
            >
              📍 {city.name}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="categories-wrapper" style={{ marginTop: '1rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
