import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Users,
  Lightbulb,
  Rocket,
  Trophy,
  Languages,
  CalendarDays,
  UserPlus,
} from "lucide-react";
import { Separator } from "./components/ui/separator";
import { translations, Language } from "./translations";
import { toast } from "sonner@2.0.3";
import ieeeLogo from "./assets/logo.png";
import ieeeIcon from "./assets/logo_mobil.png";

export default function MembershipPage() {
  const [language, setLanguage] = useState<Language>("tr");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    department: "",
    year: "",
    whyJoin: "",
    skills: "",
    interests: [] as string[],
    agreeTerms: false,
  });

  // Get translations for current language
  const t = translations[language];

  useEffect(() => {
    // Check localStorage for language preference
    const savedLanguage = localStorage.getItem(
      "language",
    ) as Language;
    if (
      savedLanguage &&
      (savedLanguage === "tr" || savedLanguage === "en")
    ) {
      setLanguage(savedLanguage);
    }

    // Check localStorage for dark mode preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);


  const toggleLanguage = () => {
    const newLanguage: Language =
      language === "tr" ? "en" : "tr";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (
    interest: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error(
        language === "tr"
          ? "Devam etmek için şartları kabul etmelisiniz."
          : "You must accept the terms to continue.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      toast.success(
        language === "tr"
          ? "Üyelik başvurunuz başarıyla alındı!"
          : "Your membership application has been submitted successfully!",
      );

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          studentId: "",
          department: "",
          year: "",
          whyJoin: "",
          skills: "",
          interests: [],
          agreeTerms: false,
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error(
        language === "tr"
          ? "Bir hata oluştu. Lütfen tekrar deneyin."
          : "An error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: t.membershipPage.benefits.items[0].title,
      description:
        t.membershipPage.benefits.items[0].description,
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t.membershipPage.benefits.items[1].title,
      description:
        t.membershipPage.benefits.items[1].description,
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: t.membershipPage.benefits.items[2].title,
      description:
        t.membershipPage.benefits.items[2].description,
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: t.membershipPage.benefits.items[3].title,
      description:
        t.membershipPage.benefits.items[3].description,
    },
  ];

const interestOptions =
  language === "tr"
    ? [
        "Workshop & Seminerler",
          "Yazılım Geliştirme",
          "Elektronik & Donanım",
          "Yapay Zeka & Makine Öğrenmesi",
          "Web & Mobil Geliştirme",
          "Robotik",
          "Yarışmalar",
          "Sosyal Etkinlikler",
        ]
      : [
          "Workshops & Seminars",
          "Software Development",
          "Electronics & Hardware",
          "AI & Machine Learning",
          "Web & Mobile Development",
          "Robotics",
          "Competitions",
          "Social Events",
      ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="w-full px-2 lg:px-4">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="hidden lg:flex items-center">
                <img
                  src={ieeeLogo}
                  alt="IEEE Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex lg:hidden items-center">
                <img
                  src={ieeeIcon}
                  alt="IEEE Icon"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div className="hidden lg:block leading-tight">
                <h1 className="text-base font-semibold text-primary whitespace-nowrap">
                  IEEE ESTU
                </h1>
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  Membership Program
                </p>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 ml-auto">
                <Button
                  asChild
                  size="default"
                  className="text-white rounded-lg bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 flex-shrink-0"
                >
                  <a href="/events" className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {language === "tr" ? "Etkinlikler" : "Events"}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/")}
                  className="rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="ml-2 text-sm">
                    {language === "tr" ? "Ana Sayfa" : "Home"}
                  </span>
                </Button>
                <button
                  onClick={toggleLanguage}
                  className="h-9 px-3 rounded-lg bg-accent hover:bg-muted flex items-center gap-1 transition-colors duration-200"
                  aria-label="Change language"
                >
                  <Languages className="h-4 w-4 text-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {language.toUpperCase()}
                  </span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="w-9 h-9 rounded-lg bg-accent hover:bg-muted flex items-center justify-center transition-colors duration-200"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-foreground" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground" />
                  )}
                </button>
              </div>
              <div className="lg:hidden flex items-center gap-1.5 ml-auto">
              <Button
                asChild
                size="sm"
                className="rounded-lg bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white h-10 px-3 text-xs flex-shrink-0"
              >
                <a href="/events">
                  {language === "tr" ? "Etkinlikler" : "Events"}
                </a>
              </Button>
              <button
                onClick={toggleLanguage}
                className="h-10 px-3 rounded-lg bg-accent hover:bg-muted flex items-center gap-1 transition-colors duration-200 text-sm"
                aria-label="Change language"
              >
                <Languages className="h-4 w-4 text-foreground" />
                {language.toUpperCase()}
              </button>
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-lg bg-accent hover:bg-muted flex items-center justify-center transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-[960px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {t.membershipPage.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2">
              {t.membershipPage.subtitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.membershipPage.description}
            </p>
          </div>

          {/* Benefits as Info Cards */}
          <section id="membership-overview" className="mb-12">
            <div className="max-w-5xl mx-auto px-2 sm:px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg dark:hover:shadow-primary-20 dark:hover:ring-1 dark:hover:ring-primary-50 transition-shadow duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950"
                  >
                  <CardContent className="p-6 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 mx-auto bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center text-[var(--primary-color)] dark:text-white">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>

        {/* Form Section */}
        <section id="membership-form" className="max-w-5xl mx-auto mb-12">
          <Card className="shadow-xl border-0 rounded-2xl bg-white dark:bg-gray-800">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                  {t.membershipPage.formSection.title}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {t.membershipPage.formSection.description}
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-16 w-16 mb-4 ieee-icon-primary" />
                  <h3 className="text-2xl font-bold mb-2">
                    {language === "tr" ? "Başvurunuz Alındı!" : "Application Received!"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                    {language === "tr"
                      ? "Üyelik başvurunuz başarıyla alındı. En kısa sürede size e-posta ile dönüş yapacağız."
                      : "Your membership application has been successfully received. We will get back to you via email shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 ieee-text-primary dark:text-[#60a5fa]">
                      {language === "tr" ? "Kişisel Bilgiler" : "Personal Information"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          {language === "tr" ? "Ad Soyad *" : "Full Name *"}
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="rounded-xl dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
                          placeholder={language === "tr" ? "Adınız ve soyadınız" : "Your full name"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {language === "tr" ? "E-posta *" : "Email *"}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="rounded-xl dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
                          placeholder={language === "tr" ? "ornek@estu.edu.tr" : "example@estu.edu.tr"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {language === "tr" ? "Telefon *" : "Phone *"}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="rounded-xl dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentId">
                          {language === "tr" ? "Öğrenci No *" : "Student ID *"}
                        </Label>
                        <Input
                          id="studentId"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          required
                          className="rounded-xl dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
                          placeholder="20XXXXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Academic Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)] dark:text-[#60a5fa]">
                      {language === "tr" ? "Akademik Bilgiler" : "Academic Information"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">
                          {language === "tr" ? "Bölüm *" : "Department *"}
                        </Label>
                        <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)} required>
                          <SelectTrigger className="rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:[&>span]:text-gray-400">
                            <SelectValue placeholder={language === "tr" ? "Bölümünüzü seçin" : "Select your department"} />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                            <SelectItem value="computer">
                              {language === "tr" ? "Bilgisayar Mühendisliği" : "Computer Engineering"}
                            </SelectItem>
                            <SelectItem value="electrical">
                              {language === "tr" ? "Elektrik & Elektronik Mühendisliği" : "Electrical & Electronics Engineering"}
                            </SelectItem>
                            <SelectItem value="mechanical">
                              {language === "tr" ? "Makine Mühendisliği" : "Mechanical Engineering"}
                            </SelectItem>
                            <SelectItem value="aeronautical">
                              {language === "tr" ? "Uçak Mühendisliği" : "Aeronautical Engineering"}
                            </SelectItem>
                            <SelectItem value="environmental">
                              {language === "tr" ? "Çevre Mühendisliği" : "Environmental Engineering"}
                            </SelectItem>
                            <SelectItem value="other">
                              {language === "tr" ? "Diğer" : "Other"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">
                          {language === "tr" ? "Sınıf *" : "Year *"}
                        </Label>
                        <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)} required>
                          <SelectTrigger className="rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:[&>span]:text-gray-400">
                            <SelectValue placeholder={language === "tr" ? "Sınıfınızı seçin" : "Select your year"} />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800">
                            <SelectItem value="1">
                              {language === "tr" ? "1. Sınıf" : "1st Year"}
                            </SelectItem>
                            <SelectItem value="2">
                              {language === "tr" ? "2. Sınıf" : "2nd Year"}
                            </SelectItem>
                            <SelectItem value="3">
                              {language === "tr" ? "3. Sınıf" : "3rd Year"}
                            </SelectItem>
                            <SelectItem value="4">
                              {language === "tr" ? "4. Sınıf" : "4th Year"}
                            </SelectItem>
                            <SelectItem value="graduate">
                              {language === "tr" ? "Yüksek Lisans" : "Graduate"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Interests & Skills */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)] dark:text-[#60a5fa]">
                      {language === "tr" ? "İlgi Alanları & Yetenekler" : "Interests & Skills"}
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>
                          {language === "tr"
                            ? "İlgilendiğiniz alanları seçin *"
                            : "Select areas you are interested in *"}
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {interestOptions.map((interest) => (
                            <div
                              key={interest}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:border-[var(--primary-color)] transition-colors bg-white dark:bg-gray-700"
                            >
                              <Checkbox
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onCheckedChange={(checked) =>
                                  handleInterestChange(interest, checked as boolean)
                                }
                                className="h-5 w-5 data-[state=checked]:bg-white data-[state=checked]:border-[var(--primary-color)] data-[state=checked]:text-[var(--primary-color)] dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-[var(--primary-color)] dark:data-[state=checked]:text-[var(--primary-color)]"
                              />
                              <label
                                htmlFor={interest}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                              >
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills">
                          {language === "tr"
                            ? "Becerileriniz (Opsiyonel)"
                            : "Your Skills (Optional)"}
                        </Label>
                        <Textarea
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          className="rounded-xl min-h-[100px] dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
                          placeholder={
                            language === "tr"
                              ? "Sahip olduğunuz programlama dilleri, araçlar veya diğer beceriler..."
                              : "Programming languages, tools, or other skills you have..."
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whyJoin">
                          {language === "tr"
                            ? "Neden IEEE'ye katılmak istiyorsunuz? *"
                            : "Why do you want to join IEEE? *"}
                        </Label>
                        <Textarea
                          id="whyJoin"
                          name="whyJoin"
                          value={formData.whyJoin}
                          onChange={handleInputChange}
                          required
                          className="rounded-xl min-h-[120px] dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
                          placeholder={
                            language === "tr"
                              ? "IEEE ESTU'ya katılma motivasyonunuzu ve hedeflerinizi paylaşın..."
                              : "Share your motivation and goals for joining IEEE ESTU..."
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3 p-4 rounded-xl border border-transparent hover:border-[var(--primary-color)] dark:hover:border-[var(--primary-color)] transition-colors">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeTerms: checked as boolean,
                        }))
                      }
                      required
                      className="h-5 w-5 dark:border-gray-400 data-[state=checked]:bg-white data-[state=checked]:border-[var(--primary-color)] data-[state=checked]:text-[var(--primary-color)] dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-[var(--primary-color)] dark:data-[state=checked]:text-[var(--primary-color)]"
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="text-sm font-semibold italic leading-relaxed cursor-pointer text-gray-800 dark:text-gray-200 flex-1"
                    >
                      {language === "tr"
                        ? "IEEE ESTU Öğrenci Kolu üyelik şartlarını ve kişisel verilerimin işlenmesine dair koşulları kabul ediyorum. *"
                        : "I accept the IEEE ESTU Student Branch membership terms and conditions for processing my personal data. *"}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="ieee-button-primary hover:opacity-90 transition-opacity text-white px-8 py-3 rounded-xl font-medium duration-200 shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {language === "tr" ? "Gönderiliyor..." : "Submitting..."}
                        </>
                      ) : (
                        <>
                          {language === "tr" ? "Başvuruyu Gönder" : "Submit Application"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Contact Info */}
        <section id="membership-contact" className="max-w-5xl mx-auto mb-12">
          <Card className="rounded-2xl border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold mb-2">
                {t.membershipPage.contact.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.membershipPage.contact.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="mailto:ieee@estu.edu.tr"
                  className="text-primary hover:underline font-medium ieee-link"
                >
                  ieee@estu.edu.tr
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="tel:+902223350580"
                  className="text-primary hover:underline font-medium ieee-link"
                >
                  +90 222 335 05 80
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center ieee-bg-primary"
                >
                  <span className="text-white text-xl font-bold">
                    I
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    IEEE ESTU Student Branch
                  </h3>
                  <p className="text-gray-300 dark:text-blue-200 text-sm">
                    {t.footer.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-gray-200 dark:text-blue-100 leading-relaxed mb-6 max-w-md">
                {t.footer.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-200 dark:text-blue-100">
                  <Mail
                    className="h-4 w-4 mr-3 ieee-icon-primary"
                  />
                  <span className="text-sm">
                    ieee@estu.edu.tr
                  </span>
                </div>
                <div className="flex items-center text-gray-200 dark:text-blue-100">
                  <Phone
                    className="h-4 w-4 mr-3 ieee-icon-primary"
                  />
                  <span className="text-sm">
                    +90 222 335 05 80
                  </span>
                </div>
                <div className="flex items-start text-gray-200 dark:text-blue-100">
                  <MapPin
                    className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0 ieee-icon-primary"
                  />
                  <span className="text-sm">
                    ESTU Mühendislik Fakültesi
                    <br />
                    26555 Tepebaşı/Eskişehir
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links & Resources Combined */}
            <div className="md:col-span-2 lg:col-span-2 flex flex-col">
              <div className="grid grid-cols-2 gap-8">
                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-6">
                    {t.footer.quickLinks}
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/#about"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block transition-transform"
                      >
                        {t.footer.links.about}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#team"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block transition-transform"
                      >
                        {t.footer.links.team}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#events"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block transition-transform"
                      >
                        {t.footer.links.events}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#contact"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block transition-transform"
                      >
                        {t.footer.links.contact}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-lg font-semibold mb-6">
                    {t.footer.resources}
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transition-transform flex items-center"
                      >
                        {t.footer.links.ieeeGlobal}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transition-transform flex items-center"
                      >
                        {t.footer.links.ieeeTurkey}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transition-transform flex items-center"
                      >
                        {t.footer.links.estu}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/#sponsors"
                        className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transition-transform flex items-center"
                      >
                        {t.footer.links.sponsorship}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Social Media - Centered */}
              <div className="mt-8 flex flex-col items-center w-full">
                <h5 className="font-medium mb-4">
                  {t.footer.social}
                </h5>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-[var(--primary-color)] rounded-xl flex items-center justify-center transition-all duration-200 group"
                    title="Instagram"
                  >
                    <span className="text-gray-200 dark:text-blue-200 group-hover:text-white transition-colors duration-200">
                      <Instagram className="h-5 w-5" />
                    </span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-[var(--primary-color)] rounded-xl flex items-center justify-center transition-all duration-200 group"
                    title="LinkedIn"
                  >
                    <span className="text-gray-200 dark:text-blue-200 group-hover:text-white transition-colors duration-200">
                      <Linkedin className="h-5 w-5" />
                    </span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-[var(--primary-color)] rounded-xl flex items-center justify-center transition-all duration-200 group"
                    title="Twitter"
                  >
                    <span className="text-gray-200 dark:text-blue-200 group-hover:text-white transition-colors duration-200">
                      <Twitter className="h-5 w-5" />
                    </span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-[var(--primary-color)] rounded-xl flex items-center justify-center transition-all duration-200 group"
                    title="GitHub"
                  >
                    <span className="text-gray-200 dark:text-blue-200 group-hover:text-white transition-colors duration-200">
                      <Github className="h-5 w-5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 p-4 sm:p-6 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10">
            <div className="w-full">
              <h4 className="font-semibold mb-2">
                {t.footer.newsletter.title}
              </h4>
              <p className="text-gray-200 dark:text-blue-100 text-sm mb-4">
                {t.footer.newsletter.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  className="w-full sm:flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 dark:placeholder-blue-200 focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-primary-30 text-sm transition-all duration-200"
                />
                <Button
                  size="sm"
                  className="w-full sm:w-auto text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap ieee-button-primary"
                >
                  {t.footer.newsletter.subscribe}
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <Separator className="my-8 bg-white/10" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-200 dark:text-blue-100">
              © {new Date().getFullYear()} IEEE ESTU Student
              Branch. {t.footer.rights}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200"
              >
                {t.footer.privacy}
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="#"
                className="text-gray-200 dark:text-blue-100 hover:text-white transition-colors duration-200"
              >
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
