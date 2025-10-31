import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, ArrowRight, RefreshCw } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { api } from "../lib/api";
import type { BlogPost } from "../types/api";

export function Blog() {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = (await api.getBlogPosts()) as BlogPost[];
        setPosts(data);
      } catch (err) {
        setError((err as Error).message ?? "Blog yazıları yüklenemedi");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  const displayPosts = useMemo(() => {
    return posts.slice(0, 3);
  }, [posts]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
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

  const estimateReadTime = (post: BlogPost) => {
    const words = post.body?.split(/\s+/).length ?? 0;
    const minutes = Math.max(3, Math.round(words / 200));
    return language === "tr" ? `${minutes} dk` : `${minutes} min`;
  };

  const getCategory = (post: BlogPost) => {
    if (!post.tags || post.tags.length === 0) {
      return language === "tr" ? "Genel" : "General";
    }
    return post.tags[0];
  };

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <div>
            <h2 className="blog-title">{t.blog.title}</h2>
            <p className="blog-subtitle">{t.blog.subtitle}</p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              {t.common.loading}
            </div>
          )}
        </div>

        {error && <div className="blog-error">{error}</div>}

        <div className="blog-grid">
          {displayPosts.map((post) => {
            const category = getCategory(post);

            return (
              <Card key={post._id} className="blog-card group">
                {post.coverImage && (
                  <div className="blog-card-image-wrapper">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="blog-card-image"
                    />
                    <div className="blog-card-badge-wrapper">
                      <Badge className="blog-card-badge blog-card-badge-default">
                        {category}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardContent className="blog-card-content">
                  <h3 className="blog-card-title">{post.title}</h3>

                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  <div className="blog-card-meta">
                    <div className="blog-card-date">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <span>{estimateReadTime(post)}</span>
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

          {!isLoading && displayPosts.length === 0 && (
            <div className="blog-empty">
              {language === "tr"
                ? "Henüz blog yazısı eklenmedi."
                : "No blog posts yet."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
