// EMI Calculator Page - Complete page with calculator and eligibility
import PageHeader from '../../components/common/PageHeader';
import EMICalculator from '../../components/calculators/EMICalculator';
import LoanEligibility from '../../components/calculators/LoanEligibility';
import InterestComparison from '../../components/calculators/InterestComparison';
import { Calculator, TrendingUp, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

const EMICalculatorPage = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Accurate Calculations',
      description: 'Get precise EMI calculations using standard banking formulas',
    },
    {
      icon: TrendingUp,
      title: 'Eligibility Check',
      description: 'Know how much loan you can get based on your income',
    },
    {
      icon: BarChart3,
      title: 'Visual Charts',
      description: 'Understand your loan breakdown with interactive charts',
    },
  ];

  return (
    <div className="pt-20">
      <PageHeader
        title="EMI Calculator"
        subtitle="Calculate your monthly loan payments and check eligibility instantly"
        breadcrumbs={[{ label: 'EMI Calculator' }]}
      />

      {/* Features */}
      <section className="py-12 bg-light-background dark:bg-dark-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <div className="w-14 h-14 bg-light-primary/10 dark:bg-dark-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-light-primary dark:text-dark-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom max-w-6xl">
          <EMICalculator />
        </div>
      </section>

      {/* Additional Calculators */}
      <section className="section-padding bg-light-surface dark:bg-dark-surface">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Loan Eligibility */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LoanEligibility />
            </motion.div>

            {/* Interest Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <InterestComparison />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-light-background dark:bg-dark-background">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How is EMI calculated?',
                  a: 'EMI is calculated using the formula: [P × R × (1+R)^N] / [(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the tenure in months.',
                },
                {
                  q: 'Can I prepay my loan?',
                  a: 'Yes, most loans allow prepayment. However, some lenders may charge a prepayment penalty. Check with your lender for specific terms.',
                },
                {
                  q: 'What factors affect my loan eligibility?',
                  a: 'Your loan eligibility depends on your monthly income, existing EMI obligations, credit score, employment stability, and the loan tenure you choose.',
                },
                {
                  q: 'Is the EMI calculator result accurate?',
                  a: "Yes, our calculator uses standard banking formulas. However, the actual EMI may vary slightly based on your lender's specific terms and processing fees.",
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

export default EMICalculatorPage;
