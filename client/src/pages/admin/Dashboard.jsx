// Admin Dashboard - Professional overview with statistics and quick actions
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Mail, FolderOpen, Image, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { PageLoader } from '../../components/common/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      title: 'Total Enquiries',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Mail,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-600/10',
    },
    {
      title: 'Pending',
      value: '0',
      change: '+0',
      trend: 'neutral',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-600/10',
    },
    {
      title: 'Projects',
      value: '0',
      change: '+0',
      trend: 'up',
      icon: FolderOpen,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-600/10',
    },
    {
      title: 'Gallery Images',
      value: '0',
      change: '+0',
      trend: 'up',
      icon: Image,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-600/10',
    },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch enquiries
      const enquiriesSnapshot = await getDocs(collection(db, 'enquiries'));
      const totalEnquiries = enquiriesSnapshot.size;

      // Count pending enquiries (status = 'new')
      const pendingQuery = query(collection(db, 'enquiries'), where('status', '==', 'new'));
      const pendingSnapshot = await getDocs(pendingQuery);
      const pendingCount = pendingSnapshot.size;

      // Fetch projects
      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      const totalProjects = projectsSnapshot.size;

      // Fetch gallery images
      const gallerySnapshot = await getDocs(collection(db, 'gallery'));
      const totalGallery = gallerySnapshot.size;

      // Update stats
      setStats([
        {
          title: 'Total Enquiries',
          value: totalEnquiries.toString(),
          change: `${totalEnquiries} total`,
          trend: 'up',
          icon: Mail,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-600/10',
        },
        {
          title: 'Pending',
          value: pendingCount.toString(),
          change: `${pendingCount} new`,
          trend: pendingCount > 0 ? 'up' : 'neutral',
          icon: Clock,
          color: 'text-orange-600 dark:text-orange-400',
          bgColor: 'bg-orange-600/10',
        },
        {
          title: 'Projects',
          value: totalProjects.toString(),
          change: `${totalProjects} total`,
          trend: 'up',
          icon: FolderOpen,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-600/10',
        },
        {
          title: 'Gallery Images',
          value: totalGallery.toString(),
          change: `${totalGallery} total`,
          trend: 'up',
          icon: Image,
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-600/10',
        },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'View Enquiries',
      description: 'Manage customer enquiries',
      icon: Mail,
      color: 'blue',
      link: '/admin/enquiries',
    },
    {
      title: 'Manage Projects',
      description: 'Add or edit projects',
      icon: FolderOpen,
      color: 'green',
      link: '/admin/projects',
    },
    {
      title: 'Gallery Management',
      description: 'Upload and organize images',
      icon: Image,
      color: 'purple',
      link: '/admin/gallery',
    },
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-light-text dark:text-dark-text mb-2">
          Welcome back! 👋
        </h2>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">
          Here's what's happening with your business today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <TrendingUp
                        className={`w-4 h-4 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}
                      />
                      <span
                        className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 ${stat.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-light-text dark:text-dark-text mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'bg-blue-600/10 text-blue-600 dark:text-blue-400',
                green: 'bg-green-600/10 text-green-600 dark:text-green-400',
                purple: 'bg-purple-600/10 text-purple-600 dark:text-purple-400',
              };

              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={action.link}
                    className="flex items-center space-x-4 p-4 md:p-5 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${colorClasses[action.color]} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-light-text dark:text-dark-text mb-1">
                        {action.title}
                      </div>
                      <div className="text-xs md:text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        {action.description}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-light-text dark:text-dark-text">
              Recent Activity
            </h2>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-light-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-light-textSecondary dark:text-dark-textSecondary" />
            </div>
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
              No Recent Activity
            </h3>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              Start managing enquiries, projects, and gallery to see activity here
            </p>
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              View Enquiries
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                System Status: Active
              </h3>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                All systems are operational. Firebase connection established. Ready to manage your
                business data.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
