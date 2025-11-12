import React, { createContext, useCallback, useContext, useState } from 'react';

const ToastCtx = createContext({ show: () => {} });

/**
 * Toast provider to display transient notifications.
 */
// PUBLIC_INTERFACE
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const show = useCallback(({ type = 'info', text = '' }) => {
    setToast({ type, text });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      {toast && (
        <div role="status" aria-live="polite" className={`toast ${toast.type === 'error' ? 'error' : ''} ${toast.type === 'success' ? 'success' : ''}`}>
          {toast.text}
        </div>
      )}
    </ToastCtx.Provider>
  );
}

// PUBLIC_INTERFACE
export function useToast() {
  return useContext(ToastCtx);
}
