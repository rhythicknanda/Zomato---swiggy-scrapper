import React from 'react';
import { X, ExternalLink, MapPin, Ticket, Smartphone } from 'lucide-react';
import { openPlatformAppOrWeb } from '../services/scraperService';

export const DishDetailModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <h2 className="modal-title">{dish.restaurant}</h2>
        <p style={{ color: '#4ade80', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {dish.dishName}
        </p>

        {/* Full Street Address */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <MapPin size={18} color="#ff8200" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: '#ffffff' }}>Store Address:</strong> {dish.address}
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '2px' }}>
              Locality: {dish.locality}, Bengaluru ({dish.distanceKm} km distance)
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Base Item</th>
                <th>Packaging</th>
                <th>Delivery</th>
                <th>Platform Fee</th>
                <th>Coupon Code</th>
                <th>Net Total</th>
                <th>App Order</th>
              </tr>
            </thead>
            <tbody>
              {dish.sortedPlatforms.map((p, idx) => {
                const isCheapest = idx === 0;
                return (
                  <tr key={p.platform} style={isCheapest ? { backgroundColor: 'rgba(34, 197, 94, 0.15)' } : {}}>
                    <td style={{ fontWeight: 800 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}>
                        <span className={`platform-logo ${p.bgClass}`} style={{ width: '20px', height: '20px', fontSize: '0.7rem' }}>
                          {p.name[0]}
                        </span>
                        {p.name}
                      </div>
                    </td>
                    <td>₹{p.basePrice}</td>
                    <td>+₹{p.packagingFee}</td>
                    <td>{p.deliveryFee === 0 ? <span style={{ color: '#4ade80', fontWeight: 800 }}>FREE</span> : `+₹${p.deliveryFee}`}</td>
                    <td>+₹{p.platformFee}</td>
                    <td style={{ color: '#4ade80', fontWeight: 700 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                        <Ticket size={12} /> {p.couponCode} (-₹{p.discount})
                      </div>
                    </td>
                    <td style={{ fontSize: '1.1rem', fontWeight: 800, color: isCheapest ? '#4ade80' : '#ffffff' }}>
                      ₹{p.finalPrice}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openPlatformAppOrWeb(p.platform, dish)}
                        className="order-link-btn"
                        style={{
                          backgroundColor: p.platform === 'swiggy' ? '#ff8200' : p.platform === 'zomato' ? '#ef4444' : '#0284c7',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Smartphone size={13} /> Open App <ExternalLink size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.25rem', background: '#1e293b', border: '1px solid #334155', padding: '0.85rem', borderRadius: '10px', fontSize: '0.82rem', color: '#cbd5e1' }}>
          📱 <strong>Mobile Deep-Link Active:</strong> Tapping "Open App" on your phone opens the exact <strong>{dish.restaurant}</strong> dish menu page directly inside the {dish.cheapestPlatform.name} app.
        </div>
      </div>
    </div>
  );
};
