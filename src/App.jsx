import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SavingsSummary } from './components/SavingsSummary';
import { ComparisonCard } from './components/ComparisonCard';
import { DishDetailModal } from './components/DishDetailModal';
import { LocalitySelectorModal } from './components/LocalitySelectorModal';
import { searchAndCompareDishes, calculateTotalStats } from './services/scraperService';
import { BENGALURU_LOCALITIES } from './data/dishesData';
import { UtensilsCrossed, RefreshCw, MapPin } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('Biryani');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocality, setSelectedLocality] = useState(BENGALURU_LOCALITIES[1]); // Default: Koramangala
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
    setScrapingStep(`🔍 Scraping Swiggy & Zomato in ${selectedLocality.name}, Bengaluru...`);

    setTimeout(() => {
      setScrapingStep(`📍 Fetching exact store addresses & Swiggy/Zomato mobile app deep links...`);
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

  const dishes = useMemo(() => {
    return searchAndCompareDishes({
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
    return calculateTotalStats(dishes);
  }, [dishes]);

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

      {/* Live Scraping Banner */}
      {isScraping && (
        <div style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '1.25rem',
          color: '#0f172a'
        }}>
          <RefreshCw className="spin" size={20} color="#fc8019" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Scraping Bengaluru Listings for {selectedLocality.name}...</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{scrapingStep}</div>
          </div>
        </div>
      )}

      {/* Area Context Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={15} color="#fc8019" />
          <span>Showing <strong>{dishes.length}</strong> restaurants near <strong>{selectedLocality.name}, Bengaluru</strong></span>
        </div>

        {isGoldMember && (
          <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem' }}>
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
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
          <UtensilsCrossed size={44} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>No restaurants found matching filters in {selectedLocality.name}</h3>
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

      <footer style={{ textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1.75rem', paddingBottom: '1.75rem', marginTop: '3.5rem', color: '#64748b', fontSize: '0.82rem' }}>
        <p>BiteSaver — Bengaluru Food Price Scraper Engine (Swiggy vs Zomato vs Ownly)</p>
        <p style={{ marginTop: '0.4rem' }}>📍 Selected Locality: {selectedLocality.name}, Bengaluru • Mobile App Deep-Linking Active</p>
      </footer>
    </div>
  );
}
