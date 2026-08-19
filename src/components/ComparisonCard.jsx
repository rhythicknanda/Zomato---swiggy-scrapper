import React from 'react';
import { Star, ChevronRight, MapPin, Navigation } from 'lucide-react';
import { openPlatformAppOrWeb } from '../services/scraperService';

export const ComparisonCard = ({ dish, onSelectDish }) => {
  return (
    <div className="dish-card">
      <div className="dish-header">
        <img src={dish.image} alt={dish.dishName} className="dish-image" loading="lazy" />
        
        <span className={`dish-veg-badge ${dish.isVeg ? 'veg' : 'non-veg'}`}>
          {dish.isVeg ? 'Veg' : 'Non-Veg'}
        </span>

        <span
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(15,23,42,0.85)',
            color: '#fff',
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '600'
          }}
        >
          <MapPin size={12} color="#fc8019" /> {dish.locality}, Bengaluru
        </span>
      </div>

      <div className="dish-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
          <h3 className="dish-name">{dish.restaurant}</h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2px 6px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#d97706' }}>
            <Star size={13} fill="#f59e0b" color="#d97706" /> {dish.rating}
          </span>
        </div>

        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#16a34a', marginBottom: '0.25rem' }}>
          {dish.dishName}
        </div>

        {/* Address */}
        <div className="restaurant-name" style={{ marginBottom: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
          <Navigation size={12} color="#64748b" style={{ flexShrink: 0 }} />
          <span style={{ lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {dish.address}
          </span>
        </div>

        {/* Multi-Platform Price Rows */}
        <div className="platforms-comparison">
          {dish.sortedPlatforms.map((platform, idx) => {
            const isCheapest = idx === 0;
            const expensivePrice = dish.sortedPlatforms[dish.sortedPlatforms.length - 1].finalPrice;
            const diffWithExpensive = expensivePrice - platform.finalPrice;

            return (
              <div
                key={platform.platform}
                className={`platform-row ${isCheapest ? 'cheapest' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  openPlatformAppOrWeb(platform.platform, dish);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="platform-brand">
                  <div className={`platform-logo ${platform.bgClass}`}>
                    {platform.name[0]}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700 }}>{platform.name}</span>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{platform.deliveryTime}</div>
                  </div>
                  {isCheapest && <span className="cheapest-tag">Best Price</span>}
                </div>

                <div className="platform-price-box">
                  <div className="final-price">₹{platform.finalPrice}</div>
                  {isCheapest && diffWithExpensive > 0 ? (
                    <div className="price-diff">Save ₹{diffWithExpensive}</div>
                  ) : (
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      Coupon: <span style={{ color: '#16a34a', fontWeight: 600 }}>{platform.couponCode}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="breakdown-btn" onClick={() => onSelectDish(dish)}>
          <span>View Detailed Address & Checkout</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};
