import React from 'react';
import { Star, ChevronRight, MapPin } from 'lucide-react';

export const ComparisonCard = ({ dish, onSelectDish }) => {
  return (
    <div className="dish-card">
      <div className="dish-header">
        <img src={dish.image} alt={dish.name} className="dish-image" loading="lazy" />
        <div className="dish-overlay" />
        <span className={`dish-veg-badge ${dish.isVeg ? 'veg' : 'non-veg'}`}>
          {dish.isVeg ? 'Veg' : 'Non-Veg'}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: '0.72rem',
            padding: '4px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600'
          }}
        >
          <MapPin size={12} color="#fc8019" /> {dish.cityName || 'Delhi NCR'}
        </span>
      </div>

      <div className="dish-content">
        <h3 className="dish-name">{dish.name}</h3>
        <div className="restaurant-name">
          <span>{dish.restaurant}</span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
            <Star size={14} fill="#f59e0b" /> {dish.rating}
          </span>
        </div>

        <div className="platforms-comparison">
          {dish.sortedPlatforms.map((platform, idx) => {
            const isCheapest = idx === 0;
            const diffWithExpensive = dish.sortedPlatforms[dish.sortedPlatforms.length - 1].finalPrice - platform.finalPrice;

            return (
              <div key={platform.platform} className={`platform-row ${isCheapest ? 'cheapest' : ''}`}>
                <div className="platform-brand">
                  <div className={`platform-logo ${platform.bgClass}`}>
                    {platform.name[0]}
                  </div>
                  <span>{platform.name}</span>
                  {isCheapest && <span className="cheapest-tag">Cheapest</span>}
                </div>

                <div className="platform-price-box">
                  <div className="final-price">₹{platform.finalPrice}</div>
                  {isCheapest && diffWithExpensive > 0 ? (
                    <div className="price-diff">Save ₹{diffWithExpensive}</div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{platform.deliveryTime}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="breakdown-btn" onClick={() => onSelectDish(dish)}>
          <span>View Price Breakdown</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
