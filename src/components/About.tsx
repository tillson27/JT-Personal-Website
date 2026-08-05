import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import centralPark from "@/assets/casper/central-park.jpeg";
import killarney from "@/assets/casper/killarney.jpg";
import gradMom from "@/assets/casper/grad-mom.jpg";
import summit from "@/assets/casper/summit.jpeg";

const PHOTOS = [
  {
    src: centralPark,
    alt: "Josh in New York City",
    caption: "Walking around Central Park",
  },
  {
    src: killarney,
    alt: "Josh in Killarney, Ontario",
    caption: "Exploring my favourite Northern Ontario trails",
  },
  {
    src: gradMom,
    alt: "Josh at UBC graduation",
    caption: "Graduation with my Mom",
  },
  {
    src: summit,
    alt: "Josh at a Rockies summit",
    caption: "Trail running in the Albertan Rockies",
  },
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openPhoto = openIndex !== null ? PHOTOS[openIndex] : null;

  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    [],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, showPrev, showNext]);

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
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Expand photo: ${p.alt}`}
              className="group relative aspect-square overflow-hidden rounded-sm border border-border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-zoom-in"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[0.15] transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </motion.div>

        <DialogPrimitive.Root
          open={openIndex !== null}
          onOpenChange={(open) => !open && setOpenIndex(null)}
        >
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              onClick={() => setOpenIndex(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
              {openPhoto && (
                <figure
                  onClick={(e) => e.stopPropagation()}
                  className="flex max-h-[92vh] max-w-[95vw] flex-col items-center gap-3"
                >
                  <DialogPrimitive.Title className="sr-only">{openPhoto.alt}</DialogPrimitive.Title>
                  <img
                    key={openPhoto.src}
                    src={openPhoto.src}
                    alt={openPhoto.alt}
                    className="min-h-0 max-h-[82vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
                  />
                  <figcaption className="px-2 text-center text-sm md:text-base text-white/80 font-light tracking-wide">
                    {openPhoto.caption}
                  </figcaption>
                </figure>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/90 transition hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/90 transition hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <DialogPrimitive.Close
                onClick={(e) => e.stopPropagation()}
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white/90 transition hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>

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
