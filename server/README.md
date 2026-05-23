Project Management Backend API

A REST API for project and task management built with the MERN stack using Node.js, Express, MongoDB, JWT auth, Cloudinary uploads, and Nodemailer.

Features
User authentication & OTP verification
Project & task management
Comments & notifications
File uploads with Cloudinary
Search, filter, sort & pagination
JWT protected routes
Tech Stack
Node.js
Express.js
MongoDB + Mongoose
JWT + bcryptjs
Nodemailer
Cloudinary
express-validator
Setup
git clone --repolink
cd server
npm install

Create .env from .env.example

npm run dev

Server runs on:

http://localhost:5000
Main APIs
/api/auth
/api/users
/api/projects
/api/tasks
/api/comments
/api/notifications
Auth

Protected routes require:

Authorization: Bearer <token>
Environment Variables

Add:

MONGO*URI
JWT_SECRET
EMAIL*_
CLOUDINARY\__
Health Check
GET /api/health

Returns server status.
