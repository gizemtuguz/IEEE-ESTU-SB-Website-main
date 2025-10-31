import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import {
  ArrowLeft,
  Moon,
  Sun,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Languages,
} from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import {
  LanguageProvider,
  useLanguage,
} from "./contexts/LanguageContext";

function EventsPageContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
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

  const toggleLanguage = () => {
    const newLanguage = language === "tr" ? "en" : "tr";
    setLanguage(newLanguage);
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <a href="/" className="flex items-center space-x-2">
                <div className="flex lg:hidden items-center">
                  <img src="/src/assets/logo_mobil.png" alt="IEEE Logo" className="h-9 w-9 object-contain" />
                </div>
                <div className="hidden lg:flex items-center">
                  <img src="/src/assets/logo.png" alt="IEEE Logo" className="h-10 w-auto object-contain" />
                </div>
                <div className="leading-tight hidden lg:block">
                  <h1 className="text-sm font-semibold text-primary whitespace-nowrap">
                    IEEE ESTU
                  </h1>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    Student Branch
                  </p>
                </div>
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Back to Home Button */}
              <Button
                onClick={goHome}
                variant="outline"
                className="gap-2 rounded-lg hover:bg-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t.events.applicationPage.backToHome}
                </span>
              </Button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="w-auto h-9 px-2 rounded-lg bg-accent hover:bg-muted flex items-center justify-center gap-1 transition-colors duration-200"
                aria-label="Change language"
              >
                <Languages className="h-4 w-4 text-foreground" />
                <span className="text-xs font-medium text-foreground">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-lg bg-accent hover:bg-muted flex items-center justify-center transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-foreground" />
                ) : (
                  <Moon className="h-4 w-4 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Events />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function EventsPage() {
  return (
    <LanguageProvider>
      <EventsPageContent />
    </LanguageProvider>
  );
}
