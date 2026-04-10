// Why Choose Us Section - Benefits showcase
import { CheckCircle, Award, Headphones, FileText, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Transparent Process',
      description: 'No hidden charges or surprise fees. Complete transparency in all transactions.',
    },
    {
      icon: Award,
      title: 'RBI Approved',
      description: 'Fully licensed and regulated by Reserve Bank of India for your safety.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.',
    },
    {
      icon: FileText,
      title: 'Easy Documentation',
      description: 'Minimal paperwork with digital verification for faster loan processing.',
    },
    {
      icon: CreditCard,
      title: 'Flexible Repayment',
      description: 'Choose EMI plans that suit your budget with prepayment options.',
    },
    {
      icon: Sparkles,
      title: 'Special Offers',
      description: 'Exclusive deals and discounts for our valued customers.',
    },
  ];

  return (
    <section className="section-padding bg-light-surface dark:bg-dark-surface">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-light-text dark:text-dark-text mb-6">
              Why Thousands Choose FinancePro
            </h2>
            <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary mb-8 leading-relaxed">
              We're committed to providing the best financial solutions with customer satisfaction
              as our top priority. Here's what makes us different from others.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              {[
                'Instant loan approval within 24 hours',
                'Interest rates starting from 8.5% per annum',
                'Loan amount up to ₹1 Crore',
                'Tenure options from 1 to 30 years',
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-light-success dark:text-dark-success flex-shrink-0 mt-0.5" />
                  <span className="text-light-text dark:text-dark-text">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-light-background dark:bg-dark-background rounded-xl p-6 border border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
