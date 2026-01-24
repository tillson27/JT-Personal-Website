import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "emlyai",
    description:
      "AI-powered platform helping real estate professionals create compelling property listings and marketing materials. Currently applying to Y Combinator.",
    link: "https://emlyai.ca",
  },
  {
    title: "Unbreakable Run",
    description:
      "Founded a community event that raised $20k+ and created Northern Ontario's first youth mental wellness programs. Secured partnerships with RBC, Running Room, and CMHA.",
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
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
      <div className="max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif mb-12 text-foreground"
        >
          Projects
        </motion.h2>

        <div className="space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground group-hover:text-accent transition-colors"
                    />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </a>
              ) : (
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
