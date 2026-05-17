import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, TypewriterScroll, SectionDivider } from '../components/ui';
import './GalleryPage.css';

const API_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:5001/api';

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption: string;
}

/**
 * Gallery page showing personal gallery items
 */
export const GalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetchGallery();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchGallery();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setGalleryItems(data.items || []);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="gallery-page">
        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
          Loading gallery...
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* Dark Hero Section */}
      <div className="gallery-hero-dark">
        <div className="section-header-gallery">
          <h1>Gallery</h1>
          <p>Moments, inspirations, and behind-the-scenes from our creative journey</p>
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
      <div className="gallery-content-light light-section">
        <TypewriterScroll 
          text="Visual Stories"
          speed={100}
          as="h2"
          className="gallery-heading"
          bidirectional={true}
        />

        <div className="gallery-grid">
          {galleryItems.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgba(0,0,0,0.5)' }}>
              No gallery items yet. Add them in the admin panel!
            </div>
          ) : (
            galleryItems.map((item) => (
              <LiquidGlassCard key={item._id} className="gallery-item" hoverEffect>
                <div className="gallery-image">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.caption}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="gallery-placeholder">
                      <span>Add Your Image</span>
                    </div>
                  )}
                  {item.caption && (
                    <div className="gallery-caption">
                      <p>{item.caption}</p>
                    </div>
                  )}
                </div>
              </LiquidGlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;