import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/dishesData';

export const SearchBar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">
        Never Overpay for Food. <br />
        Compare <span className="highlight">Swiggy & Zomato</span> Prices Instantly.
      </h1>
      <p className="hero-subtitle">
        Find hidden discounts, delivery fee differences, and cheapest platform options for your favorite dishes.
      </p>

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={22} />
          <input
            type="text"
            className="search-input"
            placeholder="Search dish (e.g. Biryani, Paneer Butter Masala, Pizza)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
        </div>

        <div className="categories-wrapper">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
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
