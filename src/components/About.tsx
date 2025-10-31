import React from "react";
import { Card, CardContent } from "./ui/card";
import { Lightbulb, Users, Target, Rocket } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import MissionImage from "../assets/misyon.png";

export function About() {
  const { t } = useLanguage();
  const features = [
    {
      icon: (
        <Lightbulb className="h-8 w-8" />
      ),
      title: t.about.features.innovation.title,
      description: t.about.features.innovation.description,
    },
    {
      icon: (
        <Users className="h-8 w-8" />
      ),
      title: t.about.features.community.title,
      description: t.about.features.community.description,
    },
    {
      icon: (
        <Target className="h-8 w-8" />
      ),
      title: t.about.features.goalOriented.title,
      description: t.about.features.goalOriented.description,
    },
    {
      icon: (
        <Rocket className="h-8 w-8" />
      ),
      title: t.about.features.growth.title,
      description: t.about.features.growth.description,
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">
            {t.about.title}
          </h2>
          <div className="about-content">
            {t.about.intro.map((paragraph, index) => (
              <p key={index} className="about-paragraph">
                {paragraph}
              </p>
            ))}
            <div className="about-callout-box">
              <p className="about-callout-title">
                {t.about.callout}
              </p>
              <div className="about-callout-info">
                <p>
                  <span className="about-callout-label">
                    {t.about.president}:
                  </span>{" "}
                  Gizem TUĞUZ
                </p>
                <p>
                  <span className="about-callout-label">
                    {t.about.advisor}:
                  </span>{" "}
                  Prof.Dr.Nuray AT
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-features-grid">
          {features.map((feature, index) => (
            <Card key={index} className="about-feature-card">
              <CardContent className="about-feature-card-content">
                <div className="about-feature-icon">
                  {feature.icon}
                </div>
                <h3 className="about-feature-title">
                  {feature.title}
                </h3>
                <p className="about-feature-description">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="about-mission-grid">
          <div>
            <h3 className="about-mission-title">
              {t.about.mission}
            </h3>
            <p className="about-mission-text">
              {t.about.missionText}
            </p>
            <div className="about-mission-points">
              {t.about.missionPoints.map((point, index) => (
                <div key={index} className="about-mission-point">
                  <div className="about-mission-bullet" />
                  <p className="about-mission-point-text">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-mission-image-container">
            <img
              src={MissionImage}
              alt="IEEE ESTU Team"
              className="about-mission-image"
            />
            <div className="about-mission-image-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}
