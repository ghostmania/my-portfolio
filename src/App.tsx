import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { About } from "./components/sections/About";
import { TechStack } from "./components/sections/TechStack";
import { Services } from "./components/sections/Services";
import { Gallery } from "./components/sections/Gallery";
import { Contact } from "./components/sections/Contact";
import { profile } from "./data/profile";

export default function App() {
  const technical = /\/projects(?:\/|\/index.html)?$/.test(
    window.location.pathname,
  );
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header technical={technical} />
      <main id="main" tabIndex={-1}>
        {technical ? (
          <div className="wrap">
            <div className="technical-intro">
              <span className="eyebrow">Behind the work</span>
              <h1>Projects & engineering.</h1>
              <p>
                A closer look at the products, decisions, and technology behind
                my work.
              </p>
            </div>
            <Projects />
            <About />
            <TechStack />
          </div>
        ) : (
          <>
            <div className="wrap">
              <Hero />
            </div>
            <Services />
            <div className="wrap">
              <Gallery />
            </div>
          </>
        )}
        <div className="wrap">
          <Contact profile={profile} />
        </div>
      </main>
      <Footer />
    </>
  );
}
