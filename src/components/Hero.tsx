import { motion, Easing } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import SoundWave from "./SoundWave";

const Hero = () => {
  const easeOut: Easing = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const name = "Josh Tillson";

  return (
    <section id="hero" className="min-h-screen flex flex-col px-6 md:px-12 lg:px-24 pt-24 pb-8 relative overflow-hidden">
      <SoundWave />
      <div className="flex-1 flex flex-col justify-center mt-[15vh]">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-sm tracking-wide mb-4 font-mono"
        >
          Calgary, Canada
        </motion.p>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 overflow-hidden">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.03,
                duration: 0.5,
                ease: easeOut,
              }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          Product Manager at{" "}
          <a
            href="https://caylent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            Caylent
          </a>{" "}
          and Founder at{" "}
          <a
            href="https://emlyai.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            emlyai
          </a>
          . I help companies build and modernize technology systems, and I'm building AI voice receptionists for service businesses.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-5 mt-8"
        >
          <motion.a
            href="https://www.linkedin.com/in/joshtillson/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="https://github.com/tillson27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="mailto:tillson27@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>
        </motion.div>
        </motion.div>
      </div>
      
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="flex justify-center pb-4"
        aria-label="Navigate to about"
      >
        <ChevronDown size={24} className="text-muted-foreground hover:text-foreground transition-colors animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
