import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPostData {
  tr: {
    title: string;
    excerpt: string;
    author: string;
    category: string;
    readTime: string;
  };
  en: {
    title: string;
    excerpt: string;
    author: string;
    category: string;
    readTime: string;
  };
  date: string;
  image: string;
}

export function Blog() {
  const { t, language } = useLanguage();
  
  const blogPosts: BlogPostData[] = [
    {
      tr: {
        title: "IEEE Xtreme Yarışmasına Hazırlık İpuçları",
        excerpt: "24 saatlik programlama maratonu için etkili hazırlık stratejileri ve algoritmik problem çözme teknikleri.",
        author: "Ahmet Yılmaz",
        category: "Yarışma",
        readTime: "5 dk"
      },
      en: {
        title: "IEEE Xtreme Competition Preparation Tips",
        excerpt: "Effective preparation strategies and algorithmic problem-solving techniques for the 24-hour programming marathon.",
        author: "Ahmet Yılmaz",
        category: "Competition",
        readTime: "5 min"
      },
      date: "2025-08-15",
      image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBjb21wZXRpdGlvbiUyMGhhY2thdGhvbnxlbnwxfHx8fDE3NTcxODg4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      tr: {
        title: "Machine Learning'e Başlangıç Rehberi",
        excerpt: "Yapay zeka ve makine öğrenmesi dünyasına adım atmak isteyenler için temel kavramlar ve öğrenme yolları.",
        author: "Zeynep Kaya",
        category: "Teknik",
        readTime: "8 dk"
      },
      en: {
        title: "Beginner's Guide to Machine Learning",
        excerpt: "Essential concepts and learning paths for those wanting to step into the world of artificial intelligence and machine learning.",
        author: "Zeynep Kaya",
        category: "Technical",
        readTime: "8 min"
      },
      date: "2025-08-10",
      image: "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBzdHVkZW50c3xlbnwxfHx8fDE3NTcyNDYzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      tr: {
        title: "IEEE Üyeliğinin Faydaları",
        excerpt: "IEEE üyesi olmanın akademik ve profesyonel kariyerinize sağladığı avantajlar ve fırsatlar.",
        author: "Mehmet Demir",
        category: "IEEE",
        readTime: "4 dk"
      },
      en: {
        title: "Benefits of IEEE Membership",
        excerpt: "Advantages and opportunities that IEEE membership provides for your academic and professional career.",
        author: "Mehmet Demir",
        category: "IEEE",
        readTime: "4 min"
      },
      date: "2025-08-05",
      image: "https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdHVkZW50JTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzU3MjQ2MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const getCategoryColor = (category: string) => {
    const categoryKey = category.toLowerCase();
    if (categoryKey === "yarışma" || categoryKey === "competition") {
      return "blog-card-badge-competition";
    }
    if (categoryKey === "teknik" || categoryKey === "technical") {
      return "blog-card-badge-technical";
    }
    if (categoryKey === "ieee") {
      return "blog-card-badge-ieee";
    }
    return "blog-card-badge-default";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === 'tr' ? 'tr-TR' : 'en-US';
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">
            {t.blog.title}
          </h2>
          <p className="blog-subtitle">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => {
            const postData = language === 'tr' ? post.tr : post.en;
            
            return (
              <Card 
                key={index} 
                className="blog-card group"
              >
                <div className="blog-card-image-wrapper">
                  <img
                    src={post.image}
                    alt={postData.title}
                    className="blog-card-image"
                  />
                  <div className="blog-card-badge-wrapper">
                    <Badge className={`blog-card-badge ${getCategoryColor(postData.category)}`}>
                      {postData.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="blog-card-content">
                  <h3 className="blog-card-title">
                    {postData.title}
                  </h3>

                  <p className="blog-card-excerpt">
                    {postData.excerpt}
                  </p>

                  <div className="blog-card-meta">
                    <div className="blog-card-date">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <span>{postData.readTime}</span>
                  </div>

                  <div className="blog-card-footer">
                    <button className="blog-card-read-more">
                      {t.blog.readMore}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
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
