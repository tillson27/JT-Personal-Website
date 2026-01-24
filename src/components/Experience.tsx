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
      "Led technology strategy engagements for Fortune 500 clients across retail, mining, and energy. Built global system architectures and roadmaps.",
  },
  {
    period: "2023 — 2024",
    role: "Senior Systems Analyst",
    company: "Fraser Health",
    description:
      "Drove digital transformation for a major Canadian health authority, leading application rationalization across AWS and Azure.",
  },
  {
    period: "2022 — 2023",
    role: "Technical Specialist",
    company: "Microsoft",
    description:
      "Helped enterprise customers adopt cloud identity and endpoint security solutions.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-card">
      <div className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-medium mb-10 text-foreground"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid md:grid-cols-[140px_1fr] gap-2 md:gap-6"
            >
              <p className="text-sm text-muted-foreground font-mono">
                {exp.period}
              </p>
              <div>
                <h3 className="text-foreground font-medium">
                  {exp.role}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{exp.company}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
