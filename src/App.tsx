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
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main role="main">
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
