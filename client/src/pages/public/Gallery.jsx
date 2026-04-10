// Gallery Page - Image gallery with lightbox
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PageHeader from '../../components/common/PageHeader';
import { PageLoader } from '../../components/common/Loader';
import { fetchGalleryImages } from '../../services/gallery.service';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await fetchGalleryImages();
      setImages(data.length > 0 ? data : getMockImages());
    } catch (error) {
      console.error('Error loading images:', error);
      setImages(getMockImages());
    } finally {
      setLoading(false);
    }
  };

  const getMockImages = () => [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      title: 'Modern Home',
      category: 'residential',
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      title: 'Office Building',
      category: 'commercial',
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      title: 'Luxury Villa',
      category: 'residential',
    },
  ];

  const filteredImages =
    categoryFilter === 'all' ? images : images.filter((img) => img.category === categoryFilter);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="pt-20">
      <PageHeader
        title="Gallery"
        subtitle="Browse through our collection of moments and achievements"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'residential', 'commercial', 'industrial'].map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  categoryFilter === category
                    ? 'bg-light-primary dark:bg-dark-primary text-white'
                    : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="text-white font-semibold">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                No images found for this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({ src: img.imageUrl, alt: img.title }))}
      />
    </div>
  );
};

export default Gallery;
