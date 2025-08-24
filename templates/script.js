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

//3. Ensure JS captures the input after user clicks add transaction
form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Create a transactional Object
    const transaction = {
        id: Date.now(),
        type: typeInput.value,
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
});



//Display the transactions
function renderTransactions() {
    // Clear the old list
    transactionList.innerHTML = "";

    
    transactions.forEach(tx => {
        const item = document.createElement("div");
        item.textContent = `${tx.date} | ${tx.type.toUpperCase()} | $${tx.amount} | ${tx.category} | ${tx.notes}`;
        transactionList.appendChild(item);
    });
};