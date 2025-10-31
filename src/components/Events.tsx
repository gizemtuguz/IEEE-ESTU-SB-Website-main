import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface EventData {
  tr: {
    title: string;
    location: string;
    category: string;
    description: string;
    participants: string;
    status: string;
  };
  en: {
    title: string;
    location: string;
    category: string;
    description: string;
    participants: string;
    status: string;
  };
  date: string;
  time: string;
  image: string;
}

export function Events() {
  const { t, language } = useLanguage();

  const upcomingEvents: EventData[] = [
    {
      tr: {
        title: "Yapay Zeka ve Machine Learning Workshop'u",
        location: "ESTU Teknoloji Merkezi",
        category: "Workshop",
        description:
          "Python ile machine learning algoritmalarına giriş. Hands-on projelerle öğrenme deneyimi.",
        participants: "45 kişi",
        status: "Kayıt Açık",
      },
      en: {
        title:
          "Artificial Intelligence and Machine Learning Workshop",
        location: "ESTU Technology Center",
        category: "Workshop",
        description:
          "Introduction to machine learning algorithms with Python. Hands-on learning experience with projects.",
        participants: "45 people",
        status: "Registration Open",
      },
      date: "2025-09-15",
      time: "14:00 - 17:00",
      image:
        "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBzdHVkZW50c3xlbnwxfHx8fDE3NTcyNDYzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      tr: {
        title: "IEEE Xtreme 18.0 Programlama Yarışması",
        location: "ESTU Bilgisayar Laboratuvarları",
        category: "Yarışma",
        description:
          "24 saatlik küresel programlama yarışması. Takım halinde algoritmik problemler çözme.",
        participants: "120 kişi",
        status: "Yakında",
      },
      en: {
        title: "IEEE Xtreme 18.0 Programming Competition",
        location: "ESTU Computer Laboratories",
        category: "Competition",
        description:
          "24-hour global programming competition. Solving algorithmic problems in teams.",
        participants: "120 people",
        status: "Coming Soon",
      },
      date: "2025-10-26",
      time: "00:01 - 23:59",
      image:
        "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBjb21wZXRpdGlvbiUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NTcxODg4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const pastEvents: EventData[] = [
    {
      tr: {
        title: "Blockchain ve Kripto Para Semineri",
        location: "ESTU Konferans Salonu",
        category: "Seminer",
        description:
          "Blockchain teknolojisinin temelleri ve gelecek projeksiyonları üzerine uzman konuşmacı sunumu.",
        participants: "80 kişi",
        status: "Tamamlandı",
      },
      en: {
        title: "Blockchain and Cryptocurrency Seminar",
        location: "ESTU Conference Hall",
        category: "Seminar",
        description:
          "Expert speaker presentation on the fundamentals of blockchain technology and future projections.",
        participants: "80 people",
        status: "Completed",
      },
      date: "2025-08-20",
      time: "19:00 - 21:00",
      image:
        "https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbmZlcmVuY2UlMjBzZW1pbmFyfGVufDF8fHx8MTc1NzI0NjM5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      tr: {
        title: "Robotik ve Otomasyon Proje Günü",
        location: "ESTU Mühendislik Fakültesi",
        category: "Proje Günü",
        description:
          "Öğrenci projelerinin sergilendiği ve teknik sunumların yapıldığı özel etkinlik.",
        participants: "65 kişi",
        status: "Tamamlandı",
      },
      en: {
        title: "Robotics and Automation Project Day",
        location: "ESTU Engineering Faculty",
        category: "Project Day",
        description:
          "Special event where student projects are exhibited and technical presentations are held.",
        participants: "65 people",
        status: "Completed",
      },
      date: "2025-07-10",
      time: "10:00 - 16:00",
      image:
        "https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9uJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU3MjQ2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const getCategoryColor = (category: string) => {
    const categoryKey = category
      .toLowerCase()
      .replace(/\s+/g, "");
    switch (categoryKey) {
      case "workshop":
        return "event-category-workshop";
      case "yarışma":
      case "competition":
        return "event-category-competition";
      case "seminer":
      case "seminar":
        return "event-category-seminar";
      case "projegünü":
      case "projectday":
        return "event-category-project";
      default:
        return "event-category-workshop";
    }
  };

  const getStatusColor = (status: string) => {
    const statusKey = status.toLowerCase().replace(/\s+/g, "");
    switch (statusKey) {
      case "kayıtaçık":
      case "registrationopen":
        return "event-status-open";
      case "yakında":
      case "comingsoon":
        return "event-status-soon";
      case "tamamlandı":
      case "completed":
        return "event-status-completed";
      default:
        return "event-status-completed";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === "tr" ? "tr-TR" : "en-US";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const EventCard = ({
    event,
    isUpcoming = true,
  }: {
    event: EventData;
    isUpcoming?: boolean;
  }) => {
    const eventData = language === "tr" ? event.tr : event.en;

    return (
      <Card className=" event-card">
        <div className="event-card-image-wrapper">
          {/* Responsive Image Container */}
          <div className="event-card-image-container">
            <img
              src={event.image}
              alt={eventData.title}
              className="event-card-image"
            />
          </div>
        </div>

        <CardContent className="about-feature-card-content">
          <h3 className="event-card-title">
            {eventData.title}
          </h3>

          <div className="event-card-info">
            <div className="event-card-info-item">
              <Calendar className="event-card-info-icon" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="event-card-info-item">
              <Clock className="event-card-info-icon" />
              <span>{event.time}</span>
            </div>
            <div className="event-card-info-item">
              <MapPin className="event-card-info-icon" />
              <span>{eventData.location}</span>
            </div>
          </div>

          <p className="event-card-description">
            {eventData.description}
          </p>

          {isUpcoming && (
            <div className="event-card-buttons">
              <Button
                className="event-card-button event-card-apply-button"
                size="sm"
                asChild
              >
                <a href="/events/apply">
                  {t.events.applyButton}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      id="events"
      className="events-section"
    >
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-title">
            {t.events.title}
          </h2>
          <p className="events-subtitle">
            {t.events.subtitle}
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="events-section-wrapper">
          <h3 className="events-section-title">
            {t.events.upcoming}
          </h3>
          <div className="events-grid">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={`upcoming-${index}`}
                event={event}
                isUpcoming={true}
              />
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="events-section-wrapper">
          <h3 className="events-section-title">
            {t.events.past}
          </h3>
          <div className="events-grid">
            {pastEvents.map((event, index) => (
              <EventCard
                key={`past-${index}`}
                event={event}
                isUpcoming={false}
              />
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="events-newsletter-box">
          <CardContent className="p-8">
            <h3 className="events-newsletter-title">
              {t.events.newsletter.title}
            </h3>
            <p className="events-newsletter-description">
              {t.events.newsletter.description}
            </p>
            <Button
              size="lg"
              className="events-newsletter-button"
            >
              {t.events.newsletter.button}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
