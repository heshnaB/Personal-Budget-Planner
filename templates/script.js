// ----Login System ------
let currentUser = null;

// Login function
function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    //Check if user exists in local storage
    const savedUser = JSON.parse(localStorage.getItem(username));

    if (savedUser && savedUser.password === password) {
        currentUser = username;
        alert("Login successful!");
        document.getElementById("login-container").style.display = "none";
        document.getElementById("app-container").style.display = "block";

        // Load user's transactions
        loadData();
    
    } else {
        alert("Invalid credentials. Try again or register. ")
    }
}
// Register function
function register() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    const newUser = {
        password: password,
        transactions: []
    };

    localStorage.setItem(username, JSON.stringify(newUser));
    alert("Registratiom successful! You can now log in.");
}
    function logout() {
        currentUser = null;
        document.getElementById("app-container").style.display = "none";
        document.getElementById("login-container").style.display = "block";

    }




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
    saveData();

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
                <button onclick="editTransaction(${index})">Edit</button>
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

function saveData() {
    if (currentUser) {
        const savedUser = JSON.parse(localStorage.getItem(currentUser)) || {};
        savedUser.password = savedUser.password || "";
        savedUser.transactions = transactions;
        localStorage.setItem(currentUser, JSON.stringify(savedUser));
    } else {
        alert("No user logged in. Cannot save data.");
    }
}

function loadData() { 
    if (currentUser) {
        const savedUser = JSON.parse(localStorage.getItem(currentUser));
        if (savedUser && savedUser.transactions) {
            transactions = savedUser.transactions;
        } else {
            transactions = [];
        }
            renderTransactions();
            updateSummary();
        }
}

function toggleLogin() {
    const loginDiv = document.getElementById("login-container");
    loginDiv.style.display = loginDiv.style.display === "none" ? "block" : "none";
}

function savePrompt() {
    const saveBtn = document.getElementById("save-data-btn");

    if (!currentUser) {
        alert("You need to log in to save your data");
        document.getElementById("login-container").style.display = "block";
    } else {
        saveData();
        alert("Data saved successfully!");
        saveBtn.style.display = "none";
    }
}

function logout() {
    currentUser = null;
    alert("You are now logged out.");

    transactions = [];
    renderTransactions();
    updateSummary();

    updateButtonVisibility();
}

function updateButtonVisibility() {
    const saveBtn = document.getElementById("save-data-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const showLoginBtn = document.getElementById("show-login-btn");

    if (currentUser) {
        saveBtn.style.display = "inline-block";
        logoutBtn.style.display = "inline-block";s
        showLoginBtn.style.display = "none";
        document.getElementById("login-container").style.display = "none";
    } else {
        saveBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        showLoginBtn.style.display = "inline-block";
    }
}

function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    //Check if user exists in local storage
    const savedUser = JSON.parse(localStorage.getItem(username));

    if (savedUser && savedUser.password === password) {
        currentUser = username;
        alert("Login successful!");
        document.getElementById("login-container").style.display = "none";

        // Load user's transactions
        loadData();
        updateButtonVisibility();
    
    } else {
        alert("Invalid credentials. Try again or register. ")
    }
}

function savePrompt() {
    if (!currentUser) {
        alert("You need to log in to save your data");
        document.getElementById("login-container").style.display = "block";
    } else {
        saveData();
        alert("Data saved successfully!");
    }
}