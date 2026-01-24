import { motion } from "framer-motion";

const SoundWave = () => {
  const bars = 24;
  
  return (
    <div className="flex items-center gap-[3px] h-12 opacity-50 mb-6">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-foreground/60 rounded-full"
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
            duration: 2 + (i % 5) * 0.3,
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
