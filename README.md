# 🏡 MiDulceHogar – Real Estate Web Platform

**MiDulceHogar** is a full-stack real estate platform that allows users to browse, search, and interact with property listings for buying or renting homes.

The application includes authentication, real-time messaging, geolocation with maps, and property management features. This project demonstrates modern full-stack development practices using JavaScript technologies.

---

# 🚀 Features

## 🏠 Property Listings
- Browse properties available for **sale or rent**
- View detailed property pages with images, price, and descriptions
- Display property locations on an interactive map
- Create and manage property listings

## 🔐 Authentication & Security
- Secure user authentication using **JWT**
- Password hashing with **bcrypt**
- Protected routes and authorization system

## 💬 Real-Time Messaging
- Users can communicate through **real-time chat**
- Built using **Socket.io**
- Messages update instantly without refreshing the page

## 🗺️ Map Integration
- Property locations displayed using **Leaflet**
- Interactive maps for better user experience
- Geolocation support

## ⚡ Modern Frontend
- Built with **React**
- Fast development environment using **Vite**
- Global state management with **Zustand**
- API communication using **Axios**

---

# 🏗️ Architecture

The project follows a **modular full-stack architecture** separated into three services:

```
MiDulceHogar
│
├── client   → React frontend
├── api      → REST API (Express + Prisma)
└── socket   → Real-time communication server
```

### Data Flow

Frontend → REST API → Database  
Frontend → Socket Server → Real-time updates

---

# 🛠️ Technologies Used

## Frontend
- React
- Vite
- React Router
- Sass
- Axios
- Leaflet / React Leaflet
- React Quill
- Zustand

## Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcrypt

## Real-Time Communication
- Socket.io

## Development Tools
- Git & GitHub
- ESLint
- Nodemon
- Vite

---

# 💡 Skills Demonstrated

This project demonstrates the following technical skills:

- Full-stack web development
- REST API design
- Authentication and authorization
- Database modeling with Prisma
- Real-time communication using WebSockets
- React component architecture
- State management
- Interactive map integration
- Secure backend development

---

# 📂 Installation & Setup

## Clone the Repository

```bash
git clone https://github.com/johandev456/MiDulceHogar.git
cd MiDulceHogar
```

---

# Backend Setup

```bash
cd api
npm install
```

Create a `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Run the backend server:

```bash
node app.js
```

Or with nodemon:

```bash
npx nodemon app.js
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# Socket Server

```bash
cd socket
npm install
npm run dev
```

---

# 👨‍💻 Author

**Johan Rosario**

Computer Science Engineering Student focused on full-stack development and modern web technologies.
