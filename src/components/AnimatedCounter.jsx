import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedCounter({ 
  target, 
  duration = 2000, 
  prefix = "", 
  suffix = "",
  className = "",
  isVisible = false
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(count);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      let startTime;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * target);
        
        setCount(currentCount);
        countRef.current = currentCount;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, target, duration, hasAnimated]);

  const formatNumber = (num) => {
    if (target >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (target >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    } else {
      return num.toLocaleString();
    }
  };

  return (
    <motion.span 
      className={`number-counter ${className}`}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
}
