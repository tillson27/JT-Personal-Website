import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "emlyai",
    description:
      "AI-powered platform helping real estate professionals create compelling property listings and marketing materials.",
    link: "https://emlyai.ca",
  },
  {
    title: "Unbreakable Run",
    description:
      "Community event that raised $20k+ and created Northern Ontario's first youth mental wellness programs.",
    link: null,
  },
  {
    title: "cottageclub.ca",
    description:
      "Landing page for a local recreation cottage community.",
    link: "https://cottageclub.ca",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-20 md:py-28">
      <div className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium mb-10 text-foreground"
        >
          Projects
        </motion.h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-accent transition-colors"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </a>
              ) : (
                <div>
                  <h3 className="text-foreground font-medium mb-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
