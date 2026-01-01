# I-Blog – Full Stack Blogging Platform

I-Blog is a modern full-stack blogging platform where users can read, write, and manage blogs.  
It includes authentication, a user dashboard, comments, categories, and a clean responsive UI.

---

## 🚀 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Shadcn UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file upload)
- Cloudinary (image storage)

---

## 📁 Project Structure

```bash
I-Blog/
├─ backend/
│  ├─ controllers/
│  │  ├─ blog.controller.js
│  │  ├─ comment.controller.js
│  │  └─ user.controller.js
│  ├─ database/
│  │  └─ db.js
│  ├─ middleware/
│  │  ├─ isAuthenticated.js
│  │  └─ multer.js
│  ├─ models/
│  │  ├─ blog.model.js
│  │  ├─ comment.modal.js
│  │  └─ user.model.js
│  ├─ routes/
│  │  ├─ blog.route.js
│  │  ├─ comment.route.js
│  │  └─ user.route.js
│  ├─ utils/
│  │  ├─ cloudinary.js
│  │  └─ dataUri.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ public/
│  │  ├─ blog-svgrepo-com.svg
│  │  └─ vite.svg
│  ├─ src/
│  │  ├─ assets/
│  │  │  ├─ auth.jpg
│  │  │  ├─ blog.jpg
│  │  │  ├─ blog2.png
│  │  │  ├─ logo.png
│  │  │  ├─ react.svg
│  │  │  └─ userlogo.png
│  │  ├─ components/
│  │  │  ├─ ui/
│  │  │  │  ├─ avatar.jsx
│  │  │  │  ├─ badge.jsx
│  │  │  │  ├─ breadcrumb.jsx
│  │  │  │  ├─ button.jsx
│  │  │  │  ├─ card.jsx
│  │  │  │  ├─ dialog.jsx
│  │  │  │  ├─ dropdown-menu.jsx
│  │  │  │  ├─ input.jsx
│  │  │  │  ├─ label.jsx
│  │  │  │  ├─ select.jsx
│  │  │  │  ├─ sonner.jsx
│  │  │  │  ├─ table.jsx
│  │  │  │  └─ textarea.jsx
│  │  │  ├─ BlogCard.jsx
│  │  │  ├─ BlogCardList.jsx
│  │  │  ├─ CommentBox.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Hero.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ PopularAuthors.jsx
│  │  │  ├─ RecentBlog.jsx
│  │  │  ├─ ResponsiveMenu.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ ThemeProvider.jsx
│  │  │  └─ TotalProperty.jsx
│  │  ├─ lib/
│  │  │  └─ utils.js
│  │  ├─ pages/
│  │  │  ├─ About.jsx
│  │  │  ├─ Blogs.jsx
│  │  │  ├─ BlogView.jsx
│  │  │  ├─ Comments.jsx
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ Profile.jsx
│  │  │  ├─ SearchList.jsx
│  │  │  ├─ SignUp.jsx
│  │  │  ├─ UpdateBlog.jsx
│  │  │  ├─ WriteBlog.jsx
│  │  │  └─ YourBlog.jsx
│  │  ├─ redux/
│  │  │  ├─ authSlice.js
│  │  │  ├─ blogSlice.js
│  │  │  ├─ commentSlice.js
│  │  │  ├─ store.js
│  │  │  └─ themeSlice.js
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ .gitignore
│  ├─ components.json
│  ├─ Docs.md
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ jsconfig.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  └─ vite.config.js
└─ Readme.md
```

## ⚙️ Setup Instructions

### clone the repository

```bash
git clone https://github.com/Aman235-code/I-Blog.git
```

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Backend runs on

```bash
http://localhost:8000
```

### Backend Environment Variables (backend/.env)

```bash
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Frontend runs on:

```bash
http://localhost:5173
```

### Frontend Environment Variables (frontend/.env)

```bash
VITE_API_URL=http://localhost:8000
```

## ✨ Features

User authentication (login & signup)
Create, edit, delete blogs
Publish & view blogs
Search blogs by title, category, or content
Comment system
User profile management
Responsive dashboard with drawer sidebar
Dark mode support

## 🔐 Authentication

Authentication is handled using JWT stored in HTTP-only cookies.

## 📌 API Endpoints

### 🔑 Auth Routes

### Register User

```bash
POST /api/v1/auth/register

Request:

{
  "firstName": "Aman",
  "lastName": "Ahamed",
  "email": "aman@email.com",
  "password": "password123"
}


Response:

{
  "success": true,
  "message": "User registered successfully"
}
```

### Login User

```bash
POST /api/v1/auth/login

Request:

{
  "email": "aman@email.com",
  "password": "password123"
}


Response:

{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "65ab123",
    "firstName": "Aman",
    "email": "aman@email.com"
  }
}
```

### Logout User

```bash
POST /api/v1/auth/logout

Response:

{
  "success": true,
  "message": "Logged out successfully"
}
```

### 👤 User Routes

### Get All Users

```bash
GET /api/v1/user/all-users

Response:

{
  "success": true,
  "users": [
    {
      "_id": "1",
      "firstName": "Aman",
      "photoUrl": "image_url"
    }
  ]
}
```

### Update Profile

```bash
PUT /api/v1/user/profile/update

Request (multipart/form-data):

firstName
lastName
bio
occupation
file (image)


Response:

{
  "success": true,
  "message": "Profile updated successfully",
  "user": { }
}
```

### 📝 Blog Routes

### Create Blog

```bash
POST /api/v1/blog/create

Request:

{
  "title": "My First Blog",
  "category": "Web Development"
}


Response:

{
  "success": true,
  "message": "Blog created successfully",
  "blog": {
    "_id": "123",
    "title": "My First Blog",
    "category": "Web Development"
  }
}
```

### Get Published Blogs

```bash
GET /api/v1/blog/get-published-blogs

Response:

{
  "success": true,
  "blogs": [
    {
      "_id": "123",
      "title": "React Tips",
      "author": {
        "firstName": "Aman"
      }
    }
  ]
}
```

### Get User Blogs

```bash
GET /api/v1/blog/blogs

Response:

{
  "success": true,
  "blogs": [ ]
}
```

### Delete Blog

```bash
DELETE /api/v1/blog/delete/:id

Response:

{
  "success": true,
  "message": "Blog deleted successfully"
}
```

### 💬 Comment Routes

### Get Comments on User Blogs

```bash
GET /api/v1/comment/my-blogs/comment

Response:

{
  "success": true,
  "comments": [
    {
      "content": "Great post!",
      "userId": { "firstName": "John" },
      "postId": { "title": "React Tips" }
    }
  ]
}
```

## 🎨 UI Highlights

Fully responsive design
Mobile drawer navigation
Clean empty-state handling
Dashboard tables adapt to small screens
Modern card-based layout

## 👤 Author

#### Built with ❤️ by Aman

## 📜 License

#### This project is licensed for learning and personal use.

### GITHUB

https://github.com/Aman235-code

## Thanks for Watching