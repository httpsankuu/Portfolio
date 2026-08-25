import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionReveal from "./components/SectionReveal";
import About from "./components/About";
import Arsenal from "./components/Arsenal";
import GitHubStats from "./components/GitHubStats";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";


export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionReveal>
          <Arsenal />
        </SectionReveal>
        <SectionReveal>
          <GitHubStats />
        </SectionReveal>
        <SectionReveal>
          <Education />
        </SectionReveal>
        <SectionReveal>
          <Experience />
        </SectionReveal>
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <SectionReveal>
          <Achievements />
        </SectionReveal>
        <SectionReveal>
          <Certifications />
        </SectionReveal>
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
