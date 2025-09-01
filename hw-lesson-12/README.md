# Posts Management Application

Full-stack posts management system built with React 19 and Node.js.

## Features

- Posts CRUD operations with pagination and infinite scroll
- Redux Toolkit state management with Entity Adapters
- Feature-Sliced Design architecture
- RESTful API with MongoDB
- Responsive design with Tailwind CSS
- Form validation and error handling

## Technology Stack

**Frontend:**
- React 19.1.1
- Redux Toolkit 2.8.2
- React Router 7.8.2
- Tailwind CSS 4.1.12
- Vite 7.1.2

**Backend:**
- Node.js + Express 5.1.0
- MongoDB/Mongoose 8.16.5
- Express Validator 7.2.1

## Project Structure

```
hw-lesson-12/
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
│
├── server/                 # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── index.js        # Server entry point
│   │   └── v1/             # API version 1
│   │       ├── controllers/
│   │       │   └── post.controller.js    # Post route handlers
│   │       ├── models/
│   │       │   └── Post.js               # Mongoose Post model
│   │       ├── routes/
│   │       │   └── post.routes.js        # Post API routes
│   │       ├── services/
│   │       │   └── post.service.js       # Business logic layer
│   │       ├── utils/
│   │       │   ├── asyncHandler.js       # Async error wrapper
│   │       │   └── httpError.js          # HTTP error class
│   │       └── validators/
│   │           └── post.schema.js        # Data validation schemas
│   ├── config/
│   │   ├── database.js     # MongoDB connection
│   │   └── default.mjs     # Environment configuration
│   ├── middleware/
│   │   └── errorHandler.js # Global error handling
│   ├── package.json        # Server dependencies
│   ├── README.md           # Server documentation
│   └── .gitignore          # Server-specific ignore rules
│
└── client/                 # Frontend React App (Vite)
    ├── src/
    │   ├── app/            # Application core layer (FSD)
    │   │   ├── App.jsx     # Root application component
    │   │   ├── router/
    │   │   │   ├── index.jsx           # Router configuration
    │   │   │   └── routes.constants.js # Route definitions
    │   │   └── store/
    │   │       └── index.js            # Redux store setup
    │   ├── entities/       # Business entities (FSD)
    │   │   └── post/       # Post domain entity
    │   │       ├── api/
    │   │       │   └── postApi.js      # API integration layer
    │   │       ├── model/
    │   │       │   ├── selectors.js    # Redux selectors
    │   │       │   ├── slice.js        # Redux slice + entity adapter
    │   │       │   └── thunks.js       # Async thunks
    │   │       ├── ui/
    │   │       │   ├── PostCard.jsx    # Post display component
    │   │       │   ├── PostForm.jsx    # Post creation/editing
    │   │       │   ├── PostList.jsx    # Posts list with pagination
    │   │       │   ├── PostsManager.jsx # Main posts management
    │   │       │   └── PostTabs.jsx    # View mode switcher
    │   │       └── index.js            # Entity public API
    │   ├── features/       # Application features (FSD)
    │   │   ├── infinite-scroll/
    │   │   │   ├── hooks/
    │   │   │   │   └── useInfiniteScroll.js # Infinite scroll logic
    │   │   │   ├── model/
    │   │   │   │   ├── selectors.js    # Feature selectors
    │   │   │   │   └── slice.js        # Feature state
    │   │   │   ├── ui/
    │   │   │   │   └── InfiniteScrollList.jsx # Scroll component
    │   │   │   └── index.js            # Feature public API
    │   │   ├── pagination/
    │   │   │   ├── hooks/
    │   │   │   │   └── usePagination.js # Pagination logic
    │   │   │   ├── model/
    │   │   │   │   ├── selectors.js    # Pagination selectors
    │   │   │   │   ├── slice.js        # Pagination state
    │   │   │   │   └── thunks.js       # Pagination thunks
    │   │   │   ├── ui/
    │   │   │   │   └── Pagination.jsx  # Pagination controls
    │   │   │   └── index.js            # Feature public API
    │   │   └── post-form/
    │   │       ├── model/
    │   │       │   └── slice.js        # Form state management
    │   │       ├── ui/
    │   │       │   └── PostForm.jsx    # Form component
    │   │       └── index.js            # Feature public API
    │   ├── shared/         # Shared resources (FSD)
    │   │   ├── config/
    │   │   │   └── api.js              # API configuration
    │   │   ├── hooks/
    │   │   │   └── usePosts.js         # Reusable posts hook
    │   │   ├── ui/
    │   │   │   ├── LoadingRowSkeleton.jsx   # Loading skeleton
    │   │   │   ├── PageBoundaryBadge.jsx    # Page separator
    │   │   │   ├── PostListSkeleton.jsx     # Posts skeleton
    │   │   │   └── ProgressBar.jsx          # Loading indicator
    │   │   └── index.js                # Shared exports
    │   ├── layouts/        # Layout components
    │   │   └── MainLayout.jsx          # Main app layout
    │   ├── pages/          # Application pages
    │   │   ├── HomePage.jsx            # Landing page
    │   │   ├── PostFormPage.jsx        # Create/edit post page
    │   │   └── PostsPage.jsx           # Posts listing page
    │   ├── widgets/        # Complex UI widgets
    │   │   ├── Breadcrumbs.jsx         # Navigation breadcrumbs
    │   │   ├── Navbar.jsx              # Main navigation
    │   │   ├── MobileDrawer/           # Mobile navigation
    │   │   │   ├── MobileDrawer.jsx    # Drawer component
    │   │   │   ├── MobileMenuButton.jsx # Toggle button
    │   │   │   └── index.js            # Widget exports
    │   │   └── index.js                # Widgets exports
    │   ├── main.jsx        # Application entry point
    │   └── index.css       # Global styles + Tailwind
    ├── package.json        # Client dependencies & scripts
    ├── vite.config.js      # Vite configuration + path aliases
    ├── tailwind.config.js  # Tailwind CSS configuration
    ├── eslint.config.js    # ESLint configuration
    ├── vercel.json         # Vercel deployment config
    └── index.html          # HTML template
```

## Quick Start

**Prerequisites:** Node.js 18+, MongoDB

**Installation:**
```bash
git clone https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla.git
cd 2025-react-course-by-andriy-bryla/hw-lesson-12

# Server
cd server && npm install && npm run dev

# Client (new terminal)
cd client && npm install && npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## API Endpoints

```
GET    /api/v1/posts           # Get posts (paginated)
POST   /api/v1/posts           # Create post
GET    /api/v1/posts/:id       # Get single post
PUT    /api/v1/posts/:id       # Update post
DELETE /api/v1/posts/:id       # Delete post
```

## Development

**Server:**
```bash
cd server
npm run dev    # Development with nodemon
npm start      # Production
```

**Client:**
```bash
cd client
npm run dev    # Development server
npm run build  # Production build
npm run lint   # Code linting
```

---

**Course:** React JS by Andriy Bryla (2025) | **Lesson:** 12
