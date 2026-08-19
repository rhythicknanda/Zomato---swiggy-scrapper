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
            background: 'rgba(11, 15, 23, 0.85)',
            color: '#ffffff',
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: '700'
          }}
        >
          <MapPin size={12} color="#ff8200" /> {dish.locality}, Bengaluru
        </span>
      </div>

      <div className="dish-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
          <h3 className="dish-name">{dish.restaurant}</h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#1e293b', border: '1px solid #334155', padding: '2px 6px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b' }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" /> {dish.rating}
          </span>
        </div>

        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#4ade80', marginBottom: '0.25rem' }}>
          {dish.dishName}
        </div>

        {/* Address */}
        <div className="restaurant-name" style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
          <Navigation size={12} color="#cbd5e1" style={{ flexShrink: 0 }} />
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
                    <span style={{ fontWeight: 800, color: '#ffffff' }}>{platform.name}</span>
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>{platform.deliveryTime}</div>
                  </div>
                  {isCheapest && <span className="cheapest-tag">Best Price</span>}
                </div>

                <div className="platform-price-box">
                  <div className="final-price">₹{platform.finalPrice}</div>
                  {isCheapest && diffWithExpensive > 0 ? (
                    <div className="price-diff">Save ₹{diffWithExpensive}</div>
                  ) : (
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
                      Coupon: <span style={{ color: '#4ade80', fontWeight: 700 }}>{platform.couponCode}</span>
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
