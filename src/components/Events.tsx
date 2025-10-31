import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { api } from "../lib/api";
import type { Event } from "../types/api";

export function Events() {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = (await api.getEvents()) as Event[];
        setEvents(data);
      } catch (err) {
        setError((err as Error).message ?? "Etkinlikler yüklenemedi");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEvents();
  }, []);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const partitioned = events.reduce(
      (acc, event) => {
        const start = new Date(event.startDate);
        if (start >= now) {
          acc.upcoming.push(event);
        } else {
          acc.past.push(event);
        }
        return acc;
      },
      { upcoming: [] as Event[], past: [] as Event[] }
    );

    partitioned.upcoming.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    partitioned.past.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    return { upcomingEvents: partitioned.upcoming, pastEvents: partitioned.past };
  }, [events]);

  const getCategoryColor = (category: string) => {
    const categoryKey = category.toLowerCase().replace(/\s+/g, "");
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

  const translationFor = (event: Event) =>
    event.translations[(language as "tr" | "en") ?? "tr"] ?? event.translations.tr;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(
        language === "tr" ? "tr-TR" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
    } catch {
      return dateString;
    }
  };

  const renderEventCard = (event: Event) => {
    const translation = translationFor(event);
    return (
      <Card key={event._id} className="event-card group">
        <div className="event-card-image-wrapper">
          {event.coverImage && (
            <img
              src={event.coverImage}
              alt={translation.title}
              className="event-card-image"
            />
          )}
        </div>
        <CardContent className="event-card-content">
          <h3 className="event-card-title">{translation.title}</h3>
          <p className="event-card-description">{translation.description}</p>

          <div className="event-card-meta">
            <div className="event-card-meta-item">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            {event.startTime && (
              <div className="event-card-meta-item">
                <Clock className="h-4 w-4" />
                <span>
                  {event.startTime}
                  {event.endTime ? ` - ${event.endTime}` : ""}
                </span>
              </div>
            )}
            <div className="event-card-meta-item">
              <MapPin className="h-4 w-4" />
              <span>{translation.location}</span>
            </div>
            {translation.participants && (
              <div className="event-card-meta-item">
                <Users className="h-4 w-4" />
                <span>{translation.participants}</span>
              </div>
            )}
          </div>

          <div className="event-card-footer">
            <Button asChild variant="" className="event-card-button">
              <a
                href={`/events/${event.slug}/apply`}
                className="flex items-center gap-2"
              >
                {t.events.applyButton}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-title">{t.events.title}</h2>
          <p className="events-subtitle">{t.events.subtitle}</p>
        </div>

        {error && <div className="events-error">{error}</div>}

        <div className="events-current">
          <div className="events-current-header">
            <h3>{t.events.current}</h3>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event) => renderEventCard(event))}
            {!isLoading && upcomingEvents.length === 0 && (
              <div className="events-empty">{t.events.emptyState}</div>
            )}
          </div>
        </div>

        <div className="events-past">
          <div className="events-past-header">
            <h3>{t.events.past}</h3>
          </div>

          <div className="events-past-grid">
            {pastEvents.map((event) => {
              const translation = translationFor(event);
              return (
                <Card key={event._id} className="event-card">
                  <CardContent className="event-card-content">
                    <div className="event-card-meta">
                      <div className="event-card-meta-item">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      {event.startTime && (
                        <div className="event-card-meta-item">
                          <Clock className="h-4 w-4" />
                          <span>
                            {event.startTime}
                            {event.endTime ? ` - ${event.endTime}` : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <h4 className="event-card-title">{translation.title}</h4>
                    <p className="event-card-description">{translation.description}</p>
                    <div className="event-card-meta">
                      <div className="event-card-meta-item">
                        <MapPin className="h-4 w-4" />
                        <span>{translation.location}</span>
                      </div>
                      {translation.participants && (
                        <div className="event-card-meta-item">
                          <Users className="h-4 w-4" />
                          <span>{translation.participants}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
