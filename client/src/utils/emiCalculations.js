// EMI Calculation Utilities

/**
 * Calculate EMI (Equated Monthly Installment)
 * Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
 * Where:
 * P = Principal loan amount
 * R = Monthly interest rate (annual rate / 12 / 100)
 * N = Loan tenure in months
 */
export const calculateEMI = (principal, annualRate, tenureMonths) => {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi);
};

/**
 * Calculate total payment, total interest, and principal
 */
export const calculateLoanDetails = (principal, annualRate, tenureMonths) => {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal: Math.round(principal),
  };
};

/**
 * Generate amortization schedule
 * Returns array of payment details for each month
 */
export const generateAmortizationSchedule = (principal, annualRate, tenureMonths) => {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const monthlyRate = annualRate / 12 / 100;
  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    // Ensure balance doesn't go negative due to rounding
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      emi: Math.round(emi),
      principalPayment: Math.round(principalPayment),
      interestPayment: Math.round(interestPayment),
      balance: Math.round(balance),
    });
  }

  return schedule;
};

/**
 * Generate yearly summary from amortization schedule
 */
export const generateYearlySummary = (principal, annualRate, tenureMonths) => {
  const schedule = generateAmortizationSchedule(principal, annualRate, tenureMonths);
  const yearlySummary = [];
  const tenureYears = Math.ceil(tenureMonths / 12);

  for (let year = 1; year <= tenureYears; year++) {
    const startMonth = (year - 1) * 12;
    const endMonth = Math.min(year * 12, tenureMonths);
    const yearData = schedule.slice(startMonth, endMonth);

    const yearPrincipal = yearData.reduce((sum, month) => sum + month.principalPayment, 0);
    const yearInterest = yearData.reduce((sum, month) => sum + month.interestPayment, 0);
    const yearEMI = yearData.reduce((sum, month) => sum + month.emi, 0);

    yearlySummary.push({
      year,
      principal: Math.round(yearPrincipal),
      interest: Math.round(yearInterest),
      total: Math.round(yearEMI),
      balance: yearData[yearData.length - 1].balance,
    });
  }

  return yearlySummary;
};

/**
 * Calculate loan eligibility based on income
 * Assumes 50% of income can go towards EMI
 */
export const calculateLoanEligibility = (monthlyIncome, annualRate, tenureMonths) => {
  const maxEMI = monthlyIncome * 0.5; // 50% of income
  const monthlyRate = annualRate / 12 / 100;

  // Reverse EMI formula to get principal
  const maxLoan =
    (maxEMI * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));

  return Math.round(maxLoan);
};

/**
 * Format currency in Indian format (₹)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number in Indian format with commas
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-IN').format(number);
};

/**
 * Convert years to months
 */
export const yearsToMonths = (years) => years * 12;

/**
 * Convert months to years
 */
export const monthsToYears = (months) => months / 12;

export default {
  calculateEMI,
  calculateLoanDetails,
  generateAmortizationSchedule,
  generateYearlySummary,
  calculateLoanEligibility,
  formatCurrency,
  formatNumber,
  yearsToMonths,
  monthsToYears,
};
