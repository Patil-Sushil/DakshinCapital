// Projects Page - Showcase completed and ongoing projects
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PageLoader } from '../../components/common/Loader';
import { fetchProjects } from '../../services/project.service';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data.length > 0 ? data : getMockProjects());
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects(getMockProjects());
    } finally {
      setLoading(false);
    }
  };

  const getMockProjects = () => [
    {
      id: '1',
      title: 'Luxury Residential Complex',
      description: 'Premium residential project with modern amenities',
      location: 'Mumbai, Maharashtra',
      category: 'residential',
      status: 'completed',
      galleryImages: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    },
    {
      id: '2',
      title: 'Commercial Plaza Development',
      description: 'State-of-the-art commercial complex',
      location: 'Delhi NCR',
      category: 'commercial',
      status: 'ongoing',
      galleryImages: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  if (loading) return <PageLoader />;

  return (
    <div className="pt-20">
      <PageHeader
        title="Our Projects"
        subtitle="Explore our successful financing projects"
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'completed', 'ongoing', 'upcoming'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === status
                    ? 'bg-light-primary dark:bg-dark-primary text-white'
                    : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  {project.galleryImages?.[0] && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={project.galleryImages[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                    </div>
                  )}

                  <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-2">
                    {project.title}
                  </h3>

                  <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </div>

                  <Link to={`/projects/${project.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                No projects found for this filter
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
