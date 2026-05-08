import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, PixelPerfectButton, DotMatrix, SectionDivider } from '../components/ui';
import './ArticlesPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  readTime?: string;
}

/**
 * Articles/Blog page showcasing technical writing and expertise
 */
const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    // Initial fetch
    fetchArticles();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchArticles();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_URL}/articles`);
      const data = await response.json();
      // Only show published articles on public page
      const publishedArticles = (data.data || []).filter((a: Article) => a.published);
      setArticles(publishedArticles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all unique tags
  const allTags = ['all', ...Array.from(new Set(articles.flatMap(a => a.tags)))];

  // Filter articles by tag
  const filteredArticles = selectedTag === 'all' 
    ? articles 
    : articles.filter(a => a.tags.includes(selectedTag));

  const featuredArticle = filteredArticles[0]; // First article as featured
  const regularArticles = filteredArticles.slice(1);

  if (isLoading) {
    return (
      <div className="articles-page">
        <div className="articles-hero-dark">
          <div className="section-header">
            <h1>Loading Articles...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="articles-page">
      {/* Dark Hero Section */}
      <div className="articles-hero-dark">
        <div className="section-header">
          <h1>Articles & Insights</h1>
          <p>Thoughts on development, design, and building better software</p>
        </div>
      </div>

      {/* Notched Divider */}
      <SectionDivider 
        direction="center"
        fromColor="#0a0a0a"
        toColor="#f5f5f5"
        height={80}
      />

      {/* Light Content Section */}
      <div className="articles-content-light light-section">
        <DotMatrix density={10} interactive={true} color="rgba(0, 0, 0, 0.04)" />

        {/* Tag Filter */}
        <div className="tag-filter">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedTag === 'all' && (
          <div className="featured-article-container">
            <LiquidGlassCard className="featured-article-card" hoverEffect>
              <div className="featured-badge">Featured</div>
              <div className="article-meta">
                <span className="article-date">{new Date(featuredArticle.createdAt).toLocaleDateString()}</span>
                <span className="article-separator">•</span>
                <span className="article-read-time">{featuredArticle.readTime || '5 min read'}</span>
              </div>
              <h2>{featuredArticle.title}</h2>
              <p className="article-excerpt">{featuredArticle.excerpt}</p>
              <div className="article-tags">
                {featuredArticle.tags.map(tag => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </div>
              <PixelPerfectButton
                variant="primary"
                size="medium"
                onClick={() => setSelectedArticle(featuredArticle)}
              >
                Read Article
              </PixelPerfectButton>
            </LiquidGlassCard>
          </div>
        )}

        {/* Articles Grid */}
        <div className="articles-grid">
          {regularArticles.map((article) => (
            <LiquidGlassCard
              key={article._id}
              className="article-card"
              hoverEffect
              onClick={() => setSelectedArticle(article)}
            >
              <div className="article-meta">
                <span className="article-date">{new Date(article.createdAt).toLocaleDateString()}</span>
                <span className="article-separator">•</span>
                <span className="article-read-time">{article.readTime || '5 min read'}</span>
              </div>
              <h3>{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="no-articles">
            <p>No articles found for this tag.</p>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <LiquidGlassCard 
            className="article-modal-content" 
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>×</button>
            
            <div className="article-modal-header">
              <div className="article-meta">
                <span className="article-date">{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
                <span className="article-separator">•</span>
                <span className="article-read-time">{selectedArticle.readTime || '5 min read'}</span>
              </div>
              <h2>{selectedArticle.title}</h2>
              <div className="article-tags">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="article-modal-body">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                // Handle bold text
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h4 key={index}>{paragraph.replace(/\*\*/g, '')}</h4>;
                }
                // Handle list items
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index}>
                      {items.map((item, i) => (
                        <li key={i}>{item.substring(2)}</li>
                      ))}
                    </ul>
                  );
                }
                // Handle numbered lists
                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split('\n').filter(line => /^\d+\./.test(line));
                  return (
                    <ol key={index}>
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                // Regular paragraph
                return <p key={index}>{paragraph}</p>;
              })}
            </div>
          </LiquidGlassCard>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
