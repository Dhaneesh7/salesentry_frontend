Sales Entry Form (React + Redux)

A React-based Sales Entry application with dynamic header and detail tables. It supports adding, editing, validating, and saving sales entries, with data fetched from a backend API.

📌 Features

Header form with fields: Vr No, Vr Date, Status, Ac Name, Ac Amt

Detail table with:

Dynamic rows for items (Add/Remove)

Auto calculation of total amount (Qty x Rate)

Item code dropdown populated from backend

Redux Toolkit for state management

API Integration:

Fetch item data: GET /item

Post header & detail: POST /header/multiple

Validation before saving

🧩 Tech Stack

React

Redux Toolkit

Axios

Tailwind CSS

📦 Installation

# Clone the repository
git clone https://github.com/Dhaneesh7/salesentry_frontend.git
cd salesentry_frontend

# Install dependencies
npm install

# Start the dev server
npm start

🚀 API Endpoints

GET http://5.189.180.8:8010/item - fetch item master data

POST http://5.189.180.8:8010/header/multiple - save sales entry (header + detail)

📋 Validation Rules

All header fields are required 

In each detail row:

item_code, item_name, qty, and rate are mandatory

qty > 0 and rate >= 0

🖥️ UI Snapshot

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/31b19d8e-1f91-4946-8a3e-84592474361f" />


📂 Folder Structure

src/

├── components/

│   ├── HeaderForm.jsx

│   └── DetailForm.jsx

├── pages/

│   └── Home.jsx

├── store/

│   └── salesReducer.js

│   └── Store.jsx

└── App.js


🧑‍💻 Author

Dhaneesh v jayakumaran
github-profile:- Dhaneesh7


