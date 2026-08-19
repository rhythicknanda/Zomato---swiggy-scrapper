import React from 'react';
import { Search, X, Sparkles, RefreshCw, ArrowUpDown, Filter } from 'lucide-react';
import { CATEGORIES, POPULAR_CITIES } from '../data/dishesData';

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
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
        Compare All Restaurants for <span className="highlight">{searchQuery ? `"${searchQuery}"` : 'Any Dish'}</span> in <span style={{ color: '#fc8019', textDecoration: 'underline' }}>{selectedCity}</span>
      </h1>
      <p className="hero-subtitle">
        Lists every top restaurant serving your dish across <strong>Swiggy</strong>, <strong>Zomato</strong> & <strong>Ownly</strong> with itemized checkout prices.
      </p>

      <div className="search-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="search-input-wrapper">
          <Search className="search-icon" size={22} />
          <input
            type="text"
            className="search-input"
            placeholder={`Type dish or restaurant (e.g. Butter Chicken, Biryani, Gulati, Domino's, Burger)...`}
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

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <ArrowUpDown size={14} color="#9ca3af" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
            >
              <option value="cheapest" style={{ background: '#111827' }}>🏷️ Sort by: Cheapest First</option>
              <option value="rating" style={{ background: '#111827' }}>⭐ Sort by: Highest Rating</option>
              <option value="deliveryTime" style={{ background: '#111827' }}>⚡ Sort by: Fastest Delivery</option>
              <option value="savings" style={{ background: '#111827' }}>💰 Sort by: Max Savings</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Filter size={14} color="#9ca3af" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
            >
              <option value="all" style={{ background: '#111827' }}>💵 Price: All Ranges</option>
              <option value="under250" style={{ background: '#111827' }}>💵 Under ₹250</option>
              <option value="250to450" style={{ background: '#111827' }}>💵 ₹250 – ₹450</option>
              <option value="above450" style={{ background: '#111827' }}>💵 Above ₹450</option>
            </select>
          </div>

          {/* Veg / Non-Veg Buttons */}
          <button
            type="button"
            className={`chip-btn ${isVegOnly ? 'active' : ''}`}
            onClick={() => { setIsVegOnly(!isVegOnly); if (!isVegOnly) setIsNonVegOnly(false); }}
            style={isVegOnly ? { background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399' } : {}}
          >
            🟢 Veg Only
          </button>

          <button
            type="button"
            className={`chip-btn ${isNonVegOnly ? 'active' : ''}`}
            onClick={() => { setIsNonVegOnly(!isNonVegOnly); if (!isNonVegOnly) setIsVegOnly(false); }}
            style={isNonVegOnly ? { background: 'rgba(226, 55, 68, 0.2)', border: '1px solid #e23744', color: '#f87171' } : {}}
          >
            🔴 Non-Veg Only
          </button>
        </div>

        {/* Quick Dish Chips */}
        <div className="categories-wrapper" style={{ marginTop: '1rem' }}>
          {['Butter Chicken', 'Hyderabadi Chicken Biryani', 'Paneer Pizza', 'Burger Combo', 'Paneer Butter Masala', 'Steamed Momos', 'Dal Makhani'].map((dish) => (
            <button
              key={dish}
              type="button"
              className={`chip-btn ${searchQuery === dish ? 'active' : ''}`}
              onClick={() => setSearchQuery(dish)}
            >
              🍽️ {dish}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
