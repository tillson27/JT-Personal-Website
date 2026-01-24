import { motion } from "framer-motion";

const experiences = [
  {
    period: "2025 — Present",
    role: "Product Manager",
    company: "Caylent",
    description:
      "Leading a team of 20 to build an integration interface for a $100B+ mortgage servicer commercializing their loan servicing platform into a multi-tenant SaaS product.",
  },
  {
    period: "2024 — Present",
    role: "Founder",
    company: "emlyai",
    description:
      "Building AI-powered tools for real estate professionals to create better property listings and marketing materials.",
  },
  {
    period: "2024 — 2025",
    role: "Technology Strategy Consultant",
    company: "Accenture",
    description:
      "Led technology strategy engagements for Fortune 500 clients across retail, mining, and energy. Built global system architectures and roadmaps while originating $600k+ in follow-on work.",
  },
  {
    period: "2023 — 2024",
    role: "Senior Systems Analyst & Product Owner",
    company: "Fraser Health",
    description:
      "Drove digital transformation for a major Canadian health authority, leading application rationalization across AWS and Azure environments.",
  },
  {
    period: "2022 — 2023",
    role: "Cybersecurity Technical Specialist",
    company: "Microsoft",
    description:
      "Helped enterprise customers adopt cloud identity and endpoint security solutions. Built internal optimization tools using Power Platform.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-card">
      <div className="max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif mb-12 text-foreground"
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8"
            >
              <p className="text-sm text-muted-foreground font-medium tracking-wide">
                {exp.period}
              </p>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {exp.role}
                </h3>
                <p className="text-muted-foreground mb-3">{exp.company}</p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
