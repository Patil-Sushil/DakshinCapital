// Loan Eligibility Calculator Component
import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import {
  calculateLoanEligibility,
  formatCurrency,
  yearsToMonths,
} from '../../utils/emiCalculations';

const LoanEligibility = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [eligibleLoan, setEligibleLoan] = useState(0);

  useEffect(() => {
    const availableIncome = monthlyIncome - existingEMI;
    const tenureMonths = yearsToMonths(loanTenure);
    const eligible = calculateLoanEligibility(availableIncome, interestRate, tenureMonths);
    setEligibleLoan(eligible > 0 ? eligible : 0);
  }, [monthlyIncome, existingEMI, interestRate, loanTenure]);

  const eligibilityPercentage = ((monthlyIncome - existingEMI) / monthlyIncome) * 100;

  return (
    <Card className="border border-light-border dark:border-blue-900/40 bg-light-card dark:bg-slate-950/60 shadow-lg shadow-blue-900/5">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text">
          Check Loan Eligibility
        </h2>
      </div>

      <div className="space-y-6">
        {/* Monthly Income */}
        <div className="p-4 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-light-text dark:text-dark-text flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Monthly Income</span>
            </label>
            <div className="text-xl font-bold text-light-primary dark:text-dark-primary">
              {formatCurrency(monthlyIncome)}
            </div>
          </div>
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
            <span>₹10K</span>
            <span>₹5L</span>
          </div>
        </div>

        {/* Existing EMI */}
        <div className="p-4 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-light-text dark:text-dark-text">
              Existing EMI (if any)
            </label>
            <div className="text-xl font-bold text-light-primary dark:text-dark-primary">
              {formatCurrency(existingEMI)}
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={existingEMI}
            onChange={(e) => setExistingEMI(Number(e.target.value))}
            className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
            <span>₹0</span>
            <span>₹1L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="p-4 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-light-text dark:text-dark-text flex items-center space-x-2">
              <Percent className="w-4 h-4" />
              <span>Expected Interest Rate</span>
            </label>
            <div className="text-xl font-bold text-light-primary dark:text-dark-primary">
              {interestRate}%
            </div>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
            <span>5%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="p-4 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-light-text dark:text-dark-text flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Loan Tenure</span>
            </label>
            <div className="text-xl font-bold text-light-primary dark:text-dark-primary">
              {loanTenure} years
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
            <span>1 Year</span>
            <span>30 Years</span>
          </div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 space-y-4"
        >
          {/* Eligible Loan Amount */}
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">You are eligible for</div>
            <div className="text-4xl font-bold mb-4">{formatCurrency(eligibleLoan)}</div>
            <Badge className="bg-white/20 text-white border-white/30">
              Based on 50% income rule
            </Badge>
          </div>

          {/* Income Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 border border-light-border dark:border-dark-border">
              <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">
                Available Income
              </div>
              <div className="text-lg font-semibold text-light-text dark:text-dark-text">
                {formatCurrency(monthlyIncome - existingEMI)}
              </div>
            </div>
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 border border-light-border dark:border-dark-border">
              <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-1">
                Eligibility
              </div>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                {eligibilityPercentage.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-light-textSecondary dark:text-dark-textSecondary mb-2">
              <span>Income Utilization</span>
              <span>{eligibilityPercentage.toFixed(0)}% Available</span>
            </div>
            <div className="w-full h-3 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${eligibilityPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 Tips to Improve Eligibility
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Close existing loans to reduce EMI burden</li>
              <li>• Increase your income through additional sources</li>
              <li>• Maintain a good credit score (750+)</li>
              <li>• Consider a co-applicant to increase eligibility</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default LoanEligibility;
