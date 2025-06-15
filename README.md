
# Social Media Platform API – Task 6

## 📌 Project Description

This project is a secure social media backend API built with Node.js. It includes authentication features and allows users to manage posts, comments, and likes. The project follows best practices in structuring code, using middleware, and implementing validations.

## 🎯 Objective

To build a safe and functional backend for a social media platform, including:

- Secure user authentication (JWT & Argon2)
- CRUD operations for users, posts, comments, and likes
- Proper data validation and middleware usage
- Token-based authorization

---
## project structure:
``` markdown
|___src/
|   |_____routes/
|   |      |________auth.router.js
|   |      |________user.router.js
|   |      |________comment.router.js
|   |      |________post.router.js
|   |_____controllers/
|   |               |_____users.controller.js
|   |               |_____posts.controller.js
|   |               |_____comments.controller.js
|   |_____models/
|   |           |_____user.model.js
|   |           |_____post.model.js
|   |           |_____comment.model.js
|   |_____middlwares/
|   |               |___________auth.middlware.js
|   |               |___________validate.middlware.js
|   |_____helper/
|   |            |________createToken.js
|   |            |________generateJWTSecretKey.js
|   |            |________hashing.js
|   |_____validation/
|   |               |________user.validate.js
|   |               |________post.validate.js
|   |_____app.js
|   |_____server.js
|___ .gitIgnore
|___ .env
|___package.json
|_____modules/
|            |______________express
|            |______________nodemon
|            |______________morgan
|            |______________dotenv  
|            |______________argon2
|            |______________jsonWebToken  
|            |______________express-validator 
```
---
## 🚀 Installation & Run Instructions

```bash
# Install dependencies
npm install

# Run the server
npm run start
```

> Ensure to create an `.env` file with the required configurations like JWT secret and DB URI.

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint            | Description       |
|--------|---------------------|-------------------|
| POST   | `/api/auth/signup`  | Create account    |
| POST   | `/api/auth/login`   | Login             |
| POST   | `/api/auth/logout`  | Logout            |

---

### 👤 User Management

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | `/api/users/me`      | Get user info          |
| PUT    | `/api/users/me`      | Update user info       |
| DELETE | `/api/users/me`      | Delete user account    |

> Deleting a user should also delete all related posts and comments, including comments on the user's posts.

---

### 📝 Posts

| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| POST   | `/api/posts`           | Create a new post         |
| PUT    | `/api/posts/:id`       | Edit a post               |
| DELETE | `/api/posts/:id`       | Delete a post             |
| GET    | `/api/posts/me`        | Get user’s own posts      |
| GET    | `/api/posts`           | Get all posts (pagination)|
| GET    | `/api/posts/:id`       | Get post details          |
| DELETE | `/api/posts`           | Delete all user posts     |

> Deleting a post must also delete all its associated comments.

---

### 💬 Comments

| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| POST   | `/api/comments`             | Create a comment      |
| GET    | `/api/comments/:postId`     | Get comments for post |
| DELETE | `/api/comments/:id`         | Delete a comment      |

---

### ❤️ Likes

| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| POST   | `/api/likes/:postId`       | Like a post         |
| DELETE | `/api/likes/:postId`       | Remove like         |

---

### ♻️ Account Reset

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| PUT    | `/api/reset`     | Reset user data/account   |

---

## 🔒 Notes on Security

- Use `JWT` and `Argon2` for authentication and password hashing.
- Validate that the user modifying or deleting a post/comment is the original author using `authorId` from DB vs `userId` from the token.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (mongoose)
- JWT
- Argon2
- express-validator


---

## ✅ Development Notes

- Use Postman to test all endpoints.
- Structure files as per the provided architecture.
- Utilize middleware and helper functions.
- Add inline comments for each route and middleware.

---


