// Services Page - Dakshin Capital Loan Services
import PageHeader from '../../components/common/PageHeader';
import {
  Building2,
  Building,
  Home,
  FileText,
  Settings,
  ArrowRight,
  CheckCircle,
  Shield,
  Laptop,
  Network,
  FileCheck,
  Zap,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { LOAN_TYPES, KEY_FEATURES } from '../../utils/constants';

const Services = () => {
  const loanServices = [
    {
      id: 'construction',
      icon: Building2,
      title: 'Construction & Builder Finance',
      description:
        'Structured project funding for residential, commercial, or redevelopment projects.',
      details:
        'Includes project-based analysis, phased disbursement planning, and compliance documentation as per bank norms.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-600/10',
      features: [
        'Project-based analysis and evaluation',
        'Phased disbursement planning',
        'Compliance documentation as per bank norms',
        'Residential and commercial projects',
        'Redevelopment project funding',
      ],
    },
    {
      id: 'corporate',
      icon: Building,
      title: 'Corporate & SME Loans',
      description:
        'Working capital, expansion funding, or term loans designed for manufacturing units, trading businesses, and service providers.',
      details: 'Customized funding structures ensure liquidity without operational disruption.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-600/10',
      features: [
        'Working capital solutions',
        'Business expansion funding',
        'Term loans for growth',
        'Manufacturing unit financing',
        'Trading business support',
        'Service provider funding',
      ],
    },
    {
      id: 'lap',
      icon: Home,
      title: 'Loan Against Property (LAP)',
      description:
        'Secured loans against residential or commercial property for business expansion, debt consolidation, or investment purposes.',
      details: 'Leverage your property assets for business growth and financial flexibility.',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-600/10',
      features: [
        'Business expansion funding',
        'Debt consolidation solutions',
        'Investment opportunities',
        'Residential property loans',
        'Commercial property loans',
      ],
    },
    {
      id: 'home',
      icon: Home,
      title: 'Home & Property Purchase Loans',
      description:
        'Finance for new purchase, resale, or joint development — including structured deals for developers and end-users.',
      details: 'Comprehensive property financing solutions for all your real estate needs.',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-600/10',
      features: [
        'New property purchase',
        'Resale property financing',
        'Joint development deals',
        'Developer financing',
        'End-user home loans',
      ],
    },
    {
      id: 'lrd',
      icon: FileText,
      title: 'Lease Rental Discounting (LRD)',
      description:
        'Funding against rental income for cash flow enhancement and working capital optimization.',
      details: 'Unlock the value of your rental properties for immediate business needs.',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-600/10',
      features: [
        'Rental income-based funding',
        'Cash flow enhancement',
        'Working capital optimization',
        'Commercial property leverage',
        'Flexible repayment options',
      ],
    },
    {
      id: 'machinery',
      icon: Settings,
      title: 'Machinery Loans',
      description: 'Funding for machinery assets and working capital optimization.',
      details: 'Finance your equipment and machinery needs to scale your operations.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-600/10',
      features: [
        'New machinery purchase',
        'Equipment financing',
        'Working capital support',
        'Asset-based lending',
        'Flexible tenure options',
      ],
    },
  ];

  const iconMap = {
    Building2,
    Shield,
    Laptop,
    Network,
    FileCheck,
    Zap,
    Users,
    Settings,
  };

  return (
    <div className="pt-20">
      <PageHeader
        title="Our Financial Services"
        subtitle="Comprehensive loan solutions backed by nationalized banks"
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Loan Services Grid */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <div className="space-y-12">
            {loanServices.map((loan, index) => {
              const Icon = loan.icon;
              return (
                <motion.div
                  key={loan.id}
                  id={loan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-24"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left - Main Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-4 mb-6">
                          <div
                            className={`w-16 h-16 ${loan.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className={`w-8 h-8 ${loan.color}`} />
                          </div>
                          <div>
                            <h2 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text mb-2">
                              {loan.title}
                            </h2>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary text-lg mb-3">
                              {loan.description}
                            </p>
                            <p className="text-light-text dark:text-dark-text">{loan.details}</p>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                            What We Offer
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {loan.features.map((feature) => (
                              <div key={feature} className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 text-light-success dark:text-dark-success flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right - CTA */}
                      <div className="bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-xl p-6 text-white flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
                          <p className="text-white/90 mb-6">
                            Contact us today to discuss your financing needs and get a customized
                            solution.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <Link to="/contact">
                            <Button
                              variant="outline"
                              className="w-full bg-white text-light-primary hover:bg-white/90 border-white"
                              icon={ArrowRight}
                              iconPosition="right"
                            >
                              Apply Now
                            </Button>
                          </Link>
                          <Link to="/emi-calculator">
                            <Button
                              variant="outline"
                              className="w-full border-white text-white hover:bg-white/10"
                            >
                              Calculate EMI
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
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
              What sets us apart in the financial services industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_FEATURES.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Shield;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-light-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-light-primary dark:text-dark-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Need a Customized Loan Solution?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our experts are ready to design a financing structure that matches your specific
              requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-light-primary hover:bg-white/90 border-white"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link to="/emi-calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Calculate Your EMI
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
