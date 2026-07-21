import { motion } from "framer-motion";
import centralPark from "@/assets/casper/central-park.jpeg";
import killarney from "@/assets/casper/killarney.jpg";
import gradMom from "@/assets/casper/grad-mom.jpg";
import summit from "@/assets/casper/summit.jpeg";

const PHOTOS = [
  { src: centralPark, alt: "Josh in New York City" },
  { src: killarney, alt: "Josh in Killarney, Ontario" },
  { src: gradMom, alt: "Josh at UBC graduation" },
  { src: summit, alt: "Josh at a Rockies summit" },
];

const WHAT_I_BRING = [
  "Equally at ease talking specs with engineers and roadmaps with executives",
  "Comfortable across product, strategy, engineering, and security, and I do my best work in the connective tissue between them",
  "On AI, I'm an enabler: I sit with teams, listen for the friction in what they already do, and add AI where it actually helps without overwhelming them",
];

const OFF_THE_CLOCK = [
  "Winter is my favourite season",
  "Irrationally afraid of birds but oddly not bears",
  "Big fan of podcasts, reach out to me with recs",
  "Runner, cross-country skier, proud plant dad",
];

const About = () => {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-10 md:py-16">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-5 md:mb-6 text-foreground">
            About
          </h2>
          <div className="space-y-4 text-[15px] md:text-base text-muted-foreground leading-relaxed">
            <p>
              Product manager and strategy consultant with a CS + business background
              from UBC. The last few years I've helped Fortune 500 companies modernize
              their tech stacks and build roadmaps that actually get executed.
            </p>
            <p>
              Now at Caylent, leading an integration platform for a $100B+ mortgage
              servicer commercializing their loan-servicing software as SaaS. On the
              side, building{" "}
              <a
                href="https://emlyai.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors"
              >
                emlyai
              </a>
              , an AI voice receptionist serving 50+ real estate, home services, and
              healthcare businesses.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
        >
          {PHOTOS.map((p) => (
            <figure
              key={p.src}
              className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[0.15] transition duration-500 hover:grayscale-0 hover:scale-[1.02]"
              />
            </figure>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12"
        >
          <p className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 md:mb-4">
            What I bring
          </p>
          <ul className="space-y-2">
            {WHAT_I_BRING.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[13.5px] md:text-sm text-foreground/85 leading-relaxed"
              >
                <span className="mt-[7px] md:mt-[9px] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-foreground/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8 md:mt-10 grid md:grid-cols-2 gap-3 md:gap-4"
        >
          <div className="border border-border rounded-sm p-4 sm:p-5 bg-card">
            <p className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 md:mb-3">
              How I work
            </p>
            <p className="text-[13.5px] md:text-sm text-foreground/85 leading-relaxed">
              I move quickly from an idea to something you can click on. A PRD, some
              wireframes, and a scrappy build are usually enough to know if the thing
              has legs. AI shows up in most of what I ship, but it's the accelerant,
              and a human stays in the loop for the calls that count.
            </p>
          </div>
          <div className="border border-border rounded-sm p-4 sm:p-5 bg-card">
            <p className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 md:mb-3">
              Off the clock
            </p>
            <ul className="space-y-1.5 text-[13.5px] md:text-sm text-foreground/85">
              {OFF_THE_CLOCK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
