# HostingAnywhere – Full Stack Assignment

A simple full‑stack project built with **Node.js, Express, MySQL, Redis, and React**.

 **Video Demo:** [https://www.youtube.com/watch?v=Awuj9WgnKC0](https://www.youtube.com/watch?v=Awuj9WgnKC0)


## 📸 Screenshots  
 # Home
 <img width="3030" height="1312" alt="Screenshot from 2025-11-15 18-39-13" src="https://github.com/user-attachments/assets/c47973af-3674-4ea8-b1a9-d7915425e1d5" />

# Plans
 <img width="3030" height="1312" alt="Screenshot from 2025-11-15 18-39-24" src="https://github.com/user-attachments/assets/f7fd7b45-e686-44d2-bf9c-57c14dadab80" />

# Profile
 <img width="3030" height="1312" alt="Screenshot from 2025-11-15 18-39-52" src="https://github.com/user-attachments/assets/3fb983db-7156-47ae-a828-5ed81e14cb26" />


# DataBase (mysql)
 <img width="3035" height="1346" alt="image" src="https://github.com/user-attachments/assets/dd17678c-4ea9-4435-b410-387ffd8733e9" />

---


This project includes:
- JWT Login & Logout
- Public Plans Page (No login required)
- Private Profile Page (Login required)
- MySQL for data
- Redis caching for fast access
- Docker for local environment setup

---

## 🚀 Features

### 1. Authentication
- User signup (email, username, password)
- Password hashing (bcrypt)
- Login with JWT
- Logout with token blacklist stored in Redis
- Protected routes using JWT + Redis validation

### 2. Public Plans Page
- API: `GET /api/plans`
- Checks Redis first
- If empty → fetch from MySQL → store in Redis (30 sec TTL)
- Frontend shows 3 hosting plans with name, price & description

### 3. Private Profile Page
- API: `GET /api/user/me`
  - Checks Redis first (user:<id>)
  - If missing → fetch MySQL → store in Redis
- Update profile: `PUT /api/user/me`
  - Updates MySQL
  - Then overwrites the Redis cache (Assignment requirement)
- Logout button clears token

---

## 🧪 Tech Stack

### Backend
- Node.js + Express
- MySQL
- Redis
- JWT
- Docker Compose

### Frontend
- React + Vite
- Tailwind CSS
- Axios

---

## ⚙️ Environment Variables

### **backend/.env**
```
PORT=5000

MYSQL_HOST=db
MYSQL_PORT=3306
MYSQL_USER=appuser
MYSQL_PASSWORD=apppass
MYSQL_DATABASE=hosting_anywhere

JWT_SECRET=supersecretkey
REDIS_URL=redis://redis:6379
```

---

## 🐳 Run with Docker (Recommended)

### 1️⃣ Start MySQL + Redis
Inside `/backend` run:

```
docker compose up -d --build
```

### 2️⃣ Start Backend
```
cd backend
npm install
npm run dev
```

### 3️⃣ Start Frontend
```
cd frontend
npm install
npm run dev
```

Visit:
👉 http://localhost:5173

---

## 📂 Folder Structure
```
hostinganywhere/
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── utils
│   ├── models
│   ├── docker-compose.yml
│   ├── server.js
│   └── database.sql
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── api
    │   ├── store
    │   └── App.jsx
    └── package.json
```

---
