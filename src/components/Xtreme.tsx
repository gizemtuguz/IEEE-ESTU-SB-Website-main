import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Clock, Users, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Xtreme() {
  const { t } = useLanguage();
  
  return (
    <section id="xtreme" className="xtreme-section">
      <div className="xtreme-container">
        <div className="xtreme-header">
          <h2 className="xtreme-title">
            {t.xtreme.title}
          </h2>
          <p className="xtreme-subtitle">
            {t.xtreme.subtitle}
          </p>
        </div>

        <div className="xtreme-stats-grid">
          <Card className="xtreme-stat-card">
            <CardContent className="xtreme-stat-card-content">
              <div className="xtreme-stat-icon">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="xtreme-stat-title">{t.xtreme.stats.hours}</h3>
              <p className="xtreme-stat-description">{t.xtreme.stats.hoursDesc}</p>
            </CardContent>
          </Card>

          <Card className="xtreme-stat-card">
            <CardContent className="xtreme-stat-card-content">
              <div className="xtreme-stat-icon">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="xtreme-stat-title">{t.xtreme.stats.team}</h3>
              <p className="xtreme-stat-description">{t.xtreme.stats.teamDesc}</p>
            </CardContent>
          </Card>

          <Card className="xtreme-stat-card">
            <CardContent className="xtreme-stat-card-content">
              <div className="xtreme-stat-icon">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="xtreme-stat-title">{t.xtreme.stats.algo}</h3>
              <p className="xtreme-stat-description">{t.xtreme.stats.algoDesc}</p>
            </CardContent>
          </Card>

          <Card className="xtreme-stat-card">
            <CardContent className="xtreme-stat-card-content">
              <div className="xtreme-stat-icon">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="xtreme-stat-title">{t.xtreme.stats.global}</h3>
              <p className="xtreme-stat-description">{t.xtreme.stats.globalDesc}</p>
            </CardContent>
          </Card>
        </div>

        {/* <div className="xtreme-coming-soon-wrapper">
          <Card className="xtreme-coming-soon-card">
            <CardContent className="xtreme-coming-soon-content">
              <div className="xtreme-coming-soon-icon">
          <Clock className="h-8 w-8 text-white" />
              </div>
              <Badge className="xtreme-coming-soon-badge">
          {t.xtreme.comingSoon}
              </Badge>
              <h3 className="xtreme-coming-soon-title">
          {t.xtreme.updating}
              </h3>
              <p className="xtreme-coming-soon-description">
          {t.xtreme.updatingDesc}
              </p>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
}
