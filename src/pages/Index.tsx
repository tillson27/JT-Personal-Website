import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import SectionArrow from "@/components/SectionArrow";

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <ThemeToggle />
      <Hero />
      <SectionArrow targetId="about" />
      <About />
      <SectionArrow targetId="experience" />
      <Experience />
      <SectionArrow targetId="projects" />
      <Projects />
      <SectionArrow targetId="contact" />
      <Footer />
    </main>
  );
};

export default Index;
