# 💰 Personal Finance Tracker API

A fully functional RESTful API that helps users track income and expenses, organize transactions, upload profile pictures, and view financial summaries — all secured with JWT authentication.

---

## 🚀 Features

### 🔐 User Authentication
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and get JWT
- `GET /auth/profile` – View profile
- Secure password hashing with bcrypt
- Roles: `user` or `admin`

### 💸 Transactions
- `POST /transactions` – Add new income/expense
- `GET /transactions` – List all
- `GET /transactions/monthly-summary` – Totals by category
- `PUT /transactions/:id` – Edit
- `DELETE /transactions/:id` – Delete

### 🏷️ Categories
- `GET /categories` – Predefined list (e.g. Food, Rent, Salary, etc.)

### 📷 File Upload
- `POST /upload/profile-picture`
- Uploads to Cloudinary via `multer.memoryStorage()`

### 🛡️ Admin Only
- `GET /admin/overview` – View stats (total users, top categories)

---

## 🧰 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Auth + bcrypt
- Swagger UI (`/docs`)
- Multer + Cloudinary
- Zod (schema validation)
- Helmet, CORS, Rate Limit (security)
- Render (deployment)

---

## 📘 API Documentation

- Live docs at: `/docs`
- Built with `swagger-ui-express`
- All endpoints documented with `bearerAuth`

---

## 🧪 What to Submit

| ✅ Requirement        | 💬 Description                                       |
|----------------------|------------------------------------------------------|
| GitHub Repo          | Contains full source code (API only or full stack)  |
| Live Render API      | Deployed API with working routes                    |
| `/docs` Online       | Swagger UI docs live and accessible                 |
| 5+ Endpoint Tests    | Prove usage (via Postman, screenshot, or frontend)  |
| (Optional) Frontend  | React app or basic HTML form to test endpoints      |
| Screenshot or Loom   | Show at least 5 features working (video or image)   |

---

## 🌍 Deployment Instructions

1. Fork or clone the repo.
2. Create `.env` file with:

## Screenshot Project

![alt text](/frontend/src/assets/images/dashboard.png)

![alt text](/frontend/src/assets/images/register.png)

![alt text](/frontend/src/assets/images/login.png)