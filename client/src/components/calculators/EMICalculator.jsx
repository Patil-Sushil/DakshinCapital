// EMI Calculator Component - Main calculator with sliders and charts
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download, Printer, Share2, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import {
  calculateLoanDetails,
  generateYearlySummary,
  formatCurrency,
  formatNumber,
  yearsToMonths,
} from '../../utils/emiCalculations';

const EMICalculator = () => {
  // State for loan parameters
  const [loanAmount, setLoanAmount] = useState(2500000); // ₹25 Lakhs
  const [interestRate, setInterestRate] = useState(9.5); // 9.5%
  const [loanTenure, setLoanTenure] = useState(20); // 20 years
  const [tenureType, setTenureType] = useState('years'); // years or months

  // Calculated values
  const [loanDetails, setLoanDetails] = useState(null);
  const [yearlySummary, setYearlySummary] = useState([]);

  // Calculate EMI whenever inputs change
  useEffect(() => {
    const tenureInMonths = tenureType === 'years' ? yearsToMonths(loanTenure) : loanTenure;
    const details = calculateLoanDetails(loanAmount, interestRate, tenureInMonths);
    const summary = generateYearlySummary(loanAmount, interestRate, tenureInMonths);

    setLoanDetails(details);
    setYearlySummary(summary);
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  // Chart data
  const chartData = loanDetails
    ? [
        { name: 'Principal Amount', value: loanDetails.principal, color: '#3B82F6' },
        { name: 'Total Interest', value: loanDetails.totalInterest, color: '#F59E0B' },
      ]
    : [];

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle download (simplified - in production, use a library like jsPDF)
  const handleDownload = () => {
    const content = `
EMI Calculator Results
=====================

Loan Amount: ${formatCurrency(loanAmount)}
Interest Rate: ${interestRate}% per annum
Loan Tenure: ${loanTenure} ${tenureType}

Monthly EMI: ${formatCurrency(loanDetails?.emi)}
Total Interest: ${formatCurrency(loanDetails?.totalInterest)}
Total Payment: ${formatCurrency(loanDetails?.totalPayment)}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emi-calculation.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: 'EMI Calculator Results',
      text: `Monthly EMI: ${formatCurrency(loanDetails?.emi)} for loan of ${formatCurrency(loanAmount)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Calculator Inputs */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-light-primary dark:text-dark-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text">
            Calculate Your EMI
          </h2>
        </div>

        <div className="space-y-8">
          {/* Loan Amount Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-light-text dark:text-dark-text">
                Loan Amount
              </label>
              <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                {formatCurrency(loanAmount)}
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
            />
            <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
              <span>₹1L</span>
              <span>₹1Cr</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-light-text dark:text-dark-text">
                Interest Rate (per annum)
              </label>
              <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">
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
              className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
            />
            <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Loan Tenure Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-light-text dark:text-dark-text">
                Loan Tenure
              </label>
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                  {loanTenure} {tenureType}
                </div>
                <div className="flex bg-light-surface dark:bg-dark-surface rounded-lg p-1 border border-light-border dark:border-dark-border">
                  <button
                    onClick={() => setTenureType('years')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      tenureType === 'years'
                        ? 'bg-light-primary dark:bg-dark-primary text-white'
                        : 'text-light-textSecondary dark:text-dark-textSecondary'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    onClick={() => setTenureType('months')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      tenureType === 'months'
                        ? 'bg-light-primary dark:bg-dark-primary text-white'
                        : 'text-light-textSecondary dark:text-dark-textSecondary'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
            </div>
            <input
              type="range"
              min={tenureType === 'years' ? 1 : 12}
              max={tenureType === 'years' ? 30 : 360}
              step={1}
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
            />
            <div className="flex justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
              <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
              <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* EMI Breakdown */}
        <Card>
          <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-6">
            EMI Breakdown
          </h3>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">Monthly EMI</div>
              <div className="text-4xl font-bold">{formatCurrency(loanDetails?.emi)}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Principal Amount
                  </div>
                  <div className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(loanDetails?.principal)}
                  </div>
                </div>
                <Badge variant="primary">Principal</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Total Interest
                  </div>
                  <div className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(loanDetails?.totalInterest)}
                  </div>
                </div>
                <Badge variant="warning">Interest</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                <div>
                  <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Total Payment
                  </div>
                  <div className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(loanDetails?.totalPayment)}
                  </div>
                </div>
                <Badge variant="success">Total</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card>
          <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-6">
            Payment Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button icon={Printer} onClick={handlePrint} variant="outline">
            Print
          </Button>
          <Button icon={Download} onClick={handleDownload} variant="outline">
            Download
          </Button>
          <Button icon={Share2} onClick={handleShare} variant="outline">
            Share
          </Button>
        </div>
      </Card>

      {/* Yearly Amortization Schedule */}
      <Card>
        <h3 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text mb-6">
          Yearly Payment Schedule
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text">
                  Year
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text">
                  Principal
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text">
                  Interest
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text">
                  Total Payment
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-light-text dark:text-dark-text">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {yearlySummary.map((year) => (
                <motion.tr
                  key={year.year}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: year.year * 0.05 }}
                  className="border-b border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-light-text dark:text-dark-text">
                    Year {year.year}
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-light-text dark:text-dark-text">
                    {formatCurrency(year.principal)}
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-light-text dark:text-dark-text">
                    {formatCurrency(year.interest)}
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(year.total)}
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-light-textSecondary dark:text-dark-textSecondary">
                    {formatCurrency(year.balance)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default EMICalculator;
