import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/**
 * Extracts numeric target, prefix, suffix, and decimal precision from strings like:
 * "60%", "-30%", "6+", "99.2%", "1", "3.5x", "$120K"
 */
function parseNumericValue(val) {
  if (typeof val === 'number') {
    return { prefix: '', target: val, suffix: '', decimals: 0, isValid: true };
  }
  const str = String(val || '').trim();
  // Match prefix, numeric portion (including decimals), and suffix
  const match = str.match(/^([^\d.-]*)([-+]?\d*\.?\d+)(.*)$/);
  if (!match) {
    return { prefix: '', target: 0, suffix: str, decimals: 0, isValid: false };
  }

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const target = parseFloat(numStr);
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  return { prefix, target, suffix, decimals, isValid: !isNaN(target) };
}

export default function AnimatedCounter({
  value,
  duration = 1.2,
  delay = 0,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const parsed = parseNumericValue(value);
  const [displayValue, setDisplayValue] = useState(() => {
    if (!parsed.isValid) return value;
    // Clean initial representation before scroll trigger
    return `0${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed.isValid) {
      setDisplayValue(value);
      return;
    }

    // Accessibility: Respect user's motion preferences
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayValue(String(value));
      return;
    }

    if (!isInView) return;

    // Fluid Apple cubic-bezier deceleration curve
    const controls = animate(0, Math.abs(parsed.target), {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rounded = parsed.decimals > 0
          ? latest.toFixed(parsed.decimals)
          : Math.round(latest).toString();
        
        // Avoid showing "-0"
        const isEffectivelyZero = Math.abs(latest) < (parsed.decimals > 0 ? 0.05 : 0.5);
        const activePrefix = (parsed.prefix === '-' && isEffectivelyZero) ? '' : parsed.prefix;

        setDisplayValue(`${activePrefix}${rounded}${parsed.suffix}`);
      },
      onComplete: () => {
        // Guarantee final value matches exact input prop
        setDisplayValue(String(value));
      },
    });

    return () => controls.stop();
  }, [
    isInView,
    value,
    duration,
    delay,
    parsed.isValid,
    parsed.target,
    parsed.decimals,
    parsed.prefix,
    parsed.suffix,
  ]);

  return (
    <span ref={ref} className={`tabular-nums inline-block ${className}`}>
      {displayValue}
    </span>
  );
}
