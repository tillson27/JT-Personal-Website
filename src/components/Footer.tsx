import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-16 md:py-24 border-t border-border">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">
            Let's connect
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            I'm always interested in hearing about new opportunities, collaborations, 
            or just having a conversation about technology and product.
          </p>

          <div className="flex items-center gap-6 mb-12">
            <a
              href="mailto:tillson27@gmail.com"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors underline underline-offset-4"
            >
              <Mail size={18} />
              tillson27@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-border">
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/joshtillson/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/tillson27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Josh Tillson
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
