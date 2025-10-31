import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  MapPin,
  Mail,
  Send,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useState, useEffect } from "react";

export function Contact() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t.contact.info.address,
      details: [
        "Eskişehir Teknik Üniversitesi",
        "Mühendislik Fakültesi",
        "26555 Tepebaşı/Eskişehir",
      ],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: t.contact.info.email,
      details: ["ieee.estu@gmail.com", "info@ieeeestu.org"],
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@ieeeestu",
      url: "#",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      handle: "IEEE ESTU",
      url: "#",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      handle: "@ieeeestu",
      url: "#",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      handle: "ieee-estu",
      url: "#",
      icon: <Github className="h-5 w-5" />,
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">
            {t.contact.title}
          </h2>
          <p className="contact-subtitle">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info-wrapper">
            <div className="contact-info-section">
              <h3 className="contact-section-title">
                <MessageCircle className="h-6 w-6" />
                {t.contact.info.title}
              </h3>
              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="contact-card">
                    <CardContent className="contact-card-content">
                      <div className="contact-card-icon">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="contact-card-title">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="contact-card-detail">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="contact-info-section">
              <h3 className="contact-section-title">
                {t.contact.info.social}
              </h3>
              <div className="contact-social-grid">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="contact-social-link group"
                  >
                    <div className="contact-social-icon">
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <p className="contact-social-name">
                        {social.name}
                      </p>
                      <p className="contact-social-handle">
                        {social.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <Card className="contact-form-card">
              <CardContent className="contact-form-content">
                <h3 className="contact-form-title">
                  <Send className="h-6 w-6" />
                  {t.contact.form.title}
                </h3>
                <form className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-field">
                      <label>
                        {t.contact.form.nameRequired}
                      </label>
                      <Input
                        placeholder={t.contact.form.namePlaceholder}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="contact-form-field">
                      <label>
                        {t.contact.form.emailRequired}
                      </label>
                      <Input
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-form-field">
                      <label>
                        {t.contact.form.phone}
                      </label>
                      <Input
                        placeholder={t.contact.form.phonePlaceholder}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="contact-form-field">
                      <label>
                        {t.contact.form.subject}
                      </label>
                      <Input
                        placeholder={t.contact.form.subjectPlaceholder}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <label>
                      {t.contact.form.messageRequired}
                    </label>
                    <Textarea
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={6}
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <div className="contact-form-checkbox">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1 w-4 h-4 border-gray-300 rounded ieee-accent-color"
                    />
                    <label htmlFor="privacy">
                      {t.contact.form.privacy}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-white rounded-xl py-3 font-medium transition-all duration-200 ieee-gradient-button"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {t.contact.form.send}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="contact-map-wrapper">
          <Card className="contact-map-card">
            <div className={isDark ? "map-dark-mode" : ""}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5858!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc3fd16c128503%3A0x3667dcedef4ac11c!2sEskisehir%20Technical%20University!5e0!3m2!1str!2str!4v1635000000000"
                width="100%"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contact-map-iframe"
              ></iframe>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}