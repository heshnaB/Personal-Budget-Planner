//  HTML form submission handling.
// 1. Create the transaction array to store all the transaction objects.
let transactions = [];

//2. Grab the form and inputs
const form = document.getElementById("transaction-form");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const notesInput = document.getElementById("notes");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expenses");
const balanceEl = document.getElementById("balance");

//3. Ensure JS captures the input after user clicks add transaction
form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Create a transactional Object
    const transaction = {
        id: Date.now(),
        type: typeInput.value.toLowerCase(),
        amount: parseFloat(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value,
        notes: notesInput.value
    };

    //4. Add to array and clear form
    transactions.push(transaction);
    //form.requestFullscreen();
    console.log(transactions);

    //5. Render updated list
    renderTransactions();

    //6. Update transaction
    updateSummary();
});



//Display the transactions
function renderTransactions() {
    // Clear the old list
    transactionList.innerHTML = "";

    
    transactions.forEach((tx, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${tx.date}</td>
            <td>${tx.type.toUpperCase()}</td>
            <td>$${tx.amount.toFixed(2)}</td>
            <td>${tx.category}</td>
            <td>${tx.notes}</td>
            <td>
                <button oneclick="editTransaction(${index})">Edit</button>
                <button onclick="deleteTransaction(${index})">Delete</button>
            </td
        `;
        
        transactionList.appendChild(row);
    });
};

// Update the totals and balance
function updateSummary() {
    let income = 0;
    let expense = 0;

    transactions.forEach(tx => {
        const type = tx.type.toLowerCase().trim();
        if (type === "income") {
            income += tx.amount;
        } else if (type === "expense") {
            expense += tx.amount;
        }
    });

    document.getElementById("total-income").textContent = income.toFixed(2);
    document.getElementById("total-expenses").textContent = expense.toFixed(2);
    document.getElementById("balance").textContent = (income - expense).toFixed(2);
}

//Delete Function
function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveData();
    renderTransactions();
    updateSummary();
}

//Edit Function
function editTransaction(index) {
    const tx = transactions[index];

    // Fill in the form with existing values
    typeInput.value = tx.type;
    amountInput.value = tx.amount;
    categoryInput.value = tx.category;
    dateInput.value = tx.date;
    notesInput.value = tx.notes;

    // Remove it from the list temporarily
    transactions.splice(index, 1);

    saveData();
    renderTransactions();
    updateSummary();
}