import React from 'react';
import { Star, ChevronRight, MapPin, Navigation, Tag } from 'lucide-react';

export const ComparisonCard = ({ dish, onSelectDish }) => {
  return (
    <div className="dish-card">
      <div className="dish-header">
        <img src={dish.image} alt={dish.dishName} className="dish-image" loading="lazy" />
        <div className="dish-overlay" />
        
        <span className={`dish-veg-badge ${dish.isVeg ? 'veg' : 'non-veg'}`}>
          {dish.isVeg ? 'Veg' : 'Non-Veg'}
        </span>

        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: '0.75rem',
            padding: '4px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600'
          }}
        >
          <MapPin size={12} color="#fc8019" /> {dish.locality || dish.cityName}
        </span>
      </div>

      <div className="dish-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
          <h3 className="dish-name" style={{ fontSize: '1.25rem' }}>{dish.restaurant}</h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#1f293d', padding: '2px 8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b' }}>
            <Star size={13} fill="#f59e0b" /> {dish.rating}
          </span>
        </div>

        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#34d399', marginBottom: '0.25rem' }}>
          {dish.dishName}
        </div>

        <div className="restaurant-name" style={{ marginBottom: '1.25rem', fontSize: '0.82rem' }}>
          <Navigation size={12} color="#9ca3af" />
          <span>{dish.locality}, {dish.cityName} ({dish.distanceKm} km away)</span>
        </div>

        {/* Multi-Platform Price Comparison Bars */}
        <div className="platforms-comparison">
          {dish.sortedPlatforms.map((platform, idx) => {
            const isCheapest = idx === 0;
            const expensivePrice = dish.sortedPlatforms[dish.sortedPlatforms.length - 1].finalPrice;
            const diffWithExpensive = expensivePrice - platform.finalPrice;

            return (
              <div key={platform.platform} className={`platform-row ${isCheapest ? 'cheapest' : ''}`}>
                <div className="platform-brand">
                  <div className={`platform-logo ${platform.bgClass}`}>
                    {platform.name[0]}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700 }}>{platform.name}</span>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{platform.deliveryTime}</div>
                  </div>
                  {isCheapest && <span className="cheapest-tag">Best Deal</span>}
                </div>

                <div className="platform-price-box">
                  <div className="final-price">₹{platform.finalPrice}</div>
                  {isCheapest && diffWithExpensive > 0 ? (
                    <div className="price-diff">Save ₹{diffWithExpensive}</div>
                  ) : (
                    <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                      Coupon: <span style={{ color: '#34d399', fontWeight: 600 }}>{platform.couponCode}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="breakdown-btn" onClick={() => onSelectDish(dish)}>
          <span>View Full Checkout Breakdown</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
