import { useEffect, useRef, useState } from "react";

export const usePerformance = (threshhold = 10) => {
  const renderCount = useRef(0);
  const startTime = useRef(0);
  const [lastRenderTime, setLastRenderTime] = useState(0);

  // record before render finishes
  startTime.current = performance.now();
  renderCount.current += 1;

  useEffect(() => {
    const duration = performance.now() - startTime.current;
    setLastRenderTime(duration);

    // ✅ threshold warning
    if (renderCount.current > threshold) {
      console.warn(`⚠️ Component re-rendered ${renderCount.current} times`);
    }
  });

  return {
    renderCount: renderCount.current,
    lastRenderTime,
  };
};
