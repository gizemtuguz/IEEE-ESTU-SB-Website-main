import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { Building2, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { api } from '../lib/api';

export function Sponsors() {
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    contactName: '',
    organization: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitSponsorshipLead({
        email: formData.email,
        contactName: formData.contactName,
        organization: formData.organization,
      });
      toast.success(
        t.language === 'tr'
          ? 'Teşekkürler! Ekip en kısa sürede sizinle iletişime geçecek.'
          : 'Thank you! Our team will be in touch shortly.'
      );
      setFormData({ email: '', contactName: '', organization: '' });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(
        t.language === 'tr'
          ? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
          : 'Something went wrong. Please try again later.'
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Button 
              size="lg"
              className="ieee-gradient-button text-white hover:opacity-90 px-8 py-3 rounded-xl font-medium transition-opacity duration-200"
              onClick={() => setIsDialogOpen(true)}
            >
              {t.sponsors.partnership.button}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.language === 'tr'
                ? 'Sponsorluk için iletişime geç'
                : 'Request Sponsorship Call'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sponsor-email">E-posta</Label>
              <Input
                id="sponsor-email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="company@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sponsor-name">
                {t.language === 'tr' ? 'İsim' : 'Name'}
              </Label>
              <Input
                id="sponsor-name"
                value={formData.contactName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, contactName: event.target.value }))
                }
                placeholder={t.language === 'tr' ? 'İletişim kişisi' : 'Contact person'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sponsor-organization">
                {t.language === 'tr' ? 'Kurum / Şirket' : 'Organization'}
              </Label>
              <Input
                id="sponsor-organization"
                value={formData.organization}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, organization: event.target.value }))
                }
                placeholder="IEEE Partner"
              />
            </div>
            <Button
              type="submit"
              className="w-full ieee-button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.language === 'tr' ? 'Gönderiliyor...' : 'Submitting...'}
                </>
              ) : (
                t.language === 'tr' ? 'Talep Gönder' : 'Submit Request'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
