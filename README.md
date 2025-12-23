# Personal-Budget-Planner

Structure:
Personal-Budget-Planner/
|    app.py
|    requirements.txt
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

Purpose:
The following project is a simple personal budget planner and it is intended to demonstrate my programming skills.

The app includes the following features:
- Add Income/expenses (form with amount, date, category, notes)
- View transaction List (sortable, filterable)
- Monthly Summary (total income, total expenses, balance)
- Charts (spending by category, monthly trend)
- Persistent Storage (local database or JSON file)

Tech Stack: SQLite + HTML/CSS/Bootstrap

Data Structure:
 -  To add a transaction, we need an id (unique identifier), type (is it an income or an expense), amount (amount of money), category (groceries, rent, salary, etc), date, and other notes. -> create an array of objects with HTML

This project focuses primarily on backend logic and functionality rather than visual design. The layout is simple and functional to highlight data handling, transaction management, and user login features. Styling was not a priority.


⚠️ License: All Rights Reserved  
This code may NOT be copied, modified, or used to create any applications or derivative works without explicit permission.
