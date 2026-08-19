import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SavingsSummary } from './components/SavingsSummary';
import { ComparisonCard } from './components/ComparisonCard';
import { DishDetailModal } from './components/DishDetailModal';
import { LocalitySelectorModal } from './components/LocalitySelectorModal';
import { searchAndCompareDishesSplit, calculateTotalStats } from './services/scraperService';
import { BENGALURU_LOCALITIES } from './data/dishesData';
import { UtensilsCrossed, RefreshCw, MapPin, Store, Utensils, ChevronDown } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('Pizza');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocality, setSelectedLocality] = useState(BENGALURU_LOCALITIES[1]); // Default Koramangala
  const [isLocalityModalOpen, setIsLocalityModalOpen] = useState(false);
  
  const [selectedDish, setSelectedDish] = useState(null);
  const [sortBy, setSortBy] = useState('cheapest');
  const [priceRange, setPriceRange] = useState('all');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isNonVegOnly, setIsNonVegOnly] = useState(false);
  const [isGoldMember, setIsGoldMember] = useState(true);

  // Pagination for closest restaurants (10 initial, +10 on Show More)
  const [visibleCount, setVisibleCount] = useState(10);

  const [isScraping, setIsScraping] = useState(false);
  const [scrapingStep, setScrapingStep] = useState('');

  const triggerScrapeEffect = () => {
    setIsScraping(true);
    setScrapingStep(`🔍 Finding closest restaurants near ${selectedLocality.name}, Bengaluru...`);

    setTimeout(() => {
      setScrapingStep(`📍 Sorting by exact distance from ${selectedLocality.name}...`);
    }, 400);

    setTimeout(() => {
      setScrapingStep(`⚡ Calculating Swiggy & Zomato checkout totals + Gold/One discounts...`);
    }, 800);

    setTimeout(() => {
      setIsScraping(false);
      setScrapingStep('');
    }, 1100);
  };

  const handleSearchSubmit = () => {
    setVisibleCount(10);
    triggerScrapeEffect();
  };

  // Reset pagination to top 10 closest when location or search changes
  useEffect(() => {
    setVisibleCount(10);
    triggerScrapeEffect();
  }, [selectedLocality, searchQuery, selectedCategory, isVegOnly, isNonVegOnly, isGoldMember]);

  const { nameMatched, menuMatched } = useMemo(() => {
    return searchAndCompareDishesSplit({
      query: searchQuery,
      selectedLocality,
      category: selectedCategory,
      isVegOnly,
      isNonVegOnly,
      isGoldMember,
      priceRange
    });
  }, [searchQuery, selectedLocality, selectedCategory, isVegOnly, isNonVegOnly, isGoldMember, priceRange]);

  const stats = useMemo(() => {
    return calculateTotalStats(nameMatched, menuMatched);
  }, [nameMatched, menuMatched]);

  const totalResults = nameMatched.length + menuMatched.length;

  // Apply distance pagination (visibleCount limits total items across sections)
  const visibleNameMatched = nameMatched.slice(0, visibleCount);
  const remainingSlotsForMenu = Math.max(0, visibleCount - visibleNameMatched.length);
  const visibleMenuMatched = menuMatched.slice(0, remainingSlotsForMenu);

  const totalCurrentlyVisible = visibleNameMatched.length + visibleMenuMatched.length;
  const hasMore = totalCurrentlyVisible < totalResults;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="app-container">
      <Header
        selectedLocality={selectedLocality}
        onOpenLocalityModal={() => setIsLocalityModalOpen(true)}
        isGoldMember={isGoldMember}
        setIsGoldMember={setIsGoldMember}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocality={selectedLocality}
        onOpenLocalityModal={() => setIsLocalityModalOpen(true)}
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

      {/* Live Scraping Progress Banner */}
      {isScraping && (
        <div style={{
          background: '#151d2a',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '1.25rem',
          color: '#ffffff'
        }}>
          <RefreshCw className="spin" size={20} color="#ff8200" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sorting by Closest Distance to {selectedLocality.name}...</div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{scrapingStep}</div>
          </div>
        </div>
      )}

      {/* Area Context Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={15} color="#ff8200" />
          <span>
            Showing <strong>Top {totalCurrentlyVisible} Closest</strong> restaurants near <strong>{selectedLocality.name}, Bengaluru</strong>
          </span>
        </div>

        {isGoldMember && (
          <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.8rem' }}>
            👑 Gold/One Discounts Applied
          </span>
        )}
      </div>

      <SavingsSummary stats={stats} />

      {/* SECTION 1: RESTAURANTS WITH QUERY IN THEIR NAME */}
      {visibleNameMatched.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
            <Store size={20} color="#ff8200" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Closest Restaurants Named "{searchQuery || 'Pizza'}"
            </h2>
          </div>

          <div className="comparison-grid">
            {visibleNameMatched.map((dish) => (
              <ComparisonCard key={dish.id} dish={dish} onSelectDish={setSelectedDish} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: MENUS & DISHES SERVING QUERY */}
      {visibleMenuMatched.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
            <Utensils size={20} color="#4ade80" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Other Closest Restaurants & Menus Serving "{searchQuery || 'Pizza'}"
            </h2>
          </div>

          <div className="comparison-grid">
            {visibleMenuMatched.map((dish) => (
              <ComparisonCard key={dish.id} dish={dish} onSelectDish={setSelectedDish} />
            ))}
          </div>
        </section>
      )}

      {/* SHOW MORE BUTTON (Reveals next 10 closest restaurants) */}
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '2rem 0 3rem 0' }}>
          <button
            onClick={handleShowMore}
            style={{
              background: '#1e293b',
              border: '1px solid #ff8200',
              color: '#ffffff',
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>Show More Restaurants (+10 Further Away)</span>
            <ChevronDown size={18} color="#ff8200" />
          </button>
          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
            ({totalResults - totalCurrentlyVisible} more restaurants gradually further away)
          </div>
        </div>
      )}

      {totalResults === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#cbd5e1' }}>
          <UtensilsCrossed size={44} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>No restaurants found near {selectedLocality.name}</h3>
          <p>Try clearing your search or choose another Bengaluru area above.</p>
        </div>
      )}

      {selectedDish && (
        <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}

      {isLocalityModalOpen && (
        <LocalitySelectorModal
          selectedLocality={selectedLocality}
          onSelectLocality={setSelectedLocality}
          onClose={() => setIsLocalityModalOpen(false)}
        />
      )}

      <footer style={{ textAlign: 'center', borderTop: '1px solid #334155', paddingTop: '1.75rem', paddingBottom: '1.75rem', marginTop: '3.5rem', color: '#cbd5e1', fontSize: '0.82rem' }}>
        <p>BiteSaver — Distance-Sorted Swiggy & Zomato Bengaluru Scraper Engine</p>
        <p style={{ marginTop: '0.4rem' }}>📍 Selected Locality: {selectedLocality.name}, Bengaluru • Mobile App Deep-Linking Active</p>
      </footer>
    </div>
  );
}
