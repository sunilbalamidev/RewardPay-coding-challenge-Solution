
# RewardPay Coding Challenge solution

## Description

This project solves the RewardPay coding challenge by calculating financial metrics from a dataset.

## Features

- Reads and parses `data.json`.
- Calculates the following metrics:
  - Revenue
  - Expenses
  - Gross Profit Margin
  - Net Profit Margin
  - Working Capital Ratio
- Formats results with proper currency and percentage formatting.
- Includes unit tests for all calculations.

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm (>=6.0.0)

**Notes on calculation**

**1. Gross Profit Margin:**

The Gross Profit Margin is calculated using transactions where:
account_type is "sales".
value_type is "debit".
If no transactions match these criteria in the data.json file, the calculated Gross Profit Margin will be 0.0%.

**2.Net Profit Margin:**

The Net Profit Margin may be negative if the total Expenses exceed the total Revenue. This reflects a financial loss.
**3. Working Capital Ratio:**

A Working Capital Ratio greater than 100% indicates that Assets exceed Liabilities, which is generally a positive indicator of financial health.
