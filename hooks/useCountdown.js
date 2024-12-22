import { useState, useEffect } from "react";

const useCountdown = (initialValue) => {
  const [countdown, setCountdown] = useState(initialValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setIsReady(true);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return { countdown, isReady, resetCountdown: setCountdown };
};

export default useCountdown;
