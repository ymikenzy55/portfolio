import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * SEO component for managing meta tags
 * Updates document title and meta tags based on current page
 */
export const SEO: React.FC<SEOProps> = ({
  title = 'Portfolio - Full-Stack Developer & Designer',
  description = 'Creating complete digital experiences with clean UX, reliable backend, and AI-enhanced workflows. View my projects and technical expertise.',
  image = '/og-image.jpg',
  type = 'website'
}) => {
  const location = useLocation();
  const baseUrl = window.location.origin;
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description, true);
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', `${baseUrl}${image}`);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', `${baseUrl}${image}`, true);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;
  }, [title, description, image, type, currentUrl, baseUrl]);

  return null;
};

export default SEO;
