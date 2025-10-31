import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Building2 } from 'lucide-react';

export function Sponsors() {
  const { t } = useLanguage();

  return (
    <section id="sponsors" className="py-20 bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.sponsors.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.sponsors.subtitle}
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800/50">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t.language === 'tr' ? 'Sponsorlarımız Yakında Burada Olacak' : 'Our Sponsors Will Be Here Soon'}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t.language === 'tr' 
                  ? 'Şu anda aktif sponsorumuz bulunmamaktadır. İşbirliği fırsatları için bizimle iletişime geçebilirsiniz.'
                  : 'We currently do not have any active sponsors. You can contact us for collaboration opportunities.'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Partnership CTA */}
        <div className="mt-16">
          <div className="sponsors-callout-box">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t.sponsors.partnership.title}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.sponsors.partnership.description}
            </p>
            <a href="#contact">
              <Button 
                size="lg"
                className="ieee-gradient-button text-white hover:opacity-90 px-8 py-3 rounded-xl font-medium transition-opacity duration-200"
              >
                {t.sponsors.partnership.button}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
