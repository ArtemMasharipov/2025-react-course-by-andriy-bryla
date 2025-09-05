```markdown
# Posts Management Application – RTK Query

Full-stack posts management system built as part of the **React JS Course by Andriy Bryla (2025)**.  
Implements **RTK Query** for efficient data fetching, caching, and synchronization with a clean Feature-Sliced Design (FSD) architecture.

## Features

- Posts CRUD operations with pagination and infinite scroll
- RTK Query for data fetching, caching, and invalidation
- Feature-Sliced Design architecture for maintainability and scalability
- RESTful API with MongoDB and validation
- Responsive UI with Tailwind CSS
- Optimistic updates, background refetching, and error handling

## Technology Stack

**Frontend:**

- React 19.1.1  
- Redux Toolkit (RTK Query) 2.8.2  
- React Router 7.8.2  
- Tailwind CSS 4.1.12  
- Vite 7.1.2  

**Backend:**

- Node.js + Express 5.1.0  
- MongoDB / Mongoose 8.16.5  
- Express Validator 7.2.1  

## Project Structure

```

hw-lesson-13/
├── README.md
├── .gitignore
│
├── server/                 # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── index.js        # Server entry point
│   │   └── v1/             # API v1
│   │       ├── controllers/    # Route handlers
│   │       ├── models/         # Mongoose schemas
│   │       ├── routes/         # Express routes
│   │       ├── services/       # Business logic layer
│   │       ├── utils/          # Helpers (async wrapper, errors)
│   │       └── validators/     # Validation schemas
│   ├── config/             # DB + environment config
│   ├── middleware/         # Global error handling
│   └── package.json
│
└── client/                 # Frontend React app (Vite + FSD)
├── src/
│   ├── app/            # Core (router, store, entry point)
│   ├── entities/       # Domain entities (posts, etc.)
│   │   └── post/
│   │       ├── api/
│   │       │   └── postApi.js        # RTK Query API slice
│   │       ├── model/
│   │       │   └── selectors.js      # Entity selectors
│   │       └── ui/                   # Post UI components
│   ├── features/       # Features (pagination, infinite scroll)
│   │   ├── infinite-scroll/
│   │   └── pagination/
│   ├── shared/         # Shared UI, hooks, config
│   ├── layouts/        # Application layouts
│   ├── pages/          # Page-level components
│   ├── widgets/        # UI widgets (navbar, drawers, breadcrumbs)
│   ├── main.jsx        # App entry
│   └── index.css       # Tailwind global styles
├── vite.config.js      # Vite config + path aliases
├── tailwind.config.js
└── package.json

````

## Quick Start

**Requirements:** Node.js 18+, MongoDB

```bash
git clone https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla.git
cd 2025-react-course-by-andriy-bryla/hw-lesson-13

# Backend
cd server
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
````

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:4000](http://localhost:4000)

## API Endpoints

```
GET    /api/v1/posts           # Get posts (paginated)
POST   /api/v1/posts           # Create post
GET    /api/v1/posts/:id       # Get single post
PUT    /api/v1/posts/:id       # Update post
DELETE /api/v1/posts/:id       # Delete post
```

## Development Scripts

**Server:**

```bash
npm run dev    # Run in development with nodemon
npm start      # Run in production
```

**Client:**

```bash
npm run dev    # Start Vite dev server
npm run build  # Production build
npm run lint   # ESLint checks
```

---

**Course:** React JS by Andriy Bryla (2025)
**Lesson:** 13 – Posts Management App (RTK Query)
**Student:** Artem Masharipov

```
```
