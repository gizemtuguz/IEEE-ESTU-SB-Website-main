import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Linkedin, Mail, Github } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import AhmetImage from "../assets/ahmet.jpeg";
import AlpImage from "../assets/alp.jpeg";
import EfeImage from "../assets/efe.jpeg";
import EzgiImage from "../assets/ezgi.jpeg";
import KaanImage from "../assets/kaan.jpeg";
import KatreImage from "../assets/katre.jpeg";
import KutayImage from "../assets/kutay.jpeg";
import SelinImage from "../assets/selin.jpeg";
import SenayImage from "../assets/senay.jpeg";
import SilaImage from "../assets/sıla.jpeg";
import GizemImage from "../assets/gizem.png";
import HuseyinImage from "../assets/huseyin.jpg";
import MahmutImage from "../assets/mahmut.png";
import MeryemImage from "../assets/meryem.png";

interface TeamMemberData {
  tr: {
    name: string;
    position: string;
    department: string;
    bio: string;
  };
  en: {
    name: string;
    position: string;
    department: string;
    bio: string;
  };
  image: string;
  section:
    | "boardOfDirectors"
    | "administrativeBoard"
    | "auditBoard";
}

export function Team() {
  const { t, language } = useLanguage();

  const teamMembers: TeamMemberData[] = [
    // Yönetim Kurulumuz (4 kişi)
    {
      tr: {
        name: "Gizem Tuğuz",
        position: "Yönetim Kurulu Başkanı",
        department: "Bilgisayar Mühendisliği",
        bio: "Tüm strateji, iletişim, koordinasyon",
      },
      en: {
        name: "Gizem Tuğuz",
        position: "President",
        department: "Computer Engineering",
        bio: "Strategy, communication, coordination",
      },
      image: GizemImage,
      section: "boardOfDirectors",
    },
    {
      tr: {
        name: "Hüseyin Özçınar",
        position: "Yönetim Kurulu Başkan Yrd.",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "Takımlardan destek, organizasyon",
      },
      en: {
        name: "Hüseyin Özcınar",
        position: "Vice President",
        department: "Electrical & Electronics Engineering",
        bio: "Team support, organization",
      },
      image: HuseyinImage,
      section: "boardOfDirectors",
    },
    {
      tr: {
        name: "Sıla Alhan",
        position: "Sayman",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "Mali işler, bütçe, harcama takibi",
      },
      en: {
        name: "Sıla Alhan",
        position: "Treasurer",
        department: "Electrical & Electronics Engineering",
        bio: "Financial matters, budget, expense tracking",
      },
      image: SilaImage,
      section: "boardOfDirectors",
    },
    {
      tr: {
        name: "Ahmet Hakan Erdur",
        position: "Genel Sekreter",
        department: "Makine Mühendisliği",
        bio: "Yazışmalar, tutanaklar, arşiv",
      },
      en: {
        name: "Ahmet Hakan Erdur",
        position: "General Secretary",
        department: "Mechanical Engineering",
        bio: "Correspondence, minutes, archive",
      },
      image: AhmetImage,
      section: "boardOfDirectors",
    },
    // İdari Kurulumuz (7 kişi)
    {
      tr: {
        name: "Efe Aral",
        position: "AESS Komite Başkanı",
        department: "Uçak Mühendisliği",
        bio: "Havacılık ve elektronik sistemler",
      },
      en: {
        name: "Efe Aral",
        position: "AESS Committee Chair",
        department: "Aeronautical Engineering",
        bio: "Aviation and electronic systems",
      },
      image: EfeImage,
      section: "administrativeBoard",
    },
    {
      tr: {
        name: "Kutay Demirel",
        position: "ComSoc Komite Başkanı",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "Haberleşme ve ağ teknolojileri",
      },
      en: {
        name: "Kutay Demirel",
        position: "ComSoc Committee Chair",
        department: "Electrical & Electronics Engineering",
        bio: "Communication and network technologies",
      },
      image: KutayImage,
      section: "administrativeBoard",
    },
    {
      tr: {
        name: "Alp Karınca",
        position: "CS Komite Başkanı",
        department: "Bilgisayar Mühendisliği",
        bio: "Yazılım ve bilgisayar bilimleri",
      },
      en: {
        name: "Alp Karınca",
        position: "CS Committee Chair",
        department: "Computer Engineering",
        bio: "Software and computer sciences",
      },
      image: AlpImage,
      section: "administrativeBoard",
    },
    {
      tr: {
        name: "Ahmet Kaan Can",
        position: "PES Komite Başkanı",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "Enerji sistemleri ve güç elektroniği",
      },
      en: {
        name: "Ahmet Kaan Can",
        position: "PES Committee Chair",
        department: "Electrical & Electronics Engineering",
        bio: "Energy systems and power electronics",
      },
      image: KaanImage,
      section: "administrativeBoard",
    },
    {
      tr: {
        name: "Şenay Doğan",
        position: "WIE Affinity Group Başkanı",
        department: "Çevre Mühendisliği",
        bio: "Kadınların mühendislikte temsili",
      },
      en: {
        name: "Şenay Doğan",
        position: "WIE Affinity Group Chair",
        department: "Environmental Engineering",
        bio: "Women's representation in engineering",
      },
      image: SenayImage,
      section: "administrativeBoard",
    },
    {
      tr: {
        name: "Mahmut Kırgıl",
        position: "KÖK Koordinatörü",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "Organizasyon ve koordinasyon",
      },
      en: {
        name: "Mahmut Kırgıl",
        position: "KÖK Coordinator",
        department: "Electrical & Electronics Engineering",
        bio: "Organization and coordination",
      },
      image: MahmutImage,
      section: "administrativeBoard",
    },
    {
      tr: {
        name: "Meryem Bilgiç",
        position: "PR Koordinatörü",
        department: "Bulut Bilişim Operatörlüğü",
        bio: "İletişim, sosyal medya, tasarım",
      },
      en: {
        name: "Meryem Bilgiç",
        position: "PR Coordinator",
        department: "Cloud Computing Operatoring",
        bio: "Communication, social media, design",
      },
      image: MeryemImage,
      section: "administrativeBoard",
    },
    // Denetim Kurulumuz (3 kişi)
    {
      tr: {
        name: "Ezgi Güner",
        position: "Denetim Kurulu Üyesi",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "İç denetim",
      },
      en: {
        name: "Ezgi Güner",
        position: "Audit Board Member",
        department: "Electrical & Electronics Engineering",
        bio: "Internal audit",
      },
      image: EzgiImage,
      section: "auditBoard",
    },
    {
      tr: {
        name: "Katre Azra Yıldırım",
        position: "Denetim Kurulu Üyesi",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "İç denetim",
      },
      en: {
        name: "Katre Azra Yıldırım",
        position: "Audit Board Member",
        department: "Electrical & Electronics Engineering",
        bio: "Internal audit",
      },
      image: KatreImage,
      section: "auditBoard",
    },
    {
      tr: {
        name: "Selin Gül Kurt",
        position: "Denetim Kurulu Üyesi",
        department: "Elektrik & Elektronik Mühendisliği",
        bio: "İç denetim",
      },
      en: {
        name: "Selin Gül Kurt",
        position: "Audit Board Member",
        department: "Electrical & Electronics Engineering",
        bio: "Internal audit",
      },
      image: SelinImage,
      section: "auditBoard",
    },
  ];

  const getPositionColor = (position: string) => {
    if (
      position.includes("Başkan") ||
      position.includes("President") ||
      position.includes("Chair")
    )
      return "ieee-bg-primary text-white";
    if (
      position.includes("Koordinatör") ||
      position.includes("Coordinator")
    )
      return "bg-green-600 dark:bg-green-700 text-white";
    return "bg-gray-600 dark:bg-gray-700 text-white";
  };

  const renderSection = (
    sectionKey:
      | "boardOfDirectors"
      | "administrativeBoard"
      | "auditBoard",
    title: string,
  ) => {
    const members = teamMembers.filter(
      (member) => member.section === sectionKey,
    );

    return (
      <div key={sectionKey} className="mb-20">
        <h3
          className="text-2xl md:text-3xl font-bold text-center mb-12 ieee-text-primary"
        >
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto justify-items-center">
          {members.map((member, index) => {
            const memberData =
              language === "tr" ? member.tr : member.en;

            return (
              <Card
                key={index}
                className="modern-card team-card group overflow-hidden w-full max-w-sm"
              >
                {/* Profile Image Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={memberData.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                </div>

                <CardContent className="about-feature-card-content flex flex-col gap-4 text-left">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {memberData.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {memberData.department}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-primary leading-relaxed">
                    {memberData.position}
                  </p>

                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-[var(--primary-color)] hover:text-white dark:hover:bg-[var(--primary-color)] dark:hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="w-9 h-9 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-[var(--primary-color)] hover:text-white dark:hover:bg-[var(--primary-color)] dark:hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="w-9 h-9 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-[var(--primary-color)] hover:text-white dark:hover:bg-[var(--primary-color)] dark:hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200">
                      <Github className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section
      id="team"
      className="py-20 bg-gray-100 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.team.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.team.subtitle}
          </p>
        </div>

        {/* Yönetim Kurulumuz / Board of Directors */}
        {renderSection(
          "boardOfDirectors",
          t.team.sections.boardOfDirectors,
        )}

        {/* İdari Kurulumuz / Administrative Board */}
        {renderSection(
          "administrativeBoard",
          t.team.sections.administrativeBoard,
        )}

        {/* Denetim Kurulumuz / Audit Board */}
        {renderSection(
          "auditBoard",
          t.team.sections.auditBoard,
        )}

        {/* Call to Action */}
        <div className="mt-16">
          <div className="team-cta-box">
            <h3 className="team-cta-title">
              {t.team.join}
            </h3>
            <p className="team-cta-description">
              {t.team.joinDescription}
            </p>
            <a href="/membership">
              <Button 
                size="lg"
                className="ieee-gradient-button text-white hover:opacity-90 px-8 py-3 rounded-xl font-medium transition-opacity duration-200"
              >
                {t.team.joinButton}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
