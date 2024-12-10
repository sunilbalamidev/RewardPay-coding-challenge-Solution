const fs = require("fs");

function readDataFile(filePath) {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(rawData);

    // Ensure `data` key exists and is an array
    if (!Array.isArray(parsedData.data)) {
      throw new Error(
        "The 'data' key is missing or not an array in data.json."
      );
    }

    return parsedData.data; // Return only the array under 'data'
  } catch (error) {
    console.error("Error reading or parsing data.json:", error.message);
    process.exit(1);
  }
}

// Load only the `data` array
const data = readDataFile("./data.json");
console.log("Data loaded successfully:", data);

//Revenue calculation

function calculateRevenue(data) {
  return data
    .filter((item) => item.account_category === "revenue")
    .reduce((sum, item) => sum + item.total_value, 0);
}
const revenue = calculateRevenue(data);

//expense calculation
function calculateExpenses(data) {
  return data
    .filter((item) => item.account_category === "expense")
    .reduce((sum, item) => sum + item.total_value, 0);
}
const expenses = calculateExpenses(data);

// Gross profit Margin calculation

function calculateGrossProfitMargin(data, revenue) {
  if (revenue === 0) {
    throw new Error("Revenue can not be zero");
  }
  // Step 1: Calculate sales total
  const salesTotal = data
    .filter(
      (item) => item.account_type === "sales" && item.value_type === "debit"
    )
    .reduce((sum, item) => sum + item.total_value, 0);

  // Step 2: Calculate gross profit margin as a percentage
  const grossProfitMargin = (salesTotal / revenue) * 100;
  return grossProfitMargin.toFixed(1);
}
const grossProfitMargin = calculateGrossProfitMargin(data, revenue);

//Non profit Margin calculation

function calculateNetProfitMargin(revenue, expense) {
  return (((revenue - expense) / revenue) * 100).toFixed(1);
}
const netProfitMargin = calculateNetProfitMargin(revenue, expenses);

//working capital ratio :
function calculateWorkingCapitalRatio(data) {
  const assets =
    data
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "debit" &&
          ["current", "bank", "current_accounts_receivable"].includes(
            item.account_type
          )
      )
      .reduce((sum, item) => sum + item.total_value, 0) -
    data
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "credit" &&
          ["current", "bank", "current_accounts_receivable"].includes(
            item.account_type
          )
      )
      .reduce((sum, item) => sum + item.total_value, 0);

  const liabilities =
    data
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "credit" &&
          ["current", "current_accounts_payable"].includes(item.account_type)
      )
      .reduce((sum, item) => sum + item.total_value, 0) -
    data
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "debit" &&
          ["current", "current_accounts_payable"].includes(item.account_type)
      )
      .reduce((sum, item) => sum + item.total_value, 0);

  if (liabilities === 0) {
    throw new Error("Division by zero in Working Capital Ratio calculation");
  }

  return ((assets / liabilities) * 100).toFixed(1);
}

const workingCapitalRatio = calculateWorkingCapitalRatio(data);

// Format the outputs
function formatCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function formatPercentage(value) {
  return `${(value * 100).toFixed(1)}%`;
}
//print outputs
console.log("Revenue:", formatCurrency(revenue));
console.log("Expenses:", formatCurrency(expenses));
console.log("Gross Profit Margin:", formatPercentage(grossProfitMargin));
console.log("Net Profit Margin:", formatPercentage(netProfitMargin));
console.log("Working Capital Ratio:", formatPercentage(workingCapitalRatio));

//Exports  functions
module.exports = {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateWorkingCapitalRatio,
  formatCurrency,
  formatPercentage,
};
