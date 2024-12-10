const {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateWorkingCapitalRatio,
  formatCurrency,
  formatPercentage,
} = require("../index");

describe("Revenue Calculation", () => {
  test("Calculates total revenue correctly", () => {
    const data = [
      { account_category: "revenue", total_value: 5000 },
      { account_category: "revenue", total_value: 2000 },
      { account_category: "expense", total_value: 1000 },
    ];
    const result = calculateRevenue(data);
    expect(result).toBe(7000);
  });

  test("Returns 0 for revenue when data is empty", () => {
    const data = [];
    const result = calculateRevenue(data);
    expect(result).toBe(0);
  });
});

describe("Expenses Calculation", () => {
  test("Calculates total expenses correctly", () => {
    const data = [
      { account_category: "expense", total_value: 300 },
      { account_category: "expense", total_value: 700 },
    ];
    const result = calculateExpenses(data);
    expect(result).toBe(1000);
  });

  test("Returns 0 for expenses when data is empty", () => {
    const data = [];
    const result = calculateExpenses(data);
    expect(result).toBe(0);
  });
});

describe("Gross Profit Margin Calculation", () => {
  test("Calculates gross profit margin correctly", () => {
    const data = [
      { account_type: "sales", value_type: "debit", total_value: 5000 },
      { account_type: "sales", value_type: "credit", total_value: 2000 },
    ];
    const revenue = 10000;
    const result = calculateGrossProfitMargin(data, revenue);
    expect(result).toBe("50.0");
  });

  test("Throws an error when revenue is zero", () => {
    const data = [
      { account_type: "sales", value_type: "debit", total_value: 5000 },
    ];
    const revenue = 0;
    expect(() => calculateGrossProfitMargin(data, revenue)).toThrow(
      "Revenue can not be zero"
    );
  });
});

describe("Net Profit Margin Calculation", () => {
  test("Calculates net profit margin correctly", () => {
    const revenue = 10000;
    const expenses = 5000;
    const result = calculateNetProfitMargin(revenue, expenses);
    expect(result).toBe("50.0");
  });

  test("Returns negative percentage for net loss", () => {
    const revenue = 10000;
    const expenses = 15000;
    const result = calculateNetProfitMargin(revenue, expenses);
    expect(result).toBe("-50.0");
  });
});

describe("Working Capital Ratio Calculation", () => {
  test("Calculates working capital ratio correctly", () => {
    const data = [
      {
        account_category: "assets",
        value_type: "debit",
        account_type: "current",
        total_value: 5000,
      },
      {
        account_category: "assets",
        value_type: "credit",
        account_type: "current",
        total_value: 2000,
      },
      {
        account_category: "liability",
        value_type: "credit",
        account_type: "current",
        total_value: 3000,
      },
      {
        account_category: "liability",
        value_type: "debit",
        account_type: "current",
        total_value: 1000,
      },
    ];
    const result = calculateWorkingCapitalRatio(data);
    expect(result).toBe("150.0");
  });

  test("Handles zero liabilities gracefully", () => {
    const data = [
      {
        account_category: "assets",
        value_type: "debit",
        account_type: "current",
        total_value: 5000,
      },
      {
        account_category: "assets",
        value_type: "credit",
        account_type: "current",
        total_value: 2000,
      },
    ];
    expect(() => calculateWorkingCapitalRatio(data)).toThrow(
      "Division by zero in Working Capital Ratio calculation"
    );
  });
});

describe("Formatting Functions", () => {
  test("Formats currency correctly", () => {
    const result = formatCurrency(1234567);
    expect(result).toBe("$1,234,567");
  });

  test("Formats percentage correctly", () => {
    const result = formatPercentage(0.456);
    expect(result).toBe("45.6%");
  });
});
