import React, { useState, useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Committees } from "./components/Committees";
import { SubTeams } from "./components/SubTeams";
import { Sponsors } from "./components/Sponsors";
import { Contact } from "./components/Contact";
import { Blog } from "./components/Blog";
import { Xtreme } from "./components/Xtreme";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { ArrowUp, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "./contexts/LanguageContext";
import EventApplicationPage from "./EventApplicationPage";
import MembershipPage from "./MembershipPage";
import EventsPage from "./EventsPage";
import AdminLoginPage from "./AdminLoginPage";
import AdminPanelPage from "./AdminPanelPage";
import AdminEventFormPage from "./AdminEventFormPage";

function AppContent() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Check for route in URL
    const determineRoute = () => {
      const path = window.location.pathname;
      if (path.startsWith("/admin-login")) {
        setCurrentPage("admin-login");
        setSelectedEventId(null);
      } else if (path === "/admin/events/new") {
        setCurrentPage("admin-event-new");
        setSelectedEventId(null);
      } else if (/^\/admin\/events\/[^/]+\/edit$/.test(path)) {
        const segments = path.split("/");
        setSelectedEventId(segments[3] ?? null);
        setCurrentPage("admin-event-edit");
      } else if (path.startsWith("/admin")) {
        setCurrentPage("admin");
        setSelectedEventId(null);
      } else if (
      path.includes("/events") ||
      path.includes("/etkinlikler")
    ) {
      // Check if it's event application or events page
      if (
        path.includes("/apply") ||
        path.includes("/basvuru")
      ) {
        setCurrentPage("events-application");
      } else {
        setCurrentPage("events");
      }
    } else if (
      path.includes("/membership") ||
      path.includes("/uyelik")
    ) {
      setCurrentPage("membership");
      setSelectedEventId(null);
      } else {
        setCurrentPage("home");
        setSelectedEventId(null);
      }
    };

    determineRoute();

    const handlePopState = () => {
      determineRoute();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);

    // Check localStorage for dark mode preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("hashchange", handlePopState);
      };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle function for testing
  const togglePage = () => {
    setCurrentPage(
      currentPage === "home" ? "events-application" : "home",
    );
  };

  // Show event application page if route matches
  if (currentPage === "admin-login") {
    return <AdminLoginPage />;
  }

  if (currentPage === "admin") {
    return <AdminPanelPage />;
  }

  if (currentPage === "admin-event-new") {
    return <AdminEventFormPage mode="create" />;
  }

  if (currentPage === "admin-event-edit" && selectedEventId) {
    return <AdminEventFormPage mode="edit" eventId={selectedEventId} />;
  }

  if (currentPage === "events-application") {
    return <EventApplicationPage />;
  } else if (currentPage === "membership") {
    return <MembershipPage />;
  } else if (currentPage === "events") {
    return <EventsPage />;
  }

  return (
    <div className="app-main-container">
      <Header
        togglePage={togglePage}
        currentPage={currentPage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main>
        <Hero />
        <About />
        <Team />
        <Committees />
        <SubTeams />

        {/* Events CTA Section */}
        <section className="events-cta-section">
          <div className="events-cta-container">
            <div className="events-cta-inner">
              <div className="events-cta-header">
                <h2 className="events-cta-title">
                  {t.eventsCallout.title}
                </h2>
                <p className="events-cta-description">
                  {t.eventsCallout.description}
                </p>
              </div>

              <div className="events-stats-grid">
                <div className="events-stat-card">
                  <div className="events-stat-number">
                    {t.eventsCallout.stats.workshops}
                  </div>
                  <div className="events-stat-label">
                    {t.eventsCallout.stats.workshopsLabel}
                  </div>
                </div>
                <div className="events-stat-card">
                  <div className="events-stat-number">
                    {t.eventsCallout.stats.competitions}
                  </div>
                  <div className="events-stat-label">
                    {t.eventsCallout.stats.competitionsLabel}
                  </div>
                </div>
                <div className="events-stat-card">
                  <div className="events-stat-number">
                    {t.eventsCallout.stats.participants}
                  </div>
                  <div className="events-stat-label">
                    {t.eventsCallout.stats.participantsLabel}
                  </div>
                </div>
              </div>

              <div className="events-cta-button-wrapper">
                <Button
                  asChild
                  size="lg"
                  className="ieee-gradient-button"
                >
                  <a
                    href="/events"
                    className="flex items-center gap-2"
                  >
                    {t.eventsCallout.button}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Sponsors />
        <Contact />
        <Blog />
        <Xtreme />
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="scroll-top-button"
          aria-label={t.common.scrollTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
