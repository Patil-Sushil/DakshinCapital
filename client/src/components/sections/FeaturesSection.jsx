// Features Section - Key features highlight
import { Zap, Shield, Clock, TrendingUp, Users, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Quick Approval',
      description:
        'Get loan approval within 24 hours with minimal documentation and hassle-free process.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Low Interest Rates',
      description:
        'Competitive interest rates starting from 8.5% per annum with flexible repayment options.',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Bank-level security with encrypted transactions and complete data protection.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Clock,
      title: 'Flexible Tenure',
      description: 'Choose repayment tenure from 1 to 30 years based on your financial comfort.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description:
        'Dedicated relationship managers to guide you through every step of the loan process.',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: FileCheck,
      title: 'Minimal Documentation',
      description: 'Simple documentation process with digital verification for faster processing.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <section className="section-padding bg-light-background dark:bg-dark-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
            Why Choose Dakshin Capital?
          </h2>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
            We provide comprehensive financial solutions with customer-first approach and
            transparent processes
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full group">
                  <div
                    className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
