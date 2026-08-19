import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SavingsSummary } from './components/SavingsSummary';
import { ComparisonCard } from './components/ComparisonCard';
import { DishDetailModal } from './components/DishDetailModal';
import { searchAndCompareDishes, calculateTotalStats } from './services/scraperService';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState(null);

  const dishes = useMemo(() => {
    return searchAndCompareDishes(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    return calculateTotalStats(dishes);
  }, [dishes]);

  return (
    <div className="app-container">
      <Header />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

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
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>No dishes found matching "{searchQuery}"</h3>
          <p>Try searching for "Biryani", "Paneer", "Pizza", "Burger", or select another category above.</p>
        </div>
      )}

      {selectedDish && (
        <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}

      <footer style={{ textTransform: 'center', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', paddingBottom: '2rem', marginTop: '4rem', color: '#6b7280', fontSize: '0.85rem' }}>
        <p>BiteSaver — 100% Free Food Price Comparison Engine (Swiggy vs Zomato vs Ownly)</p>
        <p style={{ marginTop: '0.5rem' }}>Ready for 1-Click Netlify Deployment • Built with React & Vite</p>
      </footer>
    </div>
  );
}
