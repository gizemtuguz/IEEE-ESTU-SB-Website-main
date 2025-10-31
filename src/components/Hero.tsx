import {
  Users,
  Calendar,
  Award,
} from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';
import heroImage from '../assets/hero_bg.png';

export function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="ESTU Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl">
            {t.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            {t.hero.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-[#00629B] rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">200+</p>
                <p className="text-gray-300 text-sm">
                  {t.hero.stats.members}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-[#00629B] rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-gray-300 text-sm">
                  {t.hero.stats.events}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-[#00629B] rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">15+</p>
                <p className="text-gray-300 text-sm">{t.hero.stats.awards}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
