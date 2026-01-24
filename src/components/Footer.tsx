import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 lg:px-24 py-16 md:py-20 border-t border-border">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-4 text-foreground">
            Let's connect
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg">
            I'm always interested in new opportunities and conversations about technology and product.
          </p>

          <a
            href="mailto:tillson27@gmail.com"
            className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors mb-10"
          >
            <Mail size={16} />
            <span className="text-sm">tillson27@gmail.com</span>
          </a>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/joshtillson/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/tillson27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              © {new Date().getFullYear()} Josh Tillson
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
