// Gallery Page - Professional masonry layout with modern features
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import {
  Image as ImageIcon,
  Users,
  Award,
  Calendar,
  Search,
  X,
  Share2,
  Eye,
  Heart,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { PageLoader } from '../../components/common/Loader';
import Card from '../../components/ui/Card';
import { fetchGalleryImages } from '../../services/gallery.service';
import { showError, showInfo, showSuccess } from '../../utils/toast';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsAnimated) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [end, duration, statsAnimated]);

    return count;
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await fetchGalleryImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All', icon: ImageIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'office', label: 'Office & Team', icon: Users, color: 'from-purple-500 to-purple-600' },
    { id: 'clients', label: 'Client Success', icon: Award, color: 'from-green-500 to-green-600' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'from-orange-500 to-orange-600' },
    { id: 'awards', label: 'Awards', icon: Award, color: 'from-yellow-500 to-yellow-600' },
    { id: 'team', label: 'Team', icon: Users, color: 'from-pink-500 to-pink-600' },
  ];

  // Filter images by category and search
  const filteredImages = images.filter((img) => {
    const matchesCategory = categoryFilter === 'all' || img.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      (img.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredTotalViews = filteredImages.reduce((sum, img) => sum + (img.views || 0), 0);
  const filteredTotalLikes = filteredImages.reduce((sum, img) => sum + (img.likes || 0), 0);
  const filteredCategoryCount = new Set(filteredImages.map((img) => img.category).filter(Boolean))
    .size;

  const totalImages = useCounter(filteredImages.length);
  const totalViews = useCounter(filteredTotalViews);
  const totalLikes = useCounter(filteredTotalLikes);
  const categoryCount = useCounter(filteredCategoryCount);

  const statistics = [
    {
      icon: ImageIcon,
      value: totalImages,
      suffix: '+',
      label: 'Total Photos',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calendar,
      value: totalViews,
      suffix: '+',
      label: 'Total Views',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      value: totalLikes,
      suffix: '+',
      label: 'Total Likes',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Award,
      value: categoryCount,
      suffix: '+',
      label: 'Categories',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleViewImage = (index, imageId) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === imageId
          ? {
              ...img,
              views: (img.views || 0) + 1,
            }
          : img
      )
    );
    openLightbox(index);
  };

  const handleToggleLike = (imageId) => {
    setImages((prevImages) =>
      prevImages.map((img) => {
        if (img.id !== imageId) return img;

        const isLiked = Boolean(img.isLiked);
        return {
          ...img,
          isLiked: !isLiked,
          likes: Math.max(0, (img.likes || 0) + (isLiked ? -1 : 1)),
        };
      })
    );
  };

  const handleShareImage = async (image) => {
    const title = image?.title || 'Gallery Image';
    const url = image?.imageUrl;

    if (!url) {
      showError('Image link is not available to share.');
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: `Check this image from our gallery: ${title}`,
          url,
        });
        showSuccess('Image shared successfully.');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        showInfo('Image link copied to clipboard.');
        return;
      }

      showError('Sharing is not supported on this browser.');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        showError('Unable to share image right now.');
      }
    }
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return images.length;
    return images.filter((img) => img.category === categoryId).length;
  };

  // Masonry breakpoints
  const breakpointColumns = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  // Get height class based on image height property
  const getHeightClass = (height) => {
    switch (height) {
      case 'tall':
        return 'h-96';
      case 'short':
        return 'h-48';
      default:
        return 'h-64';
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="pt-20">
      <PageHeader
        title="Gallery"
        subtitle="Celebrating our journey through memorable moments and achievements"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      {/* Statistics Bar */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setStatsAnimated(true)}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12"
          >
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="text-center relative overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    <div className="relative z-10">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-light-primary dark:text-dark-primary" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-1">
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-xs md:text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        {stat.label}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary" />
              <input
                type="text"
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text placeholder:text-light-textMuted dark:placeholder:text-dark-textMuted focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter with Animated Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const count = getCategoryCount(category.id);
              const isActive = categoryFilter === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all overflow-hidden group ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:shadow-md border border-light-border dark:border-dark-border'
                  }`}
                >
                  {/* Gradient background for active state */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm md:text-base">{category.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 backdrop-blur-sm'
                          : 'bg-light-primary/10 dark:bg-dark-primary/10'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Masonry Gallery Grid */}
          <AnimatePresence mode="wait">
            {filteredImages.length > 0 ? (
              <motion.div
                key={categoryFilter + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="flex -ml-4 md:-ml-6 w-auto"
                  columnClassName="pl-4 md:pl-6 bg-clip-padding"
                >
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 100,
                      }}
                      className="mb-4 md:mb-6"
                    >
                      <div
                        className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
                        onClick={() => handleViewImage(index, image.id)}
                      >
                        {/* Image */}
                        <div className={`relative ${getHeightClass(image.height)} overflow-hidden`}>
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />

                          {/* Glassmorphism Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />

                          {/* Category Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <span className="px-3 py-1.5 bg-white/90 dark:bg-black/90 backdrop-blur-md text-light-text dark:text-dark-text text-xs font-semibold rounded-full shadow-lg border border-white/20">
                              {image.category}
                            </span>
                          </div>

                          {/* Content Overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <h3 className="text-white font-bold text-lg md:text-xl mb-2 drop-shadow-lg">
                              {image.title}
                            </h3>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-white/90 text-sm mb-3">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{image.views?.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{image.likes}</span>
                              </div>
                              {image.date && (
                                <span className="text-xs">
                                  {new Date(image.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewImage(index, image.id);
                                }}
                                className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg transition-colors"
                                aria-label="View image"
                              >
                                <Eye className="w-4 h-4 text-white" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleLike(image.id);
                                }}
                                className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg transition-colors"
                                aria-label="Like image"
                              >
                                <Heart
                                  className={`w-4 h-4 ${image.isLiked ? 'text-red-400 fill-red-400' : 'text-white'}`}
                                />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShareImage(image);
                                }}
                                className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg transition-colors"
                                aria-label="Share image"
                              >
                                <Share2 className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-light-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-12 h-12 text-light-textSecondary dark:text-dark-textSecondary" />
                </div>
                <h3 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-2">
                  No images found
                </h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  View All Images
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({
          src: img.imageUrl,
          alt: img.title,
          title: img.title,
          description: `${img.category} • ${new Date(img.date).toLocaleDateString()} • ${img.views} views • ${img.likes} likes`,
        }))}
        plugins={[Zoom, Thumbnails, Fullscreen]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 8,
          padding: 4,
          gap: 16,
        }}
        animation={{ fade: 500, swipe: 300 }}
        carousel={{ finite: false }}
      />
    </div>
  );
};

export default Gallery;
