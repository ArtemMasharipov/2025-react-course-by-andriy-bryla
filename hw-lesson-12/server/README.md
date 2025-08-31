# Posts API Server

Backend API server for Posts Management App built with Node.js, Express, and MongoDB.

## Technologies

- **Node.js 18+** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB/Mongoose 8.16.5** - NoSQL database
- **Express Validator 7.2.1** - Data validation
- **CORS 2.8.5** - Cross-origin support
- **Dotenv 17.2.1** - Environment variables

## API Endpoints

### Posts

```
GET    /api/v1/posts           # Get all posts (paginated)
GET    /api/v1/posts/:id       # Get single post
POST   /api/v1/posts           # Create new post
PUT    /api/v1/posts/:id       # Update post
DELETE /api/v1/posts/:id       # Delete post
```

## Project Structure

```
server/
├─ src/
│  ├─ index.js              # Server entry point
│  └─ v1/                   # API v1
│     ├─ controllers/       # Route handlers
│     ├─ models/           # Mongoose models
│     ├─ routes/           # API routes
│     ├─ services/         # Business logic
│     ├─ utils/            # Utilities
│     └─ validators/       # Data validation
├─ config/                  # Configuration
├─ middleware/              # Express middleware
└─ package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

Create `.env` file with:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/posts-app
NODE_ENV=development
```

---

**Part of**: Posts Management App (Lesson 12)
**Course**: React JS by Andriy Bryla (2025)</content>
<parameter name="filePath">e:\FrontEnd and BackEnd Education (2022-2025)\Freelancer_Lifestyle_Education\2025_React_JS_Andriy_Bryla_Course\hw-lesson-12 — копия (3)\server\README.md
