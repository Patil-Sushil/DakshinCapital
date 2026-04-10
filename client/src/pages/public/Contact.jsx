// Contact Page - Complete contact page with form and info
import PageHeader from '../../components/common/PageHeader';
import EnquiryForm from '../../components/forms/EnquiryForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import { COMPANY_INFO, SOCIAL_LINKS } from '../../utils/constants';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [COMPANY_INFO.address],
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-600/10',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [COMPANY_INFO.phone, 'Toll Free: 1800-123-4567'],
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-600/10',
      link: `tel:${COMPANY_INFO.phone}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [COMPANY_INFO.email, 'support@financepro.com'],
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-600/10',
      link: `mailto:${COMPANY_INFO.email}`,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: [COMPANY_INFO.workingHours.weekdays, COMPANY_INFO.workingHours.saturday],
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-600/10',
    },
  ];

  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: SOCIAL_LINKS.facebook, color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: SOCIAL_LINKS.twitter, color: 'hover:text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, url: SOCIAL_LINKS.linkedin, color: 'hover:text-blue-700' },
    {
      name: 'Instagram',
      icon: Instagram,
      url: SOCIAL_LINKS.instagram,
      color: 'hover:text-pink-600',
    },
    { name: 'YouTube', icon: Youtube, url: SOCIAL_LINKS.youtube, color: 'hover:text-red-600' },
  ];

  return (
    <div className="pt-20">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with us for any queries or loan applications"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      {/* Contact Info Cards */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full text-center group">
                    <div
                      className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 ${info.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-light-textSecondary dark:text-dark-textSecondary"
                        >
                          {info.link && idx === 0 ? (
                            <a
                              href={info.link}
                              className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text mb-6">
                  Send Us a Message
                </h2>
                <EnquiryForm variant="full" />
              </Card>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Google Map */}
              <Card padding={false} className="overflow-hidden">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.523789!2d74.6077466!3d16.8426227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc123b76976ede3%3A0x14b6066982d3d3a9!2sGovind%20Plaza!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location - Govind Plaza, Sangli"
                  />
                </div>
              </Card>

              {/* WhatsApp Contact */}
              <Card>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-green-600/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1">
                      Quick Support on WhatsApp
                    </h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-3">
                      Get instant answers to your queries
                    </p>
                    <a
                      href={SOCIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                  Connect With Us
                </h3>
                <div className="flex items-center space-x-3">
                  {socialMedia.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center justify-center text-light-textSecondary dark:text-dark-textSecondary ${social.color} transition-all duration-200 hover:scale-110`}
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </Card>

              {/* Business Hours */}
              <Card>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">
                      Monday - Friday
                    </span>
                    <span className="font-medium text-light-text dark:text-dark-text">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">
                      Saturday
                    </span>
                    <span className="font-medium text-light-text dark:text-dark-text">
                      9:00 AM - 2:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">
                      Sunday
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">Closed</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-light-surface dark:bg-dark-surface">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text mb-8 text-center">
              Common Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How long does it take to process a loan application?',
                  a: 'Most loan applications are processed within 24-48 hours. Once approved, funds are typically disbursed within 3-5 business days.',
                },
                {
                  q: 'What documents do I need to apply?',
                  a: 'Basic documents include identity proof (Aadhaar/PAN), address proof, income proof (salary slips/ITR), and bank statements for the last 6 months.',
                },
                {
                  q: 'Can I prepay my loan without penalty?',
                  a: 'Yes, we offer flexible prepayment options. Some loan types may have minimal charges. Please check with our team for specific terms.',
                },
                {
                  q: 'Do you offer loans to self-employed individuals?',
                  a: 'Absolutely! We provide loans to both salaried and self-employed individuals with competitive rates and flexible terms.',
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary">{faq.a}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
