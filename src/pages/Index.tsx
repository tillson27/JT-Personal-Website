import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <ThemeToggle />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
};

export default Index;
