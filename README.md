# 🚀 MERN Todo App with Authentication

A full-stack Todo application built using the MERN stack with secure authentication, token-based authorization, and a modern responsive UI.

---

## 📌 Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Access Token + Refresh Token system
* HTTP-only cookies for security
* Auto login after refresh (`/user` endpoint)
* Auto token refresh using Axios interceptor

---

### 📝 Todo Management

* Create, Read, Update, Delete (CRUD)
* Inline editing of todos
* Status toggle (Pending → In Progress → Completed)
* Delete confirmation modal
* Pagination support
* Search functionality (debounced)
* Filter by status

---

### 🎨 UI/UX

* Responsive design using Tailwind CSS
* Clean dashboard layout
* Sticky Navbar
* Modal-based form for adding todos
* Loading spinner
* Toast notifications

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Axios
* React Router
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs

---

## 📂 Folder Structure

```
client/
  src/
    api/
    store/
    components/
    pages/
    hooks/

server/
  controllers/
  models/
  routes/
  middleware/
  utils/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone <your-repo-url>
cd your-project
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🔄 Authentication Flow

```
Login → Access Token (short-lived)
       → Refresh Token (long-lived)

Access Token expires
↓
Axios interceptor triggers
↓
Refresh token API
↓
New access token generated
↓
Original request retried
```

---

## 📊 Pagination & Filtering

* Server-side pagination
* Debounced search for performance
* Status-based filtering
* Disabled navigation on edge pages

---

## 🧠 Key Concepts Used

* Token Rotation
* HTTP-only cookies
* Redux state management
* Debouncing
* Protected Routes
* Middleware-based authentication

---

## 🎯 Future Improvements

* Numbered pagination
* Role-based authentication
* Drag & drop todos
* Dark mode
* Real-time updates (WebSockets)

---

## 🤝 Contributing

Feel free to fork this repo and contribute.

---

## 📧 Contact

Narendra Kumar
Full Stack Developer

---

⭐ If you like this project, don't forget to star the repo!
