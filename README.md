 
# Project Management Tool

A full-stack web application built using the MERN stack to manage projects, tasks, and team workflows efficiently.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Axios, React Router, CSS |
| Backend | Node.js, Express.js, JWT Authentication |
| Database | MongoDB Atlas, Mongoose ORM |
| Tools | VS Code, Postman, GitHub |

---

## Features

- User Registration and Login with JWT Authentication
- Role-based access control — Admin, Manager, Member
- Create, view, and delete Projects
- Create, update, and delete Tasks
- Task status tracking — To-Do, In Progress, Done
- Priority levels — Low, Medium, High
- Deadline tracking per task
- Interactive Dashboard with real-time project and task statistics

---

## Project Structure

```
project-management-tool/
├── client/                  # React Frontend
│   └── src/
│       ├── components/      # Navbar, PrivateRoute
│       ├── context/         # Auth Context (JWT)
│       ├── pages/           # Login, Register, Dashboard, Projects, Tasks
│       └── App.js           # Main app with routing
├── server/                  # Node.js + Express Backend
│   ├── config/              # MongoDB connection
│   ├── middleware/          # JWT Auth middleware
│   ├── models/              # User, Project, Task schemas
│   ├── routes/              # Auth, Project, Task API routes
│   └── server.js            # Entry point
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Pallavigk-rnsit/project-management-tool.git
cd project-management-tool
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the `/server` directory and add the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Project Timeline

| Phase | Activity | Duration |
|-------|----------|----------|
| Phase 1 | Requirement Analysis and Synopsis Submission | Apr 25 – Apr 26 |
| Phase 2 | Backend Development — APIs, Auth, Database | Apr 27 – Apr 30 |
| Phase 3 | Frontend Development — React UI and Routing | May 1 – May 5 |
| Phase 4 | Integration and Testing | May 6 – May 8 |
| Phase 5 | Documentation and Final Submission | May 9 – May 10 |

---

## Developer Details

| Field | Details |
|-------|---------|
| Name | Pallavi G K |
| USN | 1RN22AI079 |
| College | RNSIT |
| Branch | AI and ML |
| Internship Company | Thaniya Technologies |
| Email | pallavikumaraswamy2002@gmail.com |

---

## License

This project was developed as part of an internship assignment at **Thaniya Technologies**.