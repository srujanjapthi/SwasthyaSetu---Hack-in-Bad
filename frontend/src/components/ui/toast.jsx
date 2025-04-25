import { useState, useCallback } from "react";

let toastCallback;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((options) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...options }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, options.duration || 3000);
  }, []);

  toastCallback = notify;

  return {
    toasts,
    notify,
  };
}

export const toast = (options) => {
  if (toastCallback) {
    toastCallback(options);
  } else {
    console.warn("Toast not ready yet");
  }
};
