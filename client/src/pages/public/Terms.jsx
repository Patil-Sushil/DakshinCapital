// Terms & Conditions Page
import PageHeader from '../../components/common/PageHeader';
import { FileText, Scale, AlertTriangle, Shield, Users, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

const Terms = () => {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        {
          text: "By accessing and using FinancePro's website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
        },
        {
          text: 'These terms apply to all visitors, users, and others who access or use our services, including but not limited to loan applicants, borrowers, and website visitors.',
        },
      ],
    },
    {
      icon: Users,
      title: 'Use License',
      content: [
        {
          subtitle: 'Permitted Use',
          text: 'You are granted a limited, non-exclusive, non-transferable license to access and use our website and services for personal, non-commercial purposes in accordance with these terms.',
        },
        {
          subtitle: 'Restrictions',
          text: 'You may not: modify or copy our materials, use materials for commercial purposes, attempt to reverse engineer any software, remove copyright or proprietary notations, or transfer materials to another person.',
        },
      ],
    },
    {
      icon: AlertTriangle,
      title: 'User Obligations',
      content: [
        {
          subtitle: 'Accurate Information',
          text: 'You agree to provide accurate, current, and complete information during the loan application process. Providing false or misleading information may result in rejection of your application or legal action.',
        },
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.',
        },
        {
          subtitle: 'Compliance',
          text: 'You agree to comply with all applicable laws and regulations when using our services, including but not limited to financial regulations and data protection laws.',
        },
      ],
    },
    {
      icon: Ban,
      title: 'Disclaimer of Warranties',
      content: [
        {
          text: 'Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or free of viruses or other harmful components.',
        },
        {
          text: 'We make no guarantees regarding loan approval. All loan applications are subject to credit approval and verification of information provided.',
        },
        {
          text: 'Interest rates, fees, and terms are subject to change without notice and may vary based on individual circumstances and creditworthiness.',
        },
      ],
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: [
        {
          text: 'FinancePro shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.',
        },
        {
          text: 'Our total liability to you for all claims arising from or related to our services shall not exceed the amount of fees paid by you to us in the twelve months preceding the claim.',
        },
        {
          text: 'Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      content: [
        {
          subtitle: 'Ownership',
          text: 'All content on our website, including text, graphics, logos, images, and software, is the property of FinancePro or its licensors and is protected by copyright and intellectual property laws.',
        },
        {
          subtitle: 'Trademarks',
          text: 'FinancePro and our logo are trademarks of our company. You may not use these trademarks without our prior written permission.',
        },
      ],
    },
  ];

  const additionalTerms = [
    {
      title: 'Loan Terms and Conditions',
      points: [
        'All loans are subject to credit approval and verification',
        'Interest rates may vary based on credit score and loan amount',
        'Processing fees and other charges apply as per loan agreement',
        'Prepayment and foreclosure charges may apply',
        'Late payment fees will be charged for overdue EMIs',
      ],
    },
    {
      title: 'Termination',
      points: [
        'We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties',
        'Upon termination, your right to use our services will immediately cease',
        'All provisions of these terms which by their nature should survive termination shall survive',
      ],
    },
    {
      title: 'Governing Law',
      points: [
        'These terms shall be governed by and construed in accordance with the laws of India',
        'Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Mumbai, India',
        'You agree to submit to the personal jurisdiction of such courts',
      ],
    },
  ];

  return (
    <div className="pt-20">
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services"
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom max-w-5xl">
          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 border border-light-border dark:border-dark-border mb-12"
          >
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mt-2">
              These Terms and Conditions govern your use of FinancePro's website and services. By
              using our services, you agree to comply with and be bound by these terms. Please read
              them carefully.
            </p>
          </motion.div>

          {/* Main Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-light-surface dark:bg-dark-surface rounded-xl p-8 border border-light-border dark:border-dark-border"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4 ml-16">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                            {item.subtitle}
                          </h3>
                        )}
                        <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Terms */}
          <div className="mt-12 space-y-8">
            {additionalTerms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-light-surface dark:bg-dark-surface rounded-xl p-8 border border-light-border dark:border-dark-border"
              >
                <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
                  {term.title}
                </h2>
                <ul className="space-y-3">
                  {term.points.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-light-primary dark:bg-dark-primary flex-shrink-0 mt-2" />
                      <span className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-xl p-8 text-white"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">Questions About These Terms?</h2>
            <p className="mb-6 text-white/90">
              If you have any questions or concerns about these Terms and Conditions, please contact
              us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> legal@financepro.com
              </p>
              <p>
                <strong>Phone:</strong> +91 123 456 7890
              </p>
              <p>
                <strong>Address:</strong> 123 Finance Street, Business District, City - 400001
              </p>
            </div>
          </motion.div>

          {/* Changes Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 p-6 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border"
          >
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
              Changes to Terms
            </h3>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              We reserve the right to modify these Terms and Conditions at any time. We will notify
              users of any material changes by posting the new terms on this page and updating the
              "Last Updated" date. Your continued use of our services after such modifications
              constitutes your acceptance of the updated terms.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
