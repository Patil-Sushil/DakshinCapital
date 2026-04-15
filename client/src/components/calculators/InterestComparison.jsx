// Interest Comparison Calculator Component
import { useState, useEffect } from 'react';
import { BarChart3, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { calculateLoanDetails, formatCurrency, yearsToMonths } from '../../utils/emiCalculations';

const InterestComparison = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [loanTenure, setLoanTenure] = useState(20);
  const [rates, setRates] = useState([
    { id: 1, rate: 8.5, name: 'Bank A' },
    { id: 2, rate: 9.5, name: 'Bank B' },
    { id: 3, rate: 10.5, name: 'Bank C' },
  ]);
  const [comparisons, setComparisons] = useState([]);

  useEffect(() => {
    const tenureMonths = yearsToMonths(loanTenure);
    const results = rates.map((rateInfo) => {
      const details = calculateLoanDetails(loanAmount, rateInfo.rate, tenureMonths);
      return {
        ...rateInfo,
        ...details,
      };
    });
    setComparisons(results);
  }, [loanAmount, loanTenure, rates]);

  const addRate = () => {
    const newId = Math.max(...rates.map((r) => r.id), 0) + 1;
    setRates([
      ...rates,
      { id: newId, rate: 9.0, name: `Bank ${String.fromCharCode(65 + rates.length)}` },
    ]);
  };

  const removeRate = (id) => {
    if (rates.length > 1) {
      setRates(rates.filter((r) => r.id !== id));
    }
  };

  const updateRate = (id, newRate) => {
    setRates(rates.map((r) => (r.id === id ? { ...r, rate: newRate } : r)));
  };

  const updateName = (id, newName) => {
    setRates(rates.map((r) => (r.id === id ? { ...r, name: newName } : r)));
  };

  const bestRate =
    comparisons.length > 0
      ? comparisons.reduce((min, curr) => (curr.totalPayment < min.totalPayment ? curr : min))
      : null;

  const inputBaseClass =
    'w-full rounded-xl border border-light-border dark:border-blue-800/60 bg-white dark:bg-slate-900/70 px-4 py-3 text-light-text dark:text-slate-100 placeholder:text-light-textMuted dark:placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-blue-500 focus:border-light-primary dark:focus:border-blue-500';

  return (
    <Card className="border border-light-border dark:border-blue-900/40 bg-light-card dark:bg-slate-950/60 shadow-lg shadow-blue-900/5">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-light-text dark:text-dark-text">
          Compare Interest Rates
        </h2>
      </div>

      <div className="space-y-6">
        {/* Loan Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35">
            <label className="text-sm font-medium text-light-text dark:text-dark-text mb-2 block">
              Loan Amount
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className={inputBaseClass}
              min="100000"
              max="10000000"
              step="100000"
            />
          </div>
          <div className="p-4 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35">
            <label className="text-sm font-medium text-light-text dark:text-dark-text mb-2 block">
              Tenure (Years)
            </label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className={inputBaseClass}
              min="1"
              max="30"
            />
          </div>
        </div>

        {/* Interest Rates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-light-text dark:text-dark-text">
              Interest Rates to Compare
            </label>
            <Button
              size="sm"
              variant="outline"
              icon={Plus}
              onClick={addRate}
              disabled={rates.length >= 5}
            >
              Add Rate
            </Button>
          </div>

          <AnimatePresence>
            {rates.map((rateInfo, index) => (
              <motion.div
                key={rateInfo.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 p-3 rounded-xl bg-light-surface/70 dark:bg-slate-900/45 border border-light-border dark:border-blue-900/35"
              >
                <input
                  type="text"
                  value={rateInfo.name}
                  onChange={(e) => updateName(rateInfo.id, e.target.value)}
                  className={`${inputBaseClass} flex-1`}
                  placeholder="Bank Name"
                />
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={rateInfo.rate}
                    onChange={(e) => updateRate(rateInfo.id, Number(e.target.value))}
                    className={`${inputBaseClass} w-full pr-10`}
                    min="5"
                    max="20"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-slate-400 font-semibold">
                    %
                  </span>
                </div>
                {rates.length > 1 && (
                  <button
                    onClick={() => removeRate(rateInfo.id)}
                    className="p-2 text-light-error dark:text-dark-error hover:bg-light-error/10 dark:hover:bg-dark-error/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comparison Results */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
            Comparison Results
          </h3>
          {comparisons.map((comp, index) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all ${
                bestRate && comp.id === bestRate.id
                  ? 'border-green-500/70 bg-green-50 dark:bg-green-900/20'
                  : 'border-light-border dark:border-blue-900/40 bg-light-surface dark:bg-slate-900/45'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-light-text dark:text-dark-text">
                    {comp.name}
                  </span>
                  <Badge variant={bestRate && comp.id === bestRate.id ? 'success' : 'default'}>
                    {comp.rate}%
                  </Badge>
                  {bestRate && comp.id === bestRate.id && (
                    <Badge variant="success">Best Rate</Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Monthly EMI
                  </div>
                  <div className="font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(comp.emi)}
                  </div>
                </div>
                <div>
                  <div className="text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Total Interest
                  </div>
                  <div className="font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(comp.totalInterest)}
                  </div>
                </div>
                <div>
                  <div className="text-light-textSecondary dark:text-dark-textSecondary mb-1">
                    Total Payment
                  </div>
                  <div className="font-semibold text-light-text dark:text-dark-text">
                    {formatCurrency(comp.totalPayment)}
                  </div>
                </div>
              </div>

              {/* Savings Comparison */}
              {bestRate && comp.id !== bestRate.id && (
                <div className="mt-3 pt-3 border-t border-light-border dark:border-dark-border">
                  <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                    You'll pay{' '}
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {formatCurrency(comp.totalPayment - bestRate.totalPayment)}
                    </span>{' '}
                    more than the best rate
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        {bestRate && comparisons.length > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-green-600 to-green-500 rounded-xl p-6 text-white"
          >
            <h4 className="text-lg font-semibold mb-2">💰 Best Deal</h4>
            <p className="text-white/90 mb-3">
              {bestRate.name} offers the best rate at {bestRate.rate}%
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/80 mb-1">Lowest EMI</div>
                <div className="text-xl font-bold">{formatCurrency(bestRate.emi)}</div>
              </div>
              <div>
                <div className="text-white/80 mb-1">Total Savings</div>
                <div className="text-xl font-bold">
                  {formatCurrency(
                    Math.max(...comparisons.map((c) => c.totalPayment)) - bestRate.totalPayment
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default InterestComparison;
