import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SavingsSummary } from './components/SavingsSummary';
import { ComparisonCard } from './components/ComparisonCard';
import { DishDetailModal } from './components/DishDetailModal';
import { searchAndCompareDishes, calculateTotalStats } from './services/scraperService';
import { UtensilsCrossed, RefreshCw, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [selectedDish, setSelectedDish] = useState(null);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingStep, setScrapingStep] = useState('');

  // Simulate live scraping visualizer when city or query changes
  const triggerScrapeEffect = () => {
    setIsScraping(true);
    setScrapingStep(`🔍 Connecting to Swiggy & Zomato APIs in ${selectedCity}...`);

    setTimeout(() => {
      setScrapingStep(`🍊 Fetching menu items & active coupon codes...`);
    }, 400);

    setTimeout(() => {
      setScrapingStep(`⚡ Comparing final checkout prices across platforms...`);
    }, 800);

    setTimeout(() => {
      setIsScraping(false);
      setScrapingStep('');
    }, 1100);
  };

  const handleSearchSubmit = () => {
    triggerScrapeEffect();
  };

  // Trigger effect when city changes
  useEffect(() => {
    triggerScrapeEffect();
  }, [selectedCity]);

  const dishes = useMemo(() => {
    return searchAndCompareDishes(searchQuery, selectedCity, selectedCategory);
  }, [searchQuery, selectedCity, selectedCategory]);

  const stats = useMemo(() => {
    return calculateTotalStats(dishes);
  }, [dishes]);

  return (
    <div className="app-container">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isScraping={isScraping}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* Live Scraping Progress Banner */}
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
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Scraping Live Prices for {selectedCity}...</div>
            <div style={{ fontSize: '0.85rem', color: '#d1d5db' }}>{scrapingStep}</div>
          </div>
        </div>
      )}

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
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>No items found for "{searchQuery}"</h3>
          <p>Try searching for any dish like "Biryani", "KFC", "Sushi", "Paneer", "Pizza", or "Momos".</p>
        </div>
      )}

      {selectedDish && (
        <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}

      <footer style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', paddingBottom: '2rem', marginTop: '4rem', color: '#6b7280', fontSize: '0.85rem' }}>
        <p>BiteSaver — Universal Live Food Price Comparison Engine (Swiggy vs Zomato vs Ownly)</p>
        <p style={{ marginTop: '0.5rem' }}>📍 Selected City: {selectedCity} • Netlify Ready</p>
      </footer>
    </div>
  );
}
