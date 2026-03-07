import { useState } from "react";

export function useNotification() {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, duration = 2500) => {
    setNotification(message);
    setTimeout(() => setNotification(null), duration);
  };

  return {
    notification,
    showNotification,
  };
}
