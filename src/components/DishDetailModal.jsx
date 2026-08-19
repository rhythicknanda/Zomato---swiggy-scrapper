import React from 'react';
import { X, ExternalLink, Tag, Truck, ShoppingBag, Percent } from 'lucide-react';

export const DishDetailModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close detail modal">
          <X size={20} />
        </button>

        <h2 className="modal-title">{dish.name}</h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '1rem' }}>
          Price breakdown at <strong>{dish.restaurant}</strong>
        </p>

        <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          {dish.description}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Base Item</th>
                <th>Packaging</th>
                <th>Delivery</th>
                <th>Coupon</th>
                <th>Final Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dish.sortedPlatforms.map((p, idx) => {
                const isCheapest = idx === 0;
                return (
                  <tr key={p.platform} style={isCheapest ? { backgroundColor: 'rgba(16, 185, 129, 0.1)' } : {}}>
                    <td style={{ fontWeight: 700 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`platform-logo ${p.bgClass}`} style={{ width: '20px', height: '20px', fontSize: '0.7rem' }}>
                          {p.name[0]}
                        </span>
                        {p.name}
                      </div>
                    </td>
                    <td>₹{p.basePrice}</td>
                    <td>+₹{p.packagingFee}</td>
                    <td>+₹{p.deliveryFee}</td>
                    <td style={{ color: '#34d399', fontWeight: 600 }}>
                      {p.discount > 0 ? `-₹${p.discount}` : '₹0'}
                    </td>
                    <td style={{ fontSize: '1.1rem', fontWeight: 800, color: isCheapest ? '#34d399' : '#fff' }}>
                      ₹{p.finalPrice}
                    </td>
                    <td>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="order-link-btn"
                        style={{
                          backgroundColor: p.platform === 'swiggy' ? '#fc8019' : p.platform === 'zomato' ? '#e23744' : '#00b4d8'
                        }}
                      >
                        Order <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#9ca3af' }}>
          💡 <strong>Pro Tip:</strong> Swiggy and Zomato prices can vary depending on your location, surge delivery charges, and active Gold/One memberships.
        </div>
      </div>
    </div>
  );
};
