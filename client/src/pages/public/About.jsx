// About Page - Complete about us page
import PageHeader from '../../components/common/PageHeader';
import { Target, Eye, Award, Users, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description:
        'We build lasting relationships based on trust, transparency, and ethical practices.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description:
        'Your financial well-being is our priority. We go the extra mile for your satisfaction.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description:
        'Leveraging technology to provide faster, smarter, and more efficient financial solutions.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional service quality in every interaction.',
    },
  ];

  const timeline = [
    {
      year: '2008',
      event: 'Founded FinancePro',
      description: 'Started with a vision to democratize financial services',
    },
    {
      year: '2012',
      event: 'Reached 1,000 Customers',
      description: 'Milestone achievement in customer trust',
    },
    {
      year: '2015',
      event: 'Expanded to 10 Cities',
      description: 'Growing our presence across India',
    },
    {
      year: '2018',
      event: '₹100 Cr Disbursed',
      description: 'Helping thousands achieve their dreams',
    },
    {
      year: '2020',
      event: 'Digital Transformation',
      description: 'Launched online loan application platform',
    },
    {
      year: '2024',
      event: '10,000+ Happy Customers',
      description: 'Continuing our journey of excellence',
    },
  ];

  return (
    <div className="pt-20">
      <PageHeader
        title="About FinancePro"
        subtitle="Your trusted partner in achieving financial freedom since 2008"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Company Introduction */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-light-text dark:text-dark-text mb-6">
                Empowering Dreams Through Financial Solutions
              </h2>
              <div className="space-y-4 text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                <p>
                  Founded in 2008, FinancePro has been at the forefront of providing accessible and
                  transparent financial services to individuals and businesses across India. What
                  started as a small initiative has grown into a trusted name in the financial
                  sector.
                </p>
                <p>
                  With over 15 years of experience, we've helped more than 10,000 customers achieve
                  their dreams - whether it's buying a home, starting a business, pursuing
                  education, or managing personal finances. Our commitment to customer satisfaction
                  and ethical practices has made us a preferred choice for financial solutions.
                </p>
                <p>
                  We believe that everyone deserves access to fair and transparent financial
                  services. That's why we've built our business on the pillars of trust, innovation,
                  and customer-centricity. Our team of experienced professionals works tirelessly to
                  provide you with the best loan products and personalized service.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent p-1">
                <div className="w-full h-full rounded-2xl bg-light-background dark:bg-dark-background flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-4">
                      15+
                    </div>
                    <div className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                      Years of Excellence
                    </div>
                    <div className="text-light-textSecondary dark:text-dark-textSecondary">
                      Serving customers since 2008
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-light-surface dark:bg-dark-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
                  Our Vision
                </h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  To become India's most trusted and customer-centric financial services provider,
                  empowering millions to achieve their financial goals through innovative,
                  accessible, and transparent solutions. We envision a future where financial
                  freedom is within reach for everyone.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
                  Our Mission
                </h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  To provide quick, hassle-free, and affordable financial solutions with complete
                  transparency and integrity. We are committed to understanding our customers'
                  unique needs and delivering personalized services that exceed expectations while
                  maintaining the highest ethical standards.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
              Milestones that shaped our path to becoming a trusted financial partner
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-2 border-light-primary dark:border-dark-primary last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-light-primary dark:bg-dark-primary border-4 border-light-background dark:border-dark-background" />
                <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 border border-light-border dark:border-dark-border hover:shadow-lg transition-shadow duration-300">
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                    {item.event}
                  </h3>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full text-center group">
                    <div className="w-16 h-16 bg-light-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-light-primary dark:text-dark-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-3">
                      {value.title}
                    </h3>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-light-text dark:text-dark-text mb-8">
              Certifications & Accreditations
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {['RBI Approved', 'ISO 9001:2015', 'NBFC Registered', 'CIBIL Partner'].map(
                (cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="px-8 py-4 bg-light-surface dark:bg-dark-surface rounded-xl border-2 border-light-primary dark:border-dark-primary"
                  >
                    <span className="text-lg font-semibold text-light-text dark:text-dark-text">
                      {cert}
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
