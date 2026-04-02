R & M Collection — Node.js + MySQL Edition
A full-stack fashion e-commerce app with a Node.js + Express backend, MySQL database, and static HTML/CSS frontend.
🗂 Project Structure

rm-collection/
├── server.js                   ← Express entry point
├── package.json                ← Backend dependencies
├── .env                        ← Environment variables (not included)
├── schema.sql                  ← MySQL schema
├── create-admin.js             ← Admin seeder script
├── server/                     ← Backend code
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
├── public/                     ← Static assets (HTML, CSS, JS, images)
│   ├── index.html
│   ├── admin.html
│   ├── track.html
│   ├── css/
│   ├── js/
│   └── images/
└── uploads/                    ← Product image uploads
🚀 How to Run in VS Code
Prerequisites
Node.js 18+ installed
MySQL running with the rm_collection database created
Step 1 — Open the project
Open VS Code → File → Open Folder → select the rm-collection folder
Step 2 — Install dependencies
Open the terminal and run:
Bash
npm install
This installs all backend packages (Express, MySQL, etc.).
Step 3 — Set up your .env file
Create or update .env with your own database credentials and app settings. Do not commit this file to Git.
Step 4 — Set up the MySQL database
In MySQL Workbench or terminal:
SQL
CREATE DATABASE rm_collection;
Then import the schema:
Bash
mysql -u <your_user> -p rm_collection < schema.sql
Step 5 — Create the admin account
Bash
node create-admin.js
Step 6 — Start the server
Bash
npm start
Or for auto-reload during development:
Bash
npm run dev
Then open: http://localhost:3000⁠�
🛣 Pages & Routes
URL
Page
/
Home (Shop)
/admin
Admin Dashboard
/track
Order Tracking
🔑 Admin Login
Default credentials (after running create-admin.js):
Email: admin@rmcollection.com
Password: Your chosen admin password
📦 Tech Stack
Layer
Tech
Frontend
HTML, CSS, Vanilla JS
Styling
Custom CSS, Glassmorphism
Backend
Node.js, Express
Database
MySQL, mysql2
Auth
JWT, bcryptjs
Email
Nodemailer
Uploads
Multer