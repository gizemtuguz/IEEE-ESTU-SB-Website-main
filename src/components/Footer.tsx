import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Github, ExternalLink, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';
import { api } from '../lib/api';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const quickLinks = [
    { name: t.footer.links.about, href: '#about' },
    { name: t.footer.links.team, href: '#team' },
    { name: t.footer.links.events, href: '#events' },
    { name: t.footer.links.contact, href: '#contact' }
  ];

  const resources = [
    { name: t.footer.links.ieeeGlobal, href: '#', external: true },
    { name: t.footer.links.ieeeTurkey, href: '#', external: true },
    { name: t.footer.links.estu, href: '#', external: true },
    { name: t.footer.links.sponsorship, href: '#sponsors' }
  ];

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, name: 'Instagram', href: '#' },
    { icon: <Linkedin className="h-5 w-5" />, name: 'LinkedIn', href: '#' },
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', href: '#' },
    { icon: <Github className="h-5 w-5" />, name: 'GitHub', href: '#' }
  ];

  const handleSubscribe = async () => {
    if (!newsletterEmail) {
      toast.error(t.footer.newsletter.error ?? 'Lütfen e-posta adresi girin.');
      return;
    }

    setIsSubscribing(true);
    try {
      await api.subscribeToNewsletter({ email: newsletterEmail });
      toast.success(t.footer.newsletter.success ?? 'Bültene abone oldunuz!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error(t.footer.newsletter.error ?? 'Abonelik sırasında hata oluştu.');
      console.error(error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center ieee-bg-primary">
                <span className="text-white text-xl font-bold">I</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">IEEE ESTU Student Branch</h3>
                <p className="text-gray-300 dark:text-blue-200 text-sm">{t.footer.subtitle}</p>
              </div>
            </div>
            <p className="text-gray-200 dark:text-blue-100 leading-relaxed mb-6 max-w-md">
              {t.footer.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-200 dark:text-blue-100">
                <Mail className="h-4 w-4 mr-3 ieee-icon-primary" />
                <span className="text-sm">ieee@estu.edu.tr</span>
              </div>
              <div className="flex items-center text-gray-200 dark:text-blue-100">
                <Phone className="h-4 w-4 mr-3 ieee-icon-primary" />
                <span className="text-sm">+90 222 335 05 80</span>
              </div>
              <div className="flex items-start text-gray-200 dark:text-blue-100">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0 ieee-icon-primary" />
                <span className="text-sm">ESTU Mühendislik Fakültesi<br />26555 Tepebaşı/Eskişehir</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Resources Combined */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col">
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">{t.footer.quickLinks}</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block transition-transform"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-lg font-semibold mb-6">{t.footer.resources}</h4>
                <ul className="space-y-3">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.href}
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transition-transform flex items-center"
                      >
                        {resource.name}
                        {resource.external && <ExternalLink className="h-3 w-3 ml-1" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Media - Centered */}
            <div className="mt-8 flex flex-col items-center w-full">
              <h5 className="font-medium mb-4">{t.footer.social}</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-[var(--primary-color)] rounded-xl flex items-center justify-center transition-all duration-200 group"
                    title={social.name}
                  >
                    <span className="text-gray-200 dark:text-blue-200 group-hover:text-white transition-colors duration-200">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-4 sm:p-6 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10">
          <div className="w-full">
            <h4 className="font-semibold mb-2">{t.footer.newsletter.title}</h4>
            <p className="text-gray-200 dark:text-blue-100 text-sm mb-4">
              {t.footer.newsletter.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder={t.footer.newsletter.placeholder}
                className="w-full sm:flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 dark:placeholder-blue-200 focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-primary-30 text-sm transition-all duration-200"
              />
              <Button 
                type="button"
                size="sm"
                className="w-full sm:w-auto text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap ieee-button-primary"
                onClick={handleSubscribe}
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.footer.newsletter.subscribing ?? 'Gönderiliyor...'}
                  </>
                ) : (
                  <>{t.footer.newsletter.subscribe}</>
                )}
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-300 dark:text-blue-100 text-sm text-center md:text-left">
            <p>
              © {currentYear} IEEE ESTU Student Branch. {t.footer.rights}
            </p>
            <p className="mt-1">
              {t.footer.madeWith} <span className="text-white">Ledlyy Yazılım Danımanlık</span> {t.footer.madeAt}
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-300 dark:text-blue-100 hover:text-white transition-colors duration-200">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-gray-300 dark:text-blue-100 hover:text-white transition-colors duration-200">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
