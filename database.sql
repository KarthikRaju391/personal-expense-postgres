CREATE DATABASE expense_database;

--\c into expense_database

CREATE TABLE expense(
   expense_id SERIAL PRIMARY KEY,
   expense_desc varchar(255),
   expense_amount int,
   expense_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP::timestamp
);


-- GROUP BY DAY

SELECT
   DATE_TRUNC('day', expense_date) AS daily_expenses, SUM(expense_amount) AS sum_of_expenses
FROM expense
GROUP BY DATE_TRUNC('day', expense_date);

-- GROUP BY MONTH
SELECT
   DATE_TRUNC('month', expense_date) AS expense_to_month,
   COUNT(expense_id) AS count
FROM expense
GROUP BY DATE_TRUNC('month', expense_date);

-- GROUP BY WEEK

SELECT
   DATE_TRUNC('week', expense_date) AS weekly_expense, SUM(expense_amount) AS sum_of_expenses
FROM expense
GROUP BY DATE_TRUNC('week', expense_date);

SELECT
  date_trunc('day', expense_date), -- or hour, day, week, month, year
  count(expense_id) AS count, SUM(expense_amount) AS sum_of_expenses
FROM expense
GROUP BY DATE_TRUNC('day', expense_date);