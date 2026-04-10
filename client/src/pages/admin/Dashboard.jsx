// Admin Dashboard Page
import { TrendingUp, Mail, FolderOpen, Image, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const Dashboard = () => {
  // Mock data - will be replaced with real data in Phase 7
  const stats = [
    {
      title: 'Total Enquiries',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Mail,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-600/10',
    },
    {
      title: 'Pending Enquiries',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-600/10',
    },
    {
      title: 'Total Projects',
      value: '42',
      change: '+3',
      trend: 'up',
      icon: FolderOpen,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-600/10',
    },
    {
      title: 'Gallery Images',
      value: '128',
      change: '+18',
      trend: 'up',
      icon: Image,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-600/10',
    },
  ];

  const recentEnquiries = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      loanType: 'Home Loan',
      amount: '₹25,00,000',
      status: 'new',
      date: '2 hours ago',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      loanType: 'Personal Loan',
      amount: '₹5,00,000',
      status: 'contacted',
      date: '5 hours ago',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      loanType: 'Business Loan',
      amount: '₹50,00,000',
      status: 'new',
      date: '1 day ago',
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      new: 'primary',
      contacted: 'warning',
      resolved: 'success',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text mb-2">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">
          Here's what's happening with your business today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {stat.change}
                      </span>
                      <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Enquiries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text">
              Recent Enquiries
            </h2>
            <a
              href="/admin/enquiries"
              className="text-sm text-light-primary dark:text-dark-primary hover:underline font-medium"
            >
              View All →
            </a>
          </div>

          <div className="space-y-4">
            {recentEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-light-text dark:text-dark-text">
                      {enquiry.name}
                    </h3>
                    <Badge variant={getStatusBadge(enquiry.status)}>{enquiry.status}</Badge>
                  </div>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    {enquiry.email}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-light-textSecondary dark:text-dark-textSecondary">
                    <span>{enquiry.loanType}</span>
                    <span>•</span>
                    <span>{enquiry.amount}</span>
                    <span>•</span>
                    <span>{enquiry.date}</span>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <h2 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/projects"
              className="flex items-center space-x-3 p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border hover:shadow-md transition-all hover:scale-105"
            >
              <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-semibold text-light-text dark:text-dark-text">Add Project</div>
                <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                  Create new project
                </div>
              </div>
            </a>

            <a
              href="/admin/gallery"
              className="flex items-center space-x-3 p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border hover:shadow-md transition-all hover:scale-105"
            >
              <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-light-text dark:text-dark-text">
                  Upload Images
                </div>
                <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                  Add to gallery
                </div>
              </div>
            </a>

            <a
              href="/admin/enquiries"
              className="flex items-center space-x-3 p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border hover:shadow-md transition-all hover:scale-105"
            >
              <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-light-text dark:text-dark-text">
                  Review Enquiries
                </div>
                <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                  Manage requests
                </div>
              </div>
            </a>
          </div>
        </Card>
      </motion.div>

      {/* Info Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            📊 Dashboard Preview
          </h3>
          <p className="text-blue-800 dark:text-blue-400">
            This is a preview of the admin dashboard. Full functionality with real data from
            Firebase will be implemented in Phase 7 (Enquiries Management) and Phase 8 (Projects
            Management).
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
