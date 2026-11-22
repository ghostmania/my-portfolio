import { useLanguage } from "./i18n/context";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Contact } from "./components/sections/Contact";
import { profile } from "./data/profile";
import { FloatingContact } from "./components/FloatingContact";

export default function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}

function Portfolio() {
  const { t } = useLanguage();
  return (
    <>
      <a className="skip" href="#main">
        {t("Skip to content")}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div className="wrap">
          <Hero />
          <Projects />
        </div>
        <Services />
        <div className="wrap">
          <About />
          <Contact profile={profile} />
        </div>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
