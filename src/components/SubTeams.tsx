import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, ExternalLink, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SubTeams() {
  const { t } = useLanguage();

  const teams = [
    {
      name: t.subteams.rovstech.name,
      tagline: t.subteams.rovstech.tagline,
      description: t.subteams.rovstech.description,
      features: t.subteams.rovstech.features,
      achievements: t.subteams.rovstech.achievements,
      image: 'https://images.unsplash.com/photo-1754297813553-43eb3a9f65a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwcm9ib3QlMjBzdWJtYXJpbmV8ZW58MXx8fHwxNzYxMTMwNDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-blue-600 to-cyan-600',
      badgeColor: 'bg-blue-600',
    },
    {
      name: t.subteams.earendil.name,
      tagline: t.subteams.earendil.tagline,
      description: t.subteams.earendil.description,
      features: t.subteams.earendil.features,
      achievements: t.subteams.earendil.achievements,
      image: 'https://images.unsplash.com/photo-1639782792143-d8ce97e5d330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJzJTIwcm92ZXIlMjByb2JvdHxlbnwxfHx8fDE3NjEwMTkxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-orange-600 to-red-600',
      badgeColor: 'bg-orange-600',
    },
  ];

  return (
    <section id="subteams" className="py-20 bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.subteams.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subteams.subtitle}
          </p>
        </div>

        <div className="space-y-16 max-w-7xl mx-auto">
          {teams.map((team, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl dark:hover:shadow-primary-20 dark:hover:ring-1 dark:hover:ring-primary-50 transition-all duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <div className={`relative h-80 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={team.image}
                    alt={team.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-20`} />
                  <div className="absolute top-6 left-6">
                    <Badge className={`${team.badgeColor} text-white px-4 py-2 rounded-full`}>
                      <Users className="h-4 w-4 mr-2 inline" />
                      {team.tagline}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-primary mb-4">
                    {team.name}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {team.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">
                      {t.subteams.workAreas}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {team.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 ieee-icon-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-6">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">🏆 {t.subteams.achievements_label} </span>
                      {team.achievements}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-accent px-6 py-2 rounded-xl font-medium transition-colors duration-200 bg-transparent"
                    >
                      {t.subteams.learnMore}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-accent px-6 py-2 rounded-xl font-medium transition-colors duration-200 bg-transparent"
                    >
                      {t.subteams.joinTeam}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-16">
          <div className="subteams-callout-box">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t.subteams.joinInfo.title}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t.subteams.joinInfo.description}
            </p>
            <Button 
              size="lg"
              className="ieee-gradient-button text-white hover:opacity-90 px-8 py-3 rounded-xl font-medium transition-opacity duration-200"
            >
              {t.subteams.joinInfo.apply}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
