# 🚀 Backend - Node.js API Server

RESTful API server built with Express.js, featuring authentication, CRUD operations, and file-based database.

## 🛠️ **Tech Stack**

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 📁 **Project Structure**

```
server/
├── controllers/     # Request handlers
├── services/        # Business logic
├── models/         # Data models
├── routes/         # API routes
├── middleware/     # Express middleware
├── data/          # JSON database files
└── utils/         # Utility functions
```

## 🔧 **Environment Variables**

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 📚 **API Endpoints**

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID

### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment

### Health Check
- `GET /api/health` - Server health status

## 🔒 **Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Input validation

## 📦 **Deployment**

### Render.com
1. Connect GitHub repository
2. Set Root Directory: `server`
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=your-production-secret
```

## 🧪 **Testing**

Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Login
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## 🏗️ **Architecture**

- **MVC Pattern** - Model-View-Controller separation
- **Service Layer** - Business logic abstraction
- **Middleware** - Request processing pipeline
- **File-based Database** - JSON files for data storage