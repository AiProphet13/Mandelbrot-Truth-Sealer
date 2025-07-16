import React, { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value, suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef();
  
  useEffect(() => {
    const duration = 800;
    let startTimestamp = null;
    const startValue = displayValue;
    const deltaValue = value - startValue;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + deltaValue * easeOutCubic);
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value]);

  const displayString = Number.isInteger(value) 
    ? Math.round(displayValue).toString()
    : displayValue.toFixed(1);

  return (
    <div className={className}>
      {displayString}{suffix}
    </div>
  );
};

export default AnimatedNumber;
