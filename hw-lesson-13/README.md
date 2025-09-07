# Posts Management Application - RTK Query Integration

Advanced full-stack posts management system showcasing RTK Query for efficient data fetching and caching.

## Key Features

- **RTK Query Integration**: Automatic caching, background refetching, and data synchronization
- **Infinite Scroll**: Seamless post loading with Intersection Observer API
- **Dual View Modes**: Toggle between pagination and infinite scroll
- **Optimistic Updates**: Real-time UI updates with automatic cache invalidation
- **Scroll-to-Top**: Enhanced UX with smooth scrolling functionality
- **Feature-Sliced Design**: Modern architecture with clean separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4.x

## Technology Stack

**Frontend:**

- React 19.1.1
- **RTK Query 2.8.2** (instead of traditional Redux Toolkit slices)
- React Router 7.8.2
- Tailwind CSS 4.1.12
- Vite 7.1.2

**Backend:**

- Node.js + Express 5.1.0
- MongoDB/Mongoose 8.16.5
- Express Validator 7.2.1

## Project Structure

```
hw-lesson-13/
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
    │   │       └── index.js            # RTK Query store setup
    │   ├── entities/       # Business entities (FSD)
    │   │   └── post/       # Post domain entity
    │   │       ├── api/
    │   │       │   └── postsApi.js     # RTK Query API slice
    │   │       ├── ui/
    │   │       │   ├── PostCard.jsx    # Post display component
    │   │       │   ├── PostForm.jsx    # Post form UI (no actions, uses slots)
    │   │       │   ├── PostList/       # Posts list components
    │   │       │   │   ├── PostList.jsx # Main posts list with modes
    │   │       │   │   ├── components/
    │   │       │   │   │   └── PaginationControls.jsx # Extracted pagination
    │   │       │   │   └── index.js    # Component exports
    │   │       │   ├── PostsManager.jsx # Main posts management
    │   │       │   └── PostTabs.jsx    # View mode switcher
    │   │       └── index.js            # Entity public API
    │   ├── shared/         # Shared resources (FSD)
    │   │   ├── api/
    │   │   │   └── baseApi.js          # RTK Query base API
    │   │   ├── hooks/
    │   │   │   ├── useInfiniteScrollQuery.js # Infinite scroll hook
    │   │   │   └── usePostsQuery.js    # Posts query hook
    │   │   ├── ui/
    │   │   │   └── PostListSkeleton.jsx # Loading skeleton
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
cd 2025-react-course-by-andriy-bryla/hw-lesson-13

# Server
cd server && npm install && npm run dev

# Client (new terminal)
cd client && npm install && npm run dev
```

**Access:**

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## RTK Query Implementation

### Key Features

**Automatic Caching:**

- Smart caching with automatic background refetching
- Cache invalidation on mutations (create, update, delete)
- Optimistic updates for better UX

**Infinite Scroll:**

- Intersection Observer API for efficient scroll detection
- Automatic data fetching as user scrolls
- Scroll-to-top functionality for enhanced navigation

**Component Architecture:**

- Extracted `PaginationControls` for modularity
- Clean separation between pagination and infinite scroll modes
- Feature-Sliced Design with RTK Query integration

### API Endpoints

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

**Course:** React JS by Andriy Bryla (2025) | **Lesson:** 13 - RTK Query Integration

**Key Learning Outcomes:**

- RTK Query for efficient data management
- Intersection Observer API for infinite scroll
- Component extraction and modular design
- Performance optimization with automatic caching
