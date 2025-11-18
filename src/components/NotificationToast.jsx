import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  return (
    <div 
      className="animate-rise"
      style={{ 
        background: 'white', 
        borderLeft: '6px solid var(--color-burnt-orange)',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        marginBottom: '1rem',
        width: '350px',
        position: 'relative',
        display: 'flex',
        gap: '1rem',
        alignItems: 'start'
      }}
    >
      <div style={{ background: 'var(--color-dough)', padding: '8px', borderRadius: '50%' }}>
        <AlertTriangle color="var(--color-burnt-orange)" size={24} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-burnt-orange)' }}>{notification.title}</h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{notification.message}</p>
        {notification.gif && (
           <div style={{ marginTop: '0.5rem', fontSize: '2rem' }}>
             {notification.gif}
           </div>
        )}
      </div>
      <button 
        onClick={() => onClose(notification.id)}
        style={{ background: 'none', padding: 0, color: 'var(--color-text-light)' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default NotificationToast;
