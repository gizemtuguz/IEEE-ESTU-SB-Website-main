import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Plane,
  Radio,
  Cpu,
  Zap,
  Users,
  Calendar,
  Megaphone,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";


export function Committees() {
  const { t, language } = useLanguage();

  const committees = [
    {
      key: "aess",
      icon: Plane,
      badgeClass: "committee-badge-aess",
      gradient: "from-blue-500 to-blue-600",
      image:
      "https://images.unsplash.com/photo-1679857768766-4c6a46db3301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGNvbW11bmljYXRpb24lMjBuZXR3b3JrfGVufDF8fHx8MTc2MTE3NDIyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      key: "comsoc",
      icon: Radio,
      badgeClass: "committee-badge-comsoc",
      gradient: "from-purple-500 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1679857768766-4c6a46db3301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGNvbW11bmljYXRpb24lMjBuZXR3b3JrfGVufDF8fHx8MTc2MTE3NDIyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      key: "cs",
      icon: Cpu,
      badgeClass: "committee-badge-cs",
      gradient: "from-teal-500 to-teal-600",
      image:
        "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzYxMTc0MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      key: "pes",
      icon: Zap,
      badgeClass: "committee-badge-pes",
      gradient: "from-amber-500 to-amber-600",
      image:
        "https://images.unsplash.com/photo-1668196469278-1dae4d5b25d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NjExNzQyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      key: "wie",
      icon: Users,
      badgeClass: "committee-badge-wie",
      gradient: "from-pink-500 to-pink-600",
      image:
        "https://images.unsplash.com/photo-1748348209623-906c42dd1f7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVuZ2luZWVycyUyMHRlYW18ZW58MXx8fHwxNzYxMTc0MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      key: "kok",
      icon: Calendar,
      badgeClass: "committee-badge-kok",
      gradient: "from-cyan-500 to-cyan-600",
      image:
        "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYxMTc0MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      key: "pr",
      icon: Megaphone,
      badgeClass: "committee-badge-pr",
      gradient: "from-green-500 to-green-600",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjExNjc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section
      id="committees"
      className="committees-section"
    >
      <div className="committees-container">
        {/* Header */}
        <div className="committees-header">
          <h2 className="committees-title">
            {t.committees.title}
          </h2>
          <p className="committees-subtitle">
            {t.committees.subtitle}
          </p>
        </div>

        {/* Committees Grid - 3 per row, event card style */}
        <div className="committees-grid">
          {committees.map((committee) => {
            const Icon = committee.icon;
            const committeeData = t.committees[
              committee.key as keyof typeof t.committees
            ] as any;

            return (
              <Card
                key={committee.key}
                className="committee-card group"
              >
                {/* Image Section */}
                <div className="committee-card-image">
                  <ImageWithFallback
                    src={committee.image}
                    alt={committeeData.name}
                    className="committee-card-img"
                  />
                  <div
                    className={`committee-card-gradient committee-gradient-${committee.key}`}
                  />

                  {/* Badge with committee name */}
                  <div className="committee-card-badge-wrapper">
                    <Badge
                      className={`committee-card-badge ${committee.badgeClass}`}
                    >
                      <Icon className="h-3.5 w-3.5 mr-1.5 inline" />
                      {committeeData.name}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="committee-card-content">
                  {/* Full Name */}
                  <h3 className="committee-card-fullname">
                    {committeeData.fullName}
                  </h3>

                  {/* Description */}
                  <p className="committee-card-description">
                    {committeeData.description}
                  </p>

                  {/* Focus Areas */}
                  <div>
                    <p className="committee-card-focus-title">
                      {language === "tr"
                        ? "Çalışma Alanları"
                        : "Focus Areas"}
                    </p>
                    <div className="committee-card-focus-areas">
                      {committeeData.areas.map(
                        (area: string, index: number) => (
                          <Badge
                            key={index}
                            className="committee-focus-area-badge"
                          >
                            {area}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
