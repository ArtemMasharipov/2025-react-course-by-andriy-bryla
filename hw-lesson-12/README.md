# Posts Management Application

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=for-the-badge&logo=redux)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.16.5-47A248?style=for-the-badge&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-7.0+-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## Overview

Professional full-stack application for posts management built with React 19 and Node.js. Features advanced state management, performance optimizations, and modern architectural patterns.

### Key Features

- Advanced State Management with Redux Toolkit & Entity Adapters
- Feature-Sliced Design (FSD) Architecture
- Performance Optimization with React.memo and lazy loading
- RESTful API with comprehensive error handling
- Responsive UI/UX with modern design system
- Real-time Updates with optimistic UI patterns
- Type-Safe Development with ESLint

---

## Technology Stack

### Frontend

- **React 19.1.1** - Modern React with latest features
- **Vite 7.0+** - Fast build tool with HMR
- **Redux Toolkit 2.8.2** - Modern state management
- **React Router 7.8.2** - Client-side routing
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Axios 1.11.0** - HTTP client with interceptors
- **ESLint 9.33.0** - Code quality enforcement

### Backend

- **Node.js 18+** - JavaScript runtime
- **Express 5.1.0** - Web framework for Node.js
- **MongoDB 8.16.5** - NoSQL database with Mongoose ODM
- **Express Validator 7.2.1** - Data validation and sanitization
- **CORS 2.8.5** - Cross-Origin Resource Sharing

### Architecture Patterns

- **Feature-Sliced Design (FSD)** - Business domain structuring
- **Entity Adapters** - Optimized Redux collection management
- **Custom Hooks** - Component logic reuse
- **Optimistic Updates** - Enhanced UX for async operations
- **Path Aliases** - Clean imports with @/ prefix

---

## Project Structure

```
hw-lesson-12/
├── server/                 # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── index.js        # Server entry point
│   │   └── v1/
│   │       ├── controllers/# API controllers
│   │       ├── models/     # MongoDB models (Mongoose)
│   │       ├── routes/     # API routes
│   │       ├── services/   # Business logic
│   │       ├── utils/      # Utilities (asyncHandler, httpError)
│   │       └── validators/ # Data validation (express-validator)
│   ├── config/             # Configuration files
│   ├── middleware/         # Middleware layer
│   ├── .env.example        # Environment template
│   └── package.json        # Dependencies
│
└── client/                 # Frontend React App (Vite)
    ├── src/
    │   ├── app/            # Application core
    │   │   ├── App.jsx     # Main component
    │   │   ├── router/     # Routing configuration
    │   │   └── store/      # Redux store setup
    │   ├── entities/       # Business entities (FSD)
    │   │   └── post/       # Post domain
    │   │       ├── api/    # API integration
    │   │       ├── model/  # Business logic
    │   │       └── ui/     # UI components
    │   ├── features/       # Application features
    │   │   ├── infinite-scroll/ # Infinite scroll
    │   │   ├── pagination/ # Pagination system
    │   │   └── post-form/  # Post form management
    │   ├── shared/         # Shared resources
    │   │   ├── config/     # App configuration
    │   │   └── ui/         # Reusable components
    │   ├── layouts/        # Page layouts
    │   ├── pages/          # Application pages
    │   ├── widgets/        # Complex UI widgets
    │   ├── main.jsx        # Entry point
    │   └── index.css       # Global styles
    ├── .env.example        # Environment variables
    ├── package.json        # Dependencies
    ├── vite.config.js      # Vite configuration
    ├── tailwind.config.js  # Tailwind config
    └── index.html          # HTML template
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 4.0+
- npm 8.0+

### Installation

```bash
# Clone repository
git clone https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla.git
cd hw-lesson-12

# Install dependencies
npm run install:all

# Configure environment
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start development servers
npm run dev
```

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

---

## Core Functionality

### Posts Management

| Feature                                  | Status |
| ---------------------------------------- | ------ |
| View Posts (paginated & infinite scroll) | ✅     |
| Create Posts (with validation)           | ✅     |
| Edit Posts (optimistic updates)          | ✅     |
| Delete Posts (confirmation dialogs)      | ✅     |
| Search & Filter                          | ✅     |
| Responsive Design                        | ✅     |

### User Experience

| Feature                       | Status |
| ----------------------------- | ------ |
| Modern Design (Emerald theme) | ✅     |
| Navigation (sticky navbar)    | ✅     |
| Loading States (skeletons)    | ✅     |
| Error Handling (boundaries)   | ✅     |
| Form Validation               | ✅     |
| Accessibility (ARIA)          | ✅     |
| Performance (memoization)     | ✅     |

---

## API Reference

### Endpoints

```http
GET    /api/v1/posts           # Get all posts (paginated)
GET    /api/v1/posts/:id       # Get single post
POST   /api/v1/posts           # Create new post
PUT    /api/v1/posts/:id       # Update existing post
DELETE /api/v1/posts/:id       # Delete post
```

### Response Format

```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  },
  "message": "Posts retrieved successfully"
}
```

---

## Development Scripts

### Root Scripts

```bash
npm run dev              # Start both frontend and backend
npm run install:all      # Install all dependencies
npm run build            # Build for production
npm run lint             # Run linting
```

### Client Scripts

```bash
npm run dev              # Development server with HMR
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # ESLint checks
```

### Server Scripts

```bash
npm run dev              # Development with nodemon
npm run start            # Production server
npm run seed             # Seed database
```

---

## Performance Metrics

| Metric                 | Target  | Status |
| ---------------------- | ------- | ------ |
| Initial Bundle Size    | < 200KB | ✅     |
| First Contentful Paint | < 1.5s  | ✅     |
| Time to Interactive    | < 2.5s  | ✅     |
| Lighthouse Score       | > 90    | ✅     |

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Course**: React JS by Andriy Bryla (2025)
**Lesson**: 12 - Advanced Architecture & Performance
**Student**: Artem Masharipov
**Repository**: https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla
