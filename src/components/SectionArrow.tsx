import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SectionArrowProps {
  targetId: string;
}

const SectionArrow = ({ targetId }: SectionArrowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center py-8"
    >
      <a
        href={`#${targetId}`}
        className="text-muted-foreground hover:text-foreground transition-colors p-2"
        aria-label={`Navigate to ${targetId}`}
      >
        <ChevronDown size={24} className="animate-bounce" />
      </a>
    </motion.div>
  );
};

export default SectionArrow;
