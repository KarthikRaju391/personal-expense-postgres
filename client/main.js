const headingEl = document.getElementById('heading-element');
const expenseAmount = document.getElementById('expense-amount');
const form = document.getElementById('form');
const expenseDesc = document.getElementById('expense-description');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const errorPlaceholder = document.getElementById('error-placeholder');
const updateExpense = document.getElementById('update-expense-btn');

const sortAmtAsc = document.getElementById('sort-amount-asc');
const sortAmtDesc = document.getElementById('sort-amount-dsc');
const sortDate = document.getElementById('sort-date-oldest');
const sortDateNew = document.getElementById('sort-date-newest');


let totalExpense;

let allExpenses = [];

expenseList.parentElement.classList.remove('expense-section');
async function addExpenses(e) {
   e.preventDefault();
   let expenseVal = expenseDesc.value;
   let expenseAmountVal = Number(expenseAmount.value);
   let newExpenseDate = new Date().toISOString();
   const data = {
      expense_desc: expenseVal,
      expense_amount: expenseAmountVal,
      expense_date: newExpenseDate,
   };
   try {
      console.log(expenseVal, expenseAmountVal, newExpenseDate);
      const response = await fetch('http://localhost:5000/expenses', {
         method: 'POST',
         headers: { 'Content-type': 'application/json' },
         body: JSON.stringify(data),
      });
      getAllExpenses();
   } catch (err) {
      console.error(err.message);
   }
   expenseDesc.value = '';
   expenseAmount.value = '';
   expenseAmount.focus();
}
async function getAllExpenses() {
   const res = await fetch('http://localhost:5000/expenses');
   const data = await res.json();
   if (data.length != 0) {
      expenseList.parentElement.classList.add('expense-section');
   }
   // allExpenses = [...data];
   console.log(data);
   renderExpenses(data);
}

document.addEventListener('DOMContentLoaded', getAllExpenses);

function createExpenseList({
   expense_id,
   expense_desc,
   expense_amount,
   expense_date,
}) {
   let moment = new Date(expense_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });

   return `
      <li class="expense-list-item flex">
         <div class="mobile flex flex-col">
            <p class="fw-500">${expense_desc}</p>
            <small class="fs-200">${moment}</small>
         </div>
         <div class="expense-list-item-amount">
            <span class="fw-500">
               ₹${expense_amount}
            </span>
            <button onclick="editExpense(${expense_id})" type="button" class="edit-btn">
               <i class="far fa-edit"></i>
            </button>
            <button onclick="deleteExpense(${expense_id})" type="button" class="delete-btn">
               <i class="fas fa-trash"></i>
            </button>
         </div>
      </li>
   `;
}

async function editExpense(expenseSno) {
   // editModal.style.display = 'block';
   console.log(expenseSno);
   try {
      const res = await fetch(`http://localhost:5000/expenses/${expenseSno}`);
      const expData = await res.json();
      // updateExpenseDesc.value = expData.expense_desc;
      // updateExpenseAmount.value = expData.expense_amount;

      document.body.innerHTML += `
      <div id="edit-modal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
         <div class="modal-header">
            <span onclick = "closeModal()" id="close-btn" class="close">&times;</span>
            <h2>Edit Expense</h2>
         </div>
         <hr />
         <div class="modal-body">
            <div class="amount-section">
               <input
                  placeholder="Update amount spent"
                  required
                  type="text"
                  value= "${expData.expense_amount}"
                  id="update-expense-amount"
               />
            </div>
            <div class="description-section">
               <input
                  placeholder="Update expense"
                  required
                  value = ${expData.expense_desc}
                  type="text"
                  id="update-expense-description"
               />
            </div>
         </div>
         <div class="modal-footer">
            <button onclick="updateExpenses(${expData.expense_id})" id="update-expense-btn" type="button" class="edit-btn">
               <i class="far fa-edit"></i>
            </button>
         </div>
      </div>
      </div>
      `;
   } catch (err) {
      console.error(err.message);
   }
}

async function updateExpenses(expenseID) {
   let newExpenseDate = new Date().toISOString();
   let expenseVal = document.getElementById('update-expense-description').value;
   let expenseAmountVal = Number(
      document.getElementById('update-expense-amount').value
   );
   const data = {
      expense_desc: expenseVal,
      expense_amount: expenseAmountVal,
      expense_date: newExpenseDate,
   };

   try {
      console.log(expenseID);
      await fetch(`http://localhost:5000/expenses/${expenseID}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
      });

      window.location = '/client'
   } catch (error) {
      console.error(error.message);
   }
}

function closeModal() {
   document.querySelector('.modal').remove();
}

function closeAgain(event) {
   if (event.target == document.querySelector('.modal')) {
      document.querySelector('.modal').remove();
   }
}

window.addEventListener('click', closeAgain);

// closeBtn.addEventListener('click', closeModal)

// function to render the expenses
function renderExpenses(expenseArr) {
   const allExpensesHTML = expenseArr.map(expense =>
      createExpenseList(expense)
   );
   const joinAllExpensesHTML = allExpensesHTML.join('');
   expenseList.innerHTML = joinAllExpensesHTML;
}

async function deleteExpense(expenseSno) {
   // allExpenses = allExpenses.filter(expense => expense.sno !== expenseSno);
   try {
      await fetch(`http://localhost:5000/expenses/${expenseSno}`, {
         method: 'DELETE',
      });
      getAllExpenses();
   } catch (error) {
      console.error(error.message);
   }

   // totalExpense = calcSum(allExpenses);

   // headingEl.innerText = `${
   //    totalExpense === 0 ? `Total amount : 0` : `Total : ${totalExpense}`
}

async function sortOldestDate() {
   const res = await fetch('http://localhost:5000/expenses/oldest-date');
   const data = await res.json();
   if (data.length != 0) {
      expenseList.parentElement.classList.add('expense-section');
   }
   renderExpenses(data);
}

async function sortAscAmt(){
   const res = await fetch('http://localhost:5000/expenses/amount-asc');
   const data = await res.json();
   if (data.length != 0) {
      expenseList.parentElement.classList.add('expense-section');
   }
   renderExpenses(data);
}

async function sortDscAmt() {
   const res = await fetch('http://localhost:5000/expenses/amount-dsc');
   const data = await res.json();
   if (data.length != 0) {
      expenseList.parentElement.classList.add('expense-section');
   }
   renderExpenses(data);
}

async function sortNewDate() {
   const res = await fetch('http://localhost:5000/expenses');
   const data = await res.json();
   if (data.length != 0) {
      expenseList.parentElement.classList.add('expense-section');
   }
   renderExpenses(data);
}

sortDateNew.addEventListener('click', sortNewDate)
sortDate.addEventListener('click', sortOldestDate)
sortAmtAsc.addEventListener('click',sortAscAmt)
sortAmtDesc.addEventListener('click', sortDscAmt)
form.addEventListener('submit', addExpenses);
