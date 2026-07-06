import { motion } from "framer-motion";

const experiences = [
  {
    period: "2025 — Present",
    role: "Product Manager",
    company: "Caylent",
    description:
      "Leading development of an integration interface for a $100B+ mortgage servicer commercializing their loan servicing platform into a multi-tenant SaaS product.",
  },
  {
    period: "2026 — Present",
    role: "Founder",
    company: "emlyai",
    description:
      "Building an AI voice receptionist platform serving 50+ businesses across real estate, home services, and healthcare with 24/7 call handling and CRM integration.",
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
    role: "Technical Program Manager",
    company: "Microsoft",
    description:
      "Helped enterprise customers adopt cloud identity and endpoint security solutions.",
  },
  {
    period: "2021 — 2022",
    role: "Technology Strategy Consultant",
    company: "KPMG",
    description:
      "Technology strategy consulting engagements across financial services and public sector clients.",
  },
  {
    period: "2021",
    role: "Product Manager",
    company: "Royal Bank of Canada",
    description:
      "Product management on internal digital banking platforms.",
  },
  {
    period: "2016 — 2020",
    role: "Founder",
    company: "Unbreakable Run",
    description:
      "Founded and grew a community running brand: coaching, group events, and building an audience across social media.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-12 md:py-16 bg-card">
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
