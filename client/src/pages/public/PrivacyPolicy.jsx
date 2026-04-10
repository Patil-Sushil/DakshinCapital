// Privacy Policy Page
import PageHeader from '../../components/common/PageHeader';
import { Shield, Lock, Eye, FileText, Users, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect personal information that you provide to us when applying for loans or using our services, including your name, email address, phone number, date of birth, PAN card, Aadhaar number, address, employment details, and financial information.',
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device.',
        },
        {
          subtitle: 'Third-Party Information',
          text: 'We may receive information about you from credit bureaus, financial institutions, and other third parties to verify your identity and assess your creditworthiness.',
        },
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to process loan applications, verify your identity, assess creditworthiness, communicate with you about your application, and provide customer support.',
        },
        {
          subtitle: 'Improvement and Analytics',
          text: 'We analyze usage patterns to improve our services, develop new features, and enhance user experience. This helps us understand how customers interact with our platform.',
        },
        {
          subtitle: 'Legal Compliance',
          text: 'We use your information to comply with legal obligations, prevent fraud, enforce our terms and conditions, and protect our rights and the rights of our customers.',
        },
      ],
    },
    {
      icon: Lock,
      title: 'Data Security Measures',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All sensitive data is encrypted using industry-standard SSL/TLS protocols during transmission. We use AES-256 encryption for data at rest.',
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls to ensure that only authorized personnel can access your personal information. All access is logged and monitored.',
        },
        {
          subtitle: 'Regular Audits',
          text: 'We conduct regular security audits and vulnerability assessments to identify and address potential security risks.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Cookie Policy',
      content: [
        {
          subtitle: 'What Are Cookies',
          text: 'Cookies are small text files stored on your device that help us provide and improve our services. We use both session cookies (temporary) and persistent cookies (stored longer).',
        },
        {
          subtitle: 'Types of Cookies We Use',
          text: 'Essential cookies for website functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings and choices.',
        },
        {
          subtitle: 'Managing Cookies',
          text: 'You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.',
        },
      ],
    },
    {
      icon: Users,
      title: 'Third-Party Links',
      content: [
        {
          subtitle: 'External Websites',
          text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.',
        },
        {
          subtitle: 'Third-Party Services',
          text: 'We may use third-party service providers to help us operate our business. These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect it.',
        },
      ],
    },
    {
      icon: AlertCircle,
      title: 'Your Rights',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access your personal information and request corrections if it is inaccurate or incomplete.',
        },
        {
          subtitle: 'Data Deletion',
          text: 'You can request deletion of your personal information, subject to legal and regulatory requirements. Some information may need to be retained for compliance purposes.',
        },
        {
          subtitle: 'Opt-Out',
          text: 'You can opt-out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.',
        },
      ],
    },
  ];

  return (
    <div className="pt-20">
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
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
              At FinancePro, we are committed to protecting your privacy and ensuring the security
              of your personal information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our services.
            </p>
          </motion.div>

          {/* Sections */}
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

                  <div className="space-y-6 ml-16">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                          {item.subtitle}
                        </h3>
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-xl p-8 text-white"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">Questions About Privacy?</h2>
            <p className="mb-6 text-white/90">
              If you have any questions or concerns about our Privacy Policy or how we handle your
              data, please don't hesitate to contact us.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> privacy@financepro.com
              </p>
              <p>
                <strong>Phone:</strong> +91 123 456 7890
              </p>
              <p>
                <strong>Address:</strong> 123 Finance Street, Business District, City - 400001
              </p>
            </div>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 p-6 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border"
          >
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
              Changes to This Privacy Policy
            </h3>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for legal, operational, or regulatory reasons. We will notify you of any
              material changes by posting the new Privacy Policy on this page and updating the "Last
              Updated" date. We encourage you to review this Privacy Policy periodically to stay
              informed about how we protect your information.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
