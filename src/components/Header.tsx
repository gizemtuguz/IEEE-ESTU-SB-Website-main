import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  Menu,
  Moon,
  Sun,
  Languages,
  Calendar,
  UserPlus,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import ieeeLogo from "../assets/logo.png";
import ieeeIcon from "../assets/logo_mobil.png";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({
  isDarkMode,
  toggleDarkMode,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.team, href: "#team" },
    { name: t.nav.committees, href: "#committees" },
    { name: t.nav.subteams, href: "#subteams" },
    { name: t.nav.sponsors, href: "#sponsors" },
    { name: t.nav.contact, href: "#contact" },
    { name: t.nav.blog, href: "#blog" },
    { name: t.nav.xtreme, href: "#xtreme" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo-wrapper">
            <a href="/" className="flex items-center space-x-3">
              {/* Desktop Logo - Full Logo */}
              <div className="hidden lg:flex items-center">
                <img
                  src={ieeeLogo}
                  alt="IEEE Logo"
                  className="header-logo-image"
                />
              </div>
              {/* Mobile Logo - Icon Only */}
              <div className="flex lg:hidden items-center">
                <img
                  src={ieeeIcon}
                  alt="IEEE Logo"
                  className="header-logo-icon"
                />
              </div>
              {/* Text - Hidden on mobile, visible on desktop */}
              <div className="header-logo-text">
                <h1 className="header-logo-title">
                  IEEE ESTU
                </h1>
                <p className="header-logo-subtitle">
                  Student Branch
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {/* Centered Nav Items */}
            <div className="header-nav-items">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="header-nav-link"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right Side Buttons and Toggles */}
            <div className="header-actions">
              {/* Events Button - Desktop */}
              <Button
                asChild
                size="default"
                className="header-btn-events"
              >
                <a
                  href="/events"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  {t.nav.events}
                </a>
              </Button>

              {/* Join Us Button - Desktop */}
              <Button
                asChild
                size="default"
                className="header-btn-join"
              >
                <a
                  href="/membership"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4 flex-shrink-0" />
                  {t.nav.joinUs}
                </a>
              </Button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="header-lang-toggle"
                aria-label="Change language"
              >
                <Languages className="h-4 w-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="header-toggle-btn"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="header-mobile-menu">
            {/* Events Button - Mobile */}
            <Button
              asChild
              size="sm"
              className="header-btn-events"
            >
              <a href="/events" className="flex items-center">
                {t.nav.events}
              </a>
            </Button>

            {/* Join Us Button - Mobile */}
            <Button
              asChild
              size="sm"
              className="header-btn-join"
            >
              <a href="/membership" rel="noopener noreferrer">
                {t.nav.joinUs}
              </a>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring flex-shrink-0">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent className="dark:bg-slate-950 overflow-y-auto">
                <SheetTitle className="sr-only">
                  Navigasyon Menüsü
                </SheetTitle>
                <SheetDescription className="sr-only">
                  IEEE ESTU web sitesinin ana navigasyon menüsü
                </SheetDescription>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2 ml-2 mt-2">
                    <img
                      src={ieeeLogo}
                      alt="IEEE Logo"
                      className="h-8 w-auto object-contain"
                    />
                    <div>
                      <h2 className="text-sm font-semibold text-primary">
                        IEEE ESTU
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Student Branch
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sr-only"
                  >
                    Close Menu
                  </button>
                </div>
                <nav className="flex flex-col space-y-4 pb-6">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="header-mobile-nav-link"
                    >
                      {item.name}
                    </a>
                  ))}

                  {/* Buttons Grid - 2x2 Layout */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Events Button */}
                    <Button
                      asChild
                      className="header-btn-events"
                    >
                      <a
                        href="/events"
                        className="flex items-center justify-center"
                      >
                        {t.nav.events}
                      </a>
                    </Button>

                    {/* Join Us Button */}
                    <Button
                      asChild
                      className="header-btn-join"
                    >
                      <a
                        href="/membership"
                        rel="noopener noreferrer"
                      >
                        {t.nav.joinUs}
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
