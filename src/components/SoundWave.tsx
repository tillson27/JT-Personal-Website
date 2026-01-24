import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SoundWave = () => {
  const bars = 24;
  const [purpleBarIndex, setPurpleBarIndex] = useState(() => Math.floor(Math.random() * bars));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPurpleBarIndex(Math.floor(Math.random() * bars));
    }, 2000 + Math.random() * 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-[3px] h-12 opacity-50 mb-6">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-[2px] rounded-full transition-colors duration-500 ${
            i === purpleBarIndex ? "bg-purple-500" : "bg-foreground/60"
          }`}
          animate={{
            height: [
              `${12 + Math.sin(i * 0.5) * 8}px`,
              `${28 + Math.cos(i * 0.3) * 20}px`,
              `${16 + Math.sin(i * 0.7) * 12}px`,
              `${32 + Math.cos(i * 0.4) * 16}px`,
              `${12 + Math.sin(i * 0.5) * 8}px`,
            ],
          }}
          transition={{
            duration: 3.5 + (i % 5) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;
