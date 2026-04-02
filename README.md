# R & M Collection — React Frontend Rebuild

A full-stack fashion e-commerce app with a modern React + Vite frontend and unchanged Express/MySQL backend.

---

## 🗂 Project Structure

```
rm-collection/
├── server.js                   ← Express entry point (serves React build)
├── package.json                ← Backend dependencies
├── .env                        ← Environment variables
├── schema.sql                  ← MySQL schema
├── create-admin.js             ← Admin seeder script
├── server/                     ← Backend (untouched)
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
├── public/images/              ← Product image uploads
└── client/                     ← React frontend
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── context/            ← Auth, Cart, Toast
        ├── utils/api.js        ← Axios instance
        ├── components/         ← Header, Footer, Modals, ProductCard
        └── pages/              ← HomePage, AdminPage, TrackPage
```

---

## 🚀 How to Run in VS Code

### Prerequisites
- Node.js 18+ installed
- MySQL running with the `rm_collection` database created

---

### Step 1 — Open the project in VS Code

Open VS Code, then:
```
File → Open Folder → select the `rm-collection` folder
```

---

### Step 2 — Install backend dependencies

Open the **Terminal** in VS Code (`Ctrl + `` ` ```) and run:

```bash
npm install
```

This installs all backend packages (Express, MySQL, etc.).

---

### Step 3 — Install frontend dependencies

```bash
cd client
npm install
cd ..
```

---

### Step 4 — Set up your `.env` file

The `.env` file is already included. Update it with your own MySQL credentials:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=rm_collection

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@rmcollection.com
ADMIN_PASSWORD=Admin@12345

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

### Step 5 — Set up the MySQL database

In MySQL Workbench or terminal:
```sql
CREATE DATABASE rm_collection;
```

Then run the schema:
```bash
mysql -u root -p rm_collection < schema.sql
```

---

### Step 6 — Create the admin account

```bash
node create-admin.js
```

---

### Step 7 — Build the React frontend

```bash
cd client
npm run build
cd ..
```

This creates `client/dist/` which Express serves automatically.

---

### Step 8 — Start the server

```bash
npm start
```

Or with auto-reload during development:
```bash
npm run dev
```

Then open: **http://localhost:3000**

---

## 🔧 Development Mode (Hot Reload)

Run **two terminals** simultaneously:

**Terminal 1 — Backend:**
```bash
npm run dev
```

**Terminal 2 — Frontend (Vite dev server):**
```bash
cd client
npm run dev
```

Then open: **http://localhost:5173**

> Vite proxies all `/api` and `/images` requests to `http://localhost:3000` automatically.

---

## 🛣 Pages & Routes

| URL           | Page            |
|---------------|-----------------|
| `/`           | Home (Shop)     |
| `/admin`      | Admin Dashboard |
| `/track`      | Order Tracking  |

---

## 🔑 Admin Login

Default credentials (after running `create-admin.js`):
- **Email:** `admin@rmcollection.com`
- **Password:** `Admin@12345`

---

## 📦 Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | React 18, Vite, React Router |
| Styling   | Custom CSS, Glassmorphism    |
| Icons     | Lucide React                |
| HTTP      | Axios                       |
| Backend   | Node.js, Express            |
| Database  | MySQL, mysql2               |
| Auth      | JWT, bcryptjs               |
| Email     | Nodemailer                  |
| Uploads   | Multer                      |
