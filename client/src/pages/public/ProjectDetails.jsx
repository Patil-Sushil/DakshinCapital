// Project Details Page - Detailed view of a single project
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PageLoader } from '../../components/common/Loader';
import { fetchProjects } from '../../services/project.service';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const projects = await fetchProjects();
      const found = projects.find((p) => p.id === id);
      setProject(found || getMockProject());
    } catch (error) {
      console.error('Error loading project:', error);
      setProject(getMockProject());
    } finally {
      setLoading(false);
    }
  };

  const getMockProject = () => ({
    id,
    title: 'Sample Project',
    description:
      'This is a sample project description. The actual project data will be loaded from Firebase.',
    location: 'Mumbai, Maharashtra',
    category: 'residential',
    status: 'completed',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    ],
  });

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (loading) return <PageLoader />;

  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <PageHeader
        title={project.title}
        subtitle={project.location}
        breadcrumbs={[{ label: 'Projects', path: '/projects' }, { label: project.title }]}
      />

      <section className="section-padding">
        <div className="container-custom">
          <Link
            to="/projects"
            className="inline-flex items-center text-light-primary dark:text-dark-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              {project.galleryImages?.[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative h-96 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(0)}
                >
                  <img
                    src={project.galleryImages[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : project.status === 'ongoing'
                            ? 'bg-blue-500 text-white'
                            : 'bg-orange-500 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Description */}
              <Card>
                <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
                  About This Project
                </h2>
                <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </Card>

              {/* Gallery */}
              {project.galleryImages && project.galleryImages.length > 1 && (
                <Card>
                  <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.galleryImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => openLightbox(index)}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-4">
                  Project Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      Location
                    </label>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-2 text-light-primary dark:text-dark-primary" />
                      <span className="text-light-text dark:text-dark-text">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      Category
                    </label>
                    <p className="text-light-text dark:text-dark-text mt-1 capitalize">
                      {project.category}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      Status
                    </label>
                    <p className="text-light-text dark:text-dark-text mt-1 capitalize">
                      {project.status}
                    </p>
                  </div>

                  {project.createdAt && (
                    <div>
                      <label className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        Added On
                      </label>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-2 text-light-primary dark:text-dark-primary" />
                        <span className="text-light-text dark:text-dark-text">
                          {project.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-4">
                  Interested in Similar Projects?
                </h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  Contact us to learn more about our financing solutions for your project.
                </p>
                <Link to="/contact">
                  <Button className="w-full">Get in Touch</Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={project.galleryImages?.map((img) => ({ src: img, alt: project.title })) || []}
      />
    </div>
  );
};

export default ProjectDetails;
