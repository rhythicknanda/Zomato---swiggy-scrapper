import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SavingsSummary } from './components/SavingsSummary';
import { ComparisonCard } from './components/ComparisonCard';
import { DishDetailModal } from './components/DishDetailModal';
import { LocalitySelectorModal } from './components/LocalitySelectorModal';
import { searchAndCompareDishesSplit, calculateTotalStats } from './services/scraperService';
import { BENGALURU_LOCALITIES } from './data/dishesData';
import { UtensilsCrossed, RefreshCw, MapPin, Store, Utensils, Sparkles } from 'lucide-react';

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

  const [isScraping, setIsScraping] = useState(false);
  const [scrapingStep, setScrapingStep] = useState('');

  const triggerScrapeEffect = () => {
    setIsScraping(true);
    setScrapingStep(`🔍 Scraping Swiggy & Zomato listings for "${searchQuery || 'Pizza'}" in ${selectedLocality.name}...`);

    setTimeout(() => {
      setScrapingStep(`🏬 Grouping restaurants named "${searchQuery || 'Pizza'}" vs Menu items...`);
    }, 400);

    setTimeout(() => {
      setScrapingStep(`⚡ Calculating packaging fees, delivery distance & Gold/One discounts...`);
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
  }, [selectedLocality, searchQuery, selectedCategory, sortBy, priceRange, isVegOnly, isNonVegOnly, isGoldMember]);

  const { nameMatched, menuMatched } = useMemo(() => {
    return searchAndCompareDishesSplit({
      query: searchQuery,
      selectedLocality,
      category: selectedCategory,
      isVegOnly,
      isNonVegOnly,
      isGoldMember,
      sortBy,
      priceRange
    });
  }, [searchQuery, selectedLocality, selectedCategory, isVegOnly, isNonVegOnly, isGoldMember, sortBy, priceRange]);

  const stats = useMemo(() => {
    return calculateTotalStats(nameMatched, menuMatched);
  }, [nameMatched, menuMatched]);

  const totalResults = nameMatched.length + menuMatched.length;

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
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Scraping Swiggy & Zomato for {selectedLocality.name}...</div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{scrapingStep}</div>
          </div>
        </div>
      )}

      {/* Area Context Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={15} color="#ff8200" />
          <span>Showing <strong>{totalResults}</strong> listings in <strong>{selectedLocality.name}, Bengaluru</strong></span>
        </div>

        {isGoldMember && (
          <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.8rem' }}>
            👑 Gold/One Discounts Applied
          </span>
        )}
      </div>

      <SavingsSummary stats={stats} />

      {/* SECTION 1: RESTAURANTS WITH QUERY IN THEIR NAME */}
      {nameMatched.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
            <Store size={20} color="#ff8200" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Restaurants Named "{searchQuery || 'Pizza'}" ({nameMatched.length})
            </h2>
          </div>

          <div className="comparison-grid">
            {nameMatched.map((dish) => (
              <ComparisonCard key={dish.id} dish={dish} onSelectDish={setSelectedDish} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: MENUS & DISHES SERVING QUERY */}
      {menuMatched.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
            <Utensils size={20} color="#4ade80" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Other Restaurants & Menus Serving "{searchQuery || 'Pizza'}" ({menuMatched.length})
            </h2>
          </div>

          <div className="comparison-grid">
            {menuMatched.map((dish) => (
              <ComparisonCard key={dish.id} dish={dish} onSelectDish={setSelectedDish} />
            ))}
          </div>
        </section>
      )}

      {totalResults === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#cbd5e1' }}>
          <UtensilsCrossed size={44} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>No restaurants found matching filters in {selectedLocality.name}</h3>
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
        <p>BiteSaver — Verified Swiggy & Zomato Bengaluru Scraper Engine</p>
        <p style={{ marginTop: '0.4rem' }}>📍 Selected Locality: {selectedLocality.name}, Bengaluru • Mobile App Deep-Linking Active</p>
      </footer>
    </div>
  );
}
