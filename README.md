# Personal-Budget-Planner
```text
Structure:
Personal-Budget-Planner/
|    README.md
|
|___ templates/
|    |__ index.html
|    |__ add_expense.html
|    |
|
|___ static/
|    |__ style.css
|    |
|
|___ data/
     |___ budget.db
     |
```

Purpose:
This project is a simple personal budget planner web application designed to demonstrate front-end development skills using JavaScript. It allows users to track income and expenses with persistent data stored in the browser using Local Storage.

The app includes the following features:
- Add income and expense transactions through a form
- View a dynamic transaction list
- Edit and delete transactions
- View real-time financial summary (total income, expenses, balance)
- Persistent storage using browser Local Storage
- Basic user login system (client-side only)

Tech Stack:
- HTML
- CSS
- JavaScript
- Local Storage (browser-based persistence)

Data Structure:
Each transaction is stored as a JavaScript object:
- id (unique identifier)
- type (income or expense)
- amount
- category
- date
- notes

Future Improvements
- Add backend using Flask or Django
- Replace Local Storage with SQLite or PostgreSQL
- Add charts and data visualization
- Improve authentication with secure login system
