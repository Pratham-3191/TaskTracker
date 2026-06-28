# MERN Task Tracker

A clean, responsive, and professional Task Tracker dashboard web application built using the MERN stack (MongoDB, Express, React, Node.js). 

This application provides a simple, modern task management layout designed with a professional admin dashboard aesthetic using custom CSS variables (no external component libraries). It supports a full suite of features including CRUD operations, robust search, status/priority filtering, pagination, sorting, toast notifications, keyboard shortcuts, and dark mode.

---

## 🚀 Tech Stack

- **Frontend:**
  - React.js (Vite)
  - Axios (Service & API Layer)
  - React Router DOM (Routing)
  - Plain CSS (Custom Design System with CSS Tokens)
- **Backend:**
  - Node.js & Express.js (MVC Architecture)
  - Mongoose (MDB Object Modelling & Validation)
  - MongoDB Atlas (Cloud Database)
- **Tooling:**
  - Dotenv (Environment variables management)
  - Nodemon (Backend hot reloading)

---

## ✨ Features

- **Full CRUD Support:** Create, read, edit, and delete tasks instantly.
- **Search & Filtering:**
  - Real-time task lookup with **debounced search** (prevents excessive API calls).
  - Filter tasks by **Status** (*To Do, In Progress, Done*) and **Priority** (*Low, Medium, High*).
- **Sorting:** Sort tasks by Newest, Oldest, Due Date, Priority, and Title.
- **Cycle Status on Click:** Click any status badge in a task card to cycle through statuses directly with instant updates.
- **Pagination:** Clean page navigation supporting customizable task limits.
- **Optimistic UI Deletion:** Delete task cards instantly from the UI, automatically rolling back and displaying a toast alert if the API call fails.
- **Robust Modals & Input Validation:**
  - Reusable confirmation modal before deletion.
  - Reusable form component with input auto-focus and client-side validation.
- **Toast Notifications:** Clean alert system for successful actions and error messages.
- **Dark Mode:** LocalStorage-persisted dark/light theme switch in the header.
- **Keyboard Shortcuts:** Press `N` anywhere on the page (when not typing in form inputs) to instantly open the "New Task" form.

---

## 📂 Folder Structure

```
TaskTracker/
├── client/                    # React Frontend
│   ├── public/
│   └── src/
│       ├── components/        # Reusable UI Elements (Form, Card, Navbar, etc.)
│       ├── context/           # TaskContext.jsx (Global useReducer state)
│       ├── hooks/             # Custom React Hooks (useTasks, useDebounce)
│       ├── pages/             # Route Pages (Home.jsx, NotFound.jsx)
│       ├── services/          # API Connection Layer (api.js, taskService.js)
│       ├── styles/            # Design Tokens and CSS Variables (index.css)
│       └── utils/             # Constants & Validators
│
├── server/                    # Express Backend
│   ├── config/                # Database connection
│   ├── controllers/           # Business logic & controller routes
│   ├── middleware/            # centralized error handlers & 404 middlewares
│   ├── models/                # Mongoose Database Models (Task.js)
│   ├── routes/                # REST API Endpoint declarations
│   └── utils/                 # ApiError & asyncHandler helpers
│
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have Node.js (version 18 or higher) and npm installed.

### 1. Database Setup
1. Setup a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Retrieve your database connection string.

### 2. Backend Scaffolding & Run
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *You should see:* `✅ MongoDB connected` *and* `✅ Server running in development mode on port 5000`.

### 3. Frontend Setup & Run
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the Vite React development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 🌐 API Endpoints

| HTTP Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Fetch a list of tasks | `search`, `status`, `priority`, `sortBy`, `order`, `page`, `limit` |
| **GET** | `/api/tasks/:id` | Fetch details of a single task | None |
| **POST** | `/api/tasks` | Create a new task | JSON body |
| **PUT** | `/api/tasks/:id` | Update an existing task | JSON body |
| **DELETE** | `/api/tasks/:id` | Delete a task | None |

---

## 📷 Screenshots Placeholder

*Dashboard UI (Light Mode / Dark Mode, Responsive Mobile layout):*
*(Insert screenshots of the dashboard interface once active)*

---

## 🔮 Future Improvements

- User authentication using JWT.
- Assignee fields for team collaborations.
- Task categorization with tags or boards.
- Webhook alerts or email updates for overdue items.
