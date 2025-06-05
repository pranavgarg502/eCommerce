# 🛍️ E-commerce Platform

A full-featured, production-ready **E-commerce Platform** built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. It offers a seamless shopping experience with modern UI, secure payment gateway, and all essential functionalities.

---

## 🚀 Live Preview

> 🌐 This application is **deployed and running in production**.

---

## ✨ Features

- 🔐 **Authentication**
  - User registration, login, logout
  - JWT-based session management
  - Session storage for token handling

- 🛍️ **Product Listing**
  - Product details with images, price, category
  - Admin can add/edit/delete products
  - Product image upload feature

- 🔎 **Search & Filters**
  - Search bar for keyword search
  - Dynamic filters by category using session storage + URL sync

- ⭐ **Product Reviews**
  - Users can submit and view reviews
  - Rating system with average stars

- 🛒 **Cart System**
  - Add/remove/update quantity
  - Cart state is maintained per user
  - Cart accessible from both mobile and desktop

- 💳 **PayPal Payment Gateway**
  - Secure checkout process using PayPal API
  - Dynamic cart total calculation before payment

- 📱 **Responsive Design**
  - Optimized for both mobile and desktop views
  - Uses Tailwind CSS and shadcn/ui for styling

- 🧠 **State Management**
  - Redux Toolkit for managing auth, cart, products
  - Async Thunks for API actions like login, cart updates

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Payment |
|---------|---------|----------|---------|
| React + Vite | Node.js + Express | MongoDB | PayPal REST API |
| Redux Toolkit | JWT Auth | Mongoose | - |
| Tailwind CSS | REST API | - | - |

---
## Folder Structure
```
e-commerce/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin-view/
│   │   │   └── shop-view/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── store/
│   │   │   └── shop/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── README.md
├── .gitignore
```
## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform
```
### 2. Install Dependencies
```
# Frontend
cd client
npm install
```
```
# Backend
cd ../server
npm install
```
### 3. Setup Environment Variables

Create a .env file in both client/ and server/ folders
```
Frontend (.env)
VITE_API_URL=http://localhost:5000
```
```
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```
### 4. Run the App
```
# Start Backend
cd server
node server.js
```
```
# Start Frontend
cd ../client
npm run dev
```


