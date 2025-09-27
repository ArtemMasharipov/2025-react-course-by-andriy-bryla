# 📚 React JS Course - Homework Lesson 17

## 🎯 **Full-Stack Application with Authentication**

A modern full-stack web application built with React, Redux Toolkit, and Node.js featuring user authentication, role-based access control, and CRUD operations.

### 🚀 **Live Demo**
- **Frontend:** [Vercel Deployment](https://your-app.vercel.app)
- **Backend:** [Render Deployment](https://your-backend.onrender.com)

### 🛠️ **Tech Stack**

#### Frontend
- **React 19** - Modern React with latest features
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

#### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **File-based Database** - JSON files for data storage

### 📁 **Project Structure**

```
hw-lesson-17/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/           # App configuration
│   │   ├── pages/         # Route components
│   │   ├── widgets/       # Complex UI components
│   │   ├── features/      # Business features
│   │   ├── entities/      # Business entities
│   │   └── shared/        # Shared utilities
│   └── vercel.json        # Vercel deployment config
├── server/                 # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── data/             # JSON database files
└── README.md             # This file
```

### 🔐 **Features**

- **User Authentication** - Login/logout with JWT tokens
- **Role-Based Access** - Admin, Manager, Client roles
- **User Management** - CRUD operations for users
- **Posts System** - Create and view posts
- **Comments System** - Add comments to posts
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Comprehensive error management
- **Loading States** - User-friendly loading indicators

### 🚀 **Quick Start**

#### Prerequisites
- Node.js 18+ 
- npm or yarn

#### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hw-lesson-17
```

2. **Install dependencies**
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Start development servers**
```bash
# Backend (Terminal 1)
cd server
npm run dev

# Frontend (Terminal 2)
cd client
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### 🔧 **Environment Variables**

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

#### Backend (.env)
```env
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### 📦 **Deployment**

#### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set Root Directory to `client`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

#### Backend (Render)
1. Connect GitHub repository to Render
2. Set Root Directory to `server`
3. Add environment variables:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-app.vercel.app`
   - `JWT_SECRET=your-secret-key`

### 🧪 **Testing**

#### Default Users
- **Admin:** admin@example.com / admin123
- **Manager:** manager@example.com / manager123
- **Client:** client@example.com / client123

### 📚 **API Endpoints**

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

#### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `DELETE /api/users/:id` - Delete user

#### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID

#### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment

### 🏗️ **Architecture**

The application follows **Feature-Sliced Design (FSD)** architecture:

- **app/** - Application configuration and initialization
- **pages/** - Route-level components
- **widgets/** - Complex UI components
- **features/** - Business features and functionality
- **entities/** - Business entities and data models
- **shared/** - Shared utilities, UI components, and configurations

### 🔒 **Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Input validation
- Error handling

### 📱 **Responsive Design**

- Mobile-first approach
- Tailwind CSS for styling
- Responsive navigation
- Touch-friendly interfaces

### 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### 📄 **License**

This project is part of the React JS Course homework assignments.

---

**Course:** React JS Andriy Bryla Course  
**Lesson:** 17 - Full-Stack Application with Authentication  
**Student:** [Your Name]
