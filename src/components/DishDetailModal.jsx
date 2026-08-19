import React from 'react';
import { X, ExternalLink, ShieldCheck, Ticket } from 'lucide-react';

export const DishDetailModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close detail modal">
          <X size={20} />
        </button>

        <h2 className="modal-title">{dish.restaurant}</h2>
        <p style={{ color: '#34d399', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {dish.dishName}
        </p>

        <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
          📍 Location: <strong>{dish.locality}, {dish.cityName}</strong> ({dish.distanceKm} km)
        </p>

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dish.sortedPlatforms.map((p, idx) => {
                const isCheapest = idx === 0;
                return (
                  <tr key={p.platform} style={isCheapest ? { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderLeft: '4px solid #10b981' } : {}}>
                    <td style={{ fontWeight: 700 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`platform-logo ${p.bgClass}`} style={{ width: '22px', height: '22px', fontSize: '0.75rem' }}>
                          {p.name[0]}
                        </span>
                        {p.name}
                      </div>
                    </td>
                    <td>₹{p.basePrice}</td>
                    <td>+₹{p.packagingFee}</td>
                    <td>{p.deliveryFee === 0 ? <span style={{ color: '#34d399', fontWeight: 700 }}>FREE</span> : `+₹${p.deliveryFee}`}</td>
                    <td>+₹{p.platformFee}</td>
                    <td style={{ color: '#34d399', fontWeight: 600 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16,185,129,0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.78rem' }}>
                        <Ticket size={12} /> {p.couponCode} (-₹{p.discount})
                      </div>
                    </td>
                    <td style={{ fontSize: '1.15rem', fontWeight: 800, color: isCheapest ? '#34d399' : '#fff' }}>
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

        <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', color: '#9ca3af', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ShieldCheck size={20} color="#10b981" />
          <span>
            <strong>Best Price Guarantee:</strong> Ordering <strong>{dish.dishName}</strong> via <strong>{dish.cheapestPlatform.name}</strong> saves you up to <strong>₹{dish.maxSavings}</strong> compared to other apps!
          </span>
        </div>
      </div>
    </div>
  );
};
