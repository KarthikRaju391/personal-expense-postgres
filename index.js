const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json()); // allows us to access the req.body

//ROUTES

// get all expenses
app.get('/expenses', async (req, res) => {
   try {
      const allExpenses = await pool.query(
         'SELECT * FROM expense ORDER BY expense_id DESC'
      );

      res.json(allExpenses.rows);
   } catch (err) {
      console.error(err.message);
   }
});

// get SUM of expenses
app.get('/expenses/sum', async (req, res) => {
   try {
      const expenseSUM = await pool.query(
         'SELECT SUM(expense_amount) FROM expense'
      )
      console.log(expenseSUM.rows[0])
      res.json(expenseSUM.rows[0])
   } catch (err) {
      console.error(err.message)
   }
})

// get expenses sorted in asc order of expenses
app.get('/expenses/amount-asc', async (req, res) => {
   try {
      const allExpenses = await pool.query(
         'SELECT * FROM expense ORDER BY expense_amount'
      );

      res.json(allExpenses.rows);
   } catch (err) {
      console.error(err.message);
   }
});

// get expenses sorted in desc order of expenses
app.get('/expenses/amount-dsc', async (req, res) => {
   try {
      const allExpenses = await pool.query(
         'SELECT * FROM expense ORDER BY expense_amount DESC'
      );

      res.json(allExpenses.rows);
   } catch (err) {
      console.error(err.message);
   }
});

// get expenses sorted by added date of expenses
app.get('/expenses/oldest-date', async (req, res) => {
   try {
      const allExpenses = await pool.query(
         'SELECT * FROM expense ORDER BY expense_id ASC'
      );

      res.json(allExpenses.rows);
   } catch (err) {
      console.error(err.message);
   }
});


// get an expense

app.get('/expenses/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const expense = await pool.query(
         'SELECT * FROM expense WHERE expense_id = $1',
         [id]
      );
      res.json(expense.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

// create an expense
app.post('/expenses', async (req, res) => {
   try {
      const { expense_desc, expense_amount, expense_date } = req.body;
      const newExpense = await pool.query(
         'INSERT INTO expense (expense_desc, expense_amount, expense_date) VALUES ($1, $2, $3) RETURNING *',
         [expense_desc, expense_amount, expense_date]
      );
      res.json(newExpense.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

// update an expense

app.patch('/expenses/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const { expense_desc, expense_amount, expense_date } = req.body;

      const updateExpenses = await pool.query(
         'UPDATE expense SET expense_desc = $1, expense_amount = $2, expense_date = $3 WHERE expense_id = $4',
         [expense_desc, expense_amount, expense_date, id]
      );

      res.json('Expense was updated');
   } catch (err) {
      console.error(err.message);
   }
});

// delete an expense
app.delete('/expenses/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const deleteExpense = await pool.query(
         'DELETE FROM expense WHERE expense_id = $1',
         [id]
      );
      res.json('Expense was deleted!');
   } catch (err) {
      console.error(err.message);
   }
});

app.listen(5000, () => {
   console.log('server is listening on port 5000');
});
