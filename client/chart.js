// const headingEl = document.getElementById('heading-el');
// const showExpense = document.getElementById('show-expense');
// const graph = document.getElementById('graph')

// let expenseDets = [];

// function home() {
//    window.location = '/client';
// }

// function calcSum(arr) {
//    let sum = 0;
//    for (let i = 0; i < arr.length; i++) {
//       sum += arr[i]['expense_amount'];
//    }
//    return sum;
// }

// function calcMaxMin(arr) {
//    let max = 0;
//    let min = Number.MAX_VALUE;
//    let minFor;
//    let maxFor;
//    for (let i = 0; i < arr.length; i++) {
//       if(arr[i]['expense_amount'] > max) {
//          max = arr[i]['expense_amount']
//          maxFor = arr[i]['expense_desc']
//       }
//       if(arr[i]['expense_amount'] < min) {
//          min = arr[i]['expense_amount']
//          minFor = arr[i]['expense_desc']
//       }
//    }
//    return [max, min, minFor, maxFor]
// }

// async function getSumExpense() {
//    const res = await fetch('http://localhost:5000/expenses');
//    const data = await res.json();
//    let sumOfExp = calcSum(data)
//    let [maxOfExp, minOfExp, minDesc , maxDesc] = calcMaxMin(data);
//    showExpense.innerHTML = `
//    <div id="image-container" class="image-container"><img class="wallet-image" src="./images/undraw_wallet_aym5.svg" alt=""></div>
//    <div class="show-expense-jumbotron">
//       <div class="total-amount">
//          <div>
//             <p class="total-amount-text"><i class="fas fa-wallet"></i> Total Amount</p>
//             <h1 class="total-amount-value">₹${sumOfExp}</h1>
//          </div>
//       </div>
//       <div class="highest-lowest">
//          <p>Highest Expense: <strong>₹${maxOfExp}</strong> for ${maxDesc}</p>
//          <p>Lowest Expense: <strong>₹${minOfExp}</strong> for ${minDesc}</p>
//       </div>
//       <div>
//          <button onclick="changeFocus()" class="view-details-btn">View Details</button>
//       </div>
//    </div>
//    `;
// }




// function changeFocus() {
//    graph.scrollIntoView({behavior:"smooth", block: 'center'});
// }

// document.addEventListener('DOMContentLoaded', getSumExpense);

// headingEl.addEventListener('click', home);


