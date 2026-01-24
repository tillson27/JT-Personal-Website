import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">
            About
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a technical product owner and strategy consultant with a background in 
              computer science and business from UBC. I've spent the last few years helping 
              Fortune 500 companies navigate cloud transformations, modernize their tech stacks, 
              and build roadmaps that actually get executed.
            </p>
            <p>
              Currently, I'm a Product Manager at Caylent, where I lead a team of 20 building 
              an integration platform for a $100B+ mortgage servicer commercializing their 
              loan servicing software into a multi-tenant SaaS product.
            </p>
            <p>
              On the side, I'm building{" "}
              <a
                href="https://emlyai.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                emlyai
              </a>
              —AI tools that help real estate professionals create better listings and marketing 
              materials. It's the intersection of AI and an industry that's ripe for innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
