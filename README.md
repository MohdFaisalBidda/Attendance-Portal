# Attendance Portal Full Stack Application

This repository houses the codebase for our attendance portal Application. This system is designed to mark attendance. In addition to this, it also include a feature of secure authentication mechanism.

## Features

- Authentication: Enables user registration and login.
- Attendance: Allows user to mark attendance.
- Admin Dashboard: Dashboard for all the students/users attendance.
- JWT : JSON Web Token is used for Authentication and Authorization. They are often used as tokens to authenticate users and maintain sessions.


## Technologies Used

- React.js: The frontend of our Attendance Portal Application is built using React.js, with powerfull use of Context API for global states or state management.

- Express.js: Our backend is constructed with Express.js, a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- MongoDB: We use MongoDB as our primary database to store all transactional and user data. MongoDB is a source-available cross-platform document-oriented database program, known for its high scalability and flexibility.

- TailwindCSS: This is the Utility-first CSS framework for creating frontend components.


## Getting Started

Here's how you can use this repository:

Install and run locally Attendance Portal with npm

```bash
  Installation for Frontend
  > cd frontend
  > npm i 
  > create a .env file 
   - Add REACT_APP_API_URL varaibale (For Example: REACT_APP_API_URL="http://localhost:4000")
  > npm start
```

```bash
  Installation for Backend
  > cd backend
  > npm i
  > create a .env file 
   - Add MONGO_URI varaibale (For example: MONGO_URI="mongodb+srv://username:password@cluster0.6u2l6tl.mongodb.net/database_name")
   - Add JWT_SECRET varaibale 
  > npm start or npm run dev
```
