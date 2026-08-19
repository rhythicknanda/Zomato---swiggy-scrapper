import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SavingsSummary } from './components/SavingsSummary';
import { ComparisonCard } from './components/ComparisonCard';
import { DishDetailModal } from './components/DishDetailModal';
import { searchAndCompareDishes, calculateTotalStats } from './services/scraperService';
import { UtensilsCrossed, RefreshCw, Sparkles, Building2 } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('Butter Chicken');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [selectedDish, setSelectedDish] = useState(null);
  const [sortBy, setSortBy] = useState('cheapest');
  const [priceRange, setPriceRange] = useState('all');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isNonVegOnly, setIsNonVegOnly] = useState(false);
  const [isGoldMember, setIsGoldMember] = useState(true);

  const [isScraping, setIsScraping] = useState(false);
  const [scrapingStep, setScrapingStep] = useState('');

  const triggerScrapeEffect = () => {
    setIsScraping(true);
    setScrapingStep(`🔍 Scraping restaurants in ${selectedCity} serving "${searchQuery || 'Dishes'}"...`);

    setTimeout(() => {
      setScrapingStep(`🍊 Extracting Swiggy & Zomato checkout prices + Packaging & Delivery fees...`);
    }, 400);

    setTimeout(() => {
      setScrapingStep(`⚡ Applying active Gold/One coupons & calculating lowest price deals...`);
    }, 800);

    setTimeout(() => {
      setIsScraping(false);
      setScrapingStep('');
    }, 1100);
  };

  const handleSearchSubmit = () => {
    triggerScrapeEffect();
  };

  useEffect(() => {
    triggerScrapeEffect();
  }, [selectedCity, searchQuery, selectedCategory, sortBy, priceRange, isVegOnly, isNonVegOnly, isGoldMember]);

  const dishes = useMemo(() => {
    return searchAndCompareDishes({
      query: searchQuery,
      selectedCityName: selectedCity,
      category: selectedCategory,
      isVegOnly,
      isNonVegOnly,
      isGoldMember,
      sortBy,
      priceRange
    });
  }, [searchQuery, selectedCity, selectedCategory, isVegOnly, isNonVegOnly, isGoldMember, sortBy, priceRange]);

  const stats = useMemo(() => {
    return calculateTotalStats(dishes);
  }, [dishes]);

  return (
    <div className="app-container">
      <Header
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isGoldMember={isGoldMember}
        setIsGoldMember={setIsGoldMember}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isVegOnly={isVegOnly}
        setIsVegOnly={setIsVegOnly}
        isNonVegOnly={isNonVegOnly}
        setIsNonVegOnly={setIsNonVegOnly}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        isScraping={isScraping}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* Live Scraping Banner */}
      {isScraping && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(252, 128, 25, 0.15), rgba(226, 55, 68, 0.15))',
          border: '1px solid rgba(252, 128, 25, 0.4)',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          color: '#ffffff'
        }}>
          <RefreshCw className="spin" size={24} color="#fc8019" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Scraping Restaurant Listings for {selectedCity}...</div>
            <div style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{scrapingStep}</div>
          </div>
        </div>
      )}

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Building2 size={16} color="#fc8019" />
          <span>Showing <strong>{dishes.length}</strong> restaurants in <strong>{selectedCity}</strong> providing <strong>"{searchQuery || 'Dishes'}"</strong></span>
        </div>

        {isGoldMember && (
          <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.82rem' }}>
            👑 Gold/One Discounts Applied
          </span>
        )}
      </div>

      <SavingsSummary stats={stats} />

      {dishes.length > 0 ? (
        <div className="comparison-grid">
          {dishes.map((dish) => (
            <ComparisonCard key={dish.id} dish={dish} onSelectDish={setSelectedDish} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#9ca3af' }}>
          <UtensilsCrossed size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>No restaurants found matching your filters</h3>
          <p>Try clearing filters or search for another dish like "Butter Chicken", "Biryani", "Pizza", or "Burger".</p>
        </div>
      )}

      {selectedDish && (
        <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}

      <footer style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', paddingBottom: '2rem', marginTop: '4rem', color: '#6b7280', fontSize: '0.85rem' }}>
        <p>BiteSaver — Multi-Restaurant Food Price Scraper Engine (Swiggy vs Zomato vs Ownly)</p>
        <p style={{ marginTop: '0.5rem' }}>📍 Selected City: {selectedCity} • Ready for 1-Click Netlify Hosting</p>
      </footer>
    </div>
  );
}
