import { useState, useEffect } from "react";

const useCountdown = (initialValue) => {
  const [countdown, setCountdown] = useState(initialValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      if (!isReady) setIsReady(true);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return { gameCountdown: countdown, isReady, setGameCountdown: setCountdown, setIsReady };
};

export default useCountdown;
