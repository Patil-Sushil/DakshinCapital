// EMI Calculator Component - Main calculator with sliders and charts
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download, Printer, Share2, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { COMPANY_INFO } from '../../utils/constants';
import {
  calculateLoanDetails,
  generateYearlySummary,
  formatCurrency,
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

  const AMOUNT_MIN = 100000;
  const AMOUNT_MAX = 10000000;
  const RATE_MIN = 5;
  const RATE_MAX = 20;
  const TENURE_MIN_YEARS = 1;
  const TENURE_MAX_YEARS = 30;
  const TENURE_MIN_MONTHS = 12;
  const TENURE_MAX_MONTHS = 360;

  const quickAmounts = [500000, 1000000, 2500000, 5000000];

  const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

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
    if (!loanDetails || yearlySummary.length === 0) return;

    const tenureInMonths = tenureType === 'years' ? yearsToMonths(loanTenure) : loanTenure;

    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) return;

    const scheduleRows = yearlySummary
      .map(
        (year) => `
          <tr>
            <td>Year ${year.year}</td>
            <td>${formatCurrency(year.principal)}</td>
            <td>${formatCurrency(year.interest)}</td>
            <td><strong>${formatCurrency(year.total)}</strong></td>
            <td>${formatCurrency(year.balance)}</td>
          </tr>
        `
      )
      .join('');

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Yearly Payment Schedule</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 24px;
              color: #111827;
            }
            .business-card {
              margin: 0 0 16px;
              padding: 14px;
              border: 1px solid #d1d5db;
              border-radius: 10px;
              background: #fafafa;
            }
            .business-title {
              font-size: 18px;
              margin: 0 0 6px;
              font-weight: 700;
            }
            .business-subtitle {
              font-size: 13px;
              color: #4b5563;
              margin: 0 0 10px;
            }
            .business-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px 16px;
              font-size: 13px;
            }
            h1 {
              font-size: 22px;
              margin: 0 0 8px;
            }
            .meta {
              margin-bottom: 16px;
              font-size: 13px;
              color: #4b5563;
            }
            .summary {
              padding: 12px;
              background: #f3f4f6;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              margin-bottom: 16px;
              font-size: 14px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
            }
            th,
            td {
              border: 1px solid #d1d5db;
              padding: 8px 10px;
              text-align: left;
            }
            th {
              background: #e5e7eb;
              font-weight: 700;
            }
            @media print {
              body {
                margin: 12mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="business-card">
            <div class="business-title">${COMPANY_INFO.name}</div>
            <div class="business-subtitle">${COMPANY_INFO.tagline}</div>
            <div class="business-grid">
              <div><strong>Location:</strong> ${COMPANY_INFO.address}</div>
              <div><strong>Contact:</strong> ${COMPANY_INFO.phone}</div>
              <div><strong>Email:</strong> ${COMPANY_INFO.email}</div>
              <div><strong>Working Hours:</strong> ${COMPANY_INFO.workingHours.weekdays} | ${COMPANY_INFO.workingHours.saturday}</div>
            </div>
          </div>
          <h1>Yearly Payment Schedule</h1>
          <div class="meta">Generated on ${new Date().toLocaleString()}</div>
          <div class="summary">
            Loan Amount: ${formatCurrency(loanAmount)}<br />
            Interest Rate: ${interestRate}% p.a.<br />
            Tenure: ${loanTenure} ${tenureType} (${tenureInMonths} months)
          </div>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total Payment</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${scheduleRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleLoanAmountChange = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setLoanAmount(clampValue(parsed, AMOUNT_MIN, AMOUNT_MAX));
  };

  const handleInterestRateChange = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    setInterestRate(clampValue(parsed, RATE_MIN, RATE_MAX));
  };

  const handleLoanTenureChange = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;

    if (tenureType === 'years') {
      setLoanTenure(clampValue(parsed, TENURE_MIN_YEARS, TENURE_MAX_YEARS));
      return;
    }

    setLoanTenure(clampValue(parsed, TENURE_MIN_MONTHS, TENURE_MAX_MONTHS));
  };

  const handleTenureTypeChange = (newType) => {
    if (newType === tenureType) return;

    if (newType === 'months') {
      setLoanTenure(clampValue(yearsToMonths(loanTenure), TENURE_MIN_MONTHS, TENURE_MAX_MONTHS));
    } else {
      setLoanTenure(clampValue(Math.round(loanTenure / 12), TENURE_MIN_YEARS, TENURE_MAX_YEARS));
    }

    setTenureType(newType);
  };

  // Handle download as Excel report with full details
  const handleDownload = () => {
    if (!loanDetails) {
      alert('Report is not ready yet. Please try again in a moment.');
      return;
    }

    const reportDate = new Date();
    const tenureInMonths = tenureType === 'years' ? yearsToMonths(loanTenure) : loanTenure;

    const workbook = XLSX.utils.book_new();

    const summarySheet = XLSX.utils.aoa_to_sheet([
      ['EMI Calculator Report'],
      ['Generated On', reportDate.toLocaleString()],
      [],
      ['Business Information', 'Details'],
      ['Company Name', COMPANY_INFO.name],
      ['Tagline', COMPANY_INFO.tagline],
      ['Location', COMPANY_INFO.address],
      ['Email', COMPANY_INFO.email],
      ['Contact Number', COMPANY_INFO.phone],
      [
        'Working Hours',
        `${COMPANY_INFO.workingHours.weekdays} | ${COMPANY_INFO.workingHours.saturday}`,
      ],
      [],
      ['Input Parameters', 'Value'],
      ['Loan Amount', loanAmount],
      ['Interest Rate (Annual %)', interestRate],
      ['Loan Tenure', `${loanTenure} ${tenureType}`],
      ['Loan Tenure (Months)', tenureInMonths],
      [],
      ['Calculation Summary', 'Value'],
      ['Monthly EMI', loanDetails.emi],
      ['Principal Amount', loanDetails.principal],
      ['Total Interest', loanDetails.totalInterest],
      ['Total Payment', loanDetails.totalPayment],
    ]);

    const yearlySchedule = yearlySummary.map((year) => ({
      Year: year.year,
      Principal: year.principal,
      Interest: year.interest,
      'Total Payment': year.total,
      Balance: year.balance,
    }));

    const scheduleSheet = XLSX.utils.json_to_sheet(yearlySchedule);

    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
    XLSX.utils.book_append_sheet(workbook, scheduleSheet, 'Yearly Schedule');

    const fileDate = reportDate.toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `emi-report-${fileDate}.xlsx`);
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
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-light-primary/8 via-light-accent/10 to-transparent dark:from-dark-primary/15 dark:via-dark-accent/10 dark:to-transparent" />
          <div className="relative p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text">
                    EMI Planner
                  </h2>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                    Type values directly or use sliders for quick adjustments.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-light-surface/70 dark:bg-dark-surface/60 border border-light-border dark:border-dark-border">
                <div className="text-xs uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                  Estimated Monthly EMI
                </div>
                <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                  {formatCurrency(loanDetails?.emi)}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/60 dark:bg-dark-surface/70 border border-light-border dark:border-dark-border space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-light-text dark:text-dark-text">
                    Loan Amount
                  </label>
                  <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                    ₹1L - ₹1Cr
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={AMOUNT_MIN}
                    max={AMOUNT_MAX}
                    step={100000}
                    value={loanAmount}
                    onChange={(e) => handleLoanAmountChange(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text font-semibold focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                  />
                </div>
                <input
                  type="range"
                  min={AMOUNT_MIN}
                  max={AMOUNT_MAX}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => handleLoanAmountChange(e.target.value)}
                  className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
                />
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setLoanAmount(amount)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        loanAmount === amount
                          ? 'bg-light-primary dark:bg-dark-primary text-white border-transparent'
                          : 'bg-light-surface dark:bg-dark-surface text-light-textSecondary dark:text-dark-textSecondary border-light-border dark:border-dark-border hover:text-light-text dark:hover:text-dark-text'
                      }`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/60 dark:bg-dark-surface/70 border border-light-border dark:border-dark-border space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-semibold text-light-text dark:text-dark-text">
                      Interest Rate (p.a.)
                    </label>
                    <input
                      type="number"
                      min={RATE_MIN}
                      max={RATE_MAX}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => handleInterestRateChange(e.target.value)}
                      className="w-28 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-right text-light-text dark:text-dark-text font-semibold focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    />
                  </div>
                  <input
                    type="range"
                    min={RATE_MIN}
                    max={RATE_MAX}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => handleInterestRateChange(e.target.value)}
                    className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-semibold text-light-text dark:text-dark-text">
                      Loan Tenure
                    </label>
                    <div className="flex bg-light-surface dark:bg-dark-surface rounded-lg p-1 border border-light-border dark:border-dark-border">
                      <button
                        type="button"
                        onClick={() => handleTenureTypeChange('years')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          tenureType === 'years'
                            ? 'bg-light-primary dark:bg-dark-primary text-white'
                            : 'text-light-textSecondary dark:text-dark-textSecondary'
                        }`}
                      >
                        Years
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTenureTypeChange('months')}
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

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                      {tenureType === 'years' ? '1 to 30 years' : '12 to 360 months'}
                    </span>
                    <input
                      type="number"
                      min={tenureType === 'years' ? TENURE_MIN_YEARS : TENURE_MIN_MONTHS}
                      max={tenureType === 'years' ? TENURE_MAX_YEARS : TENURE_MAX_MONTHS}
                      step={1}
                      value={loanTenure}
                      onChange={(e) => handleLoanTenureChange(e.target.value)}
                      className="w-28 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-right text-light-text dark:text-dark-text font-semibold focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    />
                  </div>

                  <input
                    type="range"
                    min={tenureType === 'years' ? TENURE_MIN_YEARS : TENURE_MIN_MONTHS}
                    max={tenureType === 'years' ? TENURE_MAX_YEARS : TENURE_MAX_MONTHS}
                    step={1}
                    value={loanTenure}
                    onChange={(e) => handleLoanTenureChange(e.target.value)}
                    className="w-full h-2 bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
                  />
                </div>
              </div>
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
            Download Excel
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
