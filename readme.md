

# Ratings App – Internship Project

This project is a full-stack web application built manually for an internship assignment. It is used to manage product reviews and ratings. The backend is developed using Node.js and PostgreSQL, and the frontend is developed using React.

## Features

- User Signup and Login with secure authentication
- View list of products with their average ratings
- Add new products
- Submit and view reviews for each product
- Admin page to list all reviews

## Technologies Used

### Backend
- Node.js
- Express
- PostgreSQL
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

### Frontend
- React
- React Router DOM
- Axios

## Folder Structure

```
intership projects/
├── server/
│   ├── index.js
│   ├── db.js
│   └── .env.example
├── ratings-frontend/
│   └── src/
│       ├── App.js
│       ├── loginpage.jsx
│       ├── SignUpPage.jsx
│       ├── AdminPage.jsx
│       └── components/
│           ├── Home.jsx
│           └── ReviewPage.jsx
```

## Getting Started

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your own database credentials
node index.js
```

### 2. Frontend Setup

```bash
cd ratings-frontend
npm install
npm start
```

## Notes

This project was created manually by a human developer as part of an internship. No AI tools were used in writing or generating this project or its documentation.# rating-review-sytem
