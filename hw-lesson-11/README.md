# Products App

Full-featured SPA application for product management using React and Node.js.

## Project Structure

```
hw-lesson-11/
├─ server/                 # Backend API (Express + MongoDB)
│  ├─ src/
│  │  ├─ v1/
│  │  │  ├─ controllers/   # API Controllers
│  │  │  ├─ models/        # MongoDB Models (Mongoose)
│  │  │  ├─ routes/        # API Routes
│  │  │  ├─ services/      # Business Logic
│  │  │  ├─ utils/         # Utilities (asyncHandler, httpError)
│  │  │  └─ validators/    # Data Validation (express-validator)
│  │  └─ index.js          # Server Entry Point
│  ├─ config/              # Configuration (database.js, default.mjs)
│  ├─ middleware/          # Middleware (errorHandler, validation)
│  ├─ .env.example         # Environment Variables Template
│  └─ package.json
│
└─ client/                 # Frontend React App (Vite)
   ├─ src/
   │  ├─ store/            # Redux store configuration
   │  │  └─ index.js       # Main store (configureStore)
   │  ├─ router/           # Application Routing
   │  │  ├─ index.jsx      # Router configuration (createBrowserRouter)
   │  │  └─ routes.constants.js # Route Constants
   │  ├─ entities/         # Business Entities (Feature-Sliced Design)
   │  │  ├─ product/       # Product Domain
   │  │  │  ├─ api/        # API Layer (productApi.js)
   │  │  │  ├─ model/      # Product Business Logic
   │  │  │  │  ├─ slice.js     # Redux slice (entityAdapter)
   │  │  │  │  ├─ thunks.js    # Async thunks (CRUD operations)
   │  │  │  │  ├─ selectors.js # Optimized selectors
   │  │  │  │  └─ hooks.js     # Custom hooks
   │  │  │  └─ ui/         # Product UI Components
   │  │  │     ├─ ProductCard.jsx    # Product Card
   │  │  │     ├─ ProductForm.jsx    # Product Form
   │  │  │     └─ ProductList.jsx    # Product List
   │  │  └─ post/          # Post Domain
   │  │     ├─ api/        # API Layer for JSONPlaceholder
   │  │     ├─ model/      # Post Business Logic
   │  │     └─ ui/         # Post UI Components
   │  ├─ features/         # Application Features
   │  │  └─ product-filter/ # Product Filtering Feature
   │  │     ├─ model/      # Filtering Logic
   │  │     │  └─ slice.js     # Filter slice
   │  │     └─ ui/         # Filtering UI Components
   │  │        └─ FilterInput.jsx # Search field with debouncing
   │  ├─ shared/           # Shared Resources
   │  │  ├─ config/        # Application Configuration
   │  │  │  └─ api.js      # API endpoints & constants
   │  │  └─ ui/            # Reusable UI Components
   │  │     └─ Loader.jsx  # Loading Component
   │  ├─ layouts/          # Page Layouts
   │  │  └─ MainLayout.jsx # Main layout with Suspense
   │  ├─ pages/            # Application Pages
   │  │  ├─ HomePage.jsx       # Home Page
   │  │  ├─ ProductsPage.jsx   # Products Page
   │  │  ├─ PostsPage.jsx      # Posts Page
   │  │  └─ ProductFormPage.jsx # Create/Edit Form
   │  ├─ widgets/          # Complex UI Components
   │  │  ├─ Navbar.jsx     # Navigation Bar
   │  │  ├─ Drawer.jsx     # Mobile Menu
   │  │  └─ Breadcrumb.jsx # Navigation Breadcrumbs
   │  ├─ App.jsx           # Main Application Component
   │  ├─ main.jsx          # Entry Point (React 19)
   │  └─ index.css         # Global Styles (Tailwind)
   ├─ .env.example         # Environment Variables Template
   ├─ package.json         # Dependencies and Scripts
   ├─ vite.config.js       # Vite Configuration
   ├─ tailwind.config.js   # Tailwind CSS Configuration
   └─ index.html           # HTML Template
```

## Technologies

### Frontend
- **React 19.1.1** - Modern React version with new hooks
- **Vite 7.0+** - Fast builder with Hot Module Replacement
- **React Router DOM 7.8.2** - Client-side routing
- **Redux Toolkit 2.8.2** - Modern state management
- **Axios 1.11.0** - HTTP client with interceptors
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **ESLint 9.33.0** - Linting and code quality

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 5.1.0** - Minimalist web framework
- **MongoDB/Mongoose 8.16.5** - NoSQL database with ODM
- **Express Validator 7.2.1** - Data validation and sanitization
- **CORS 2.8.5** - Cross-Origin Resource Sharing
- **Dotenv 17.2.1** - Environment variable management

### Architectural Patterns
- **Feature-Sliced Design (FSD)** - Business domain structuring
- **Entity Adapter** - Optimized Redux collection management
- **Custom Hooks** - Component logic reuse
- **Lazy Loading** - Code splitting for routes
- **Optimistic Updates** - UX improvements for async operations

## Project Launch

### Development (launch both parts)

```bash
npm run dev
```

### Only Server

```bash
npm run server:dev
```

### Only Client

```bash
npm run client:dev
```

## Functionality

### Products

- ✅ View product list
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Search and filter products
- ✅ Responsive design

### Posts

- ✅ View posts from JSONPlaceholder API
- ✅ Responsive post display
- ✅ Loading states

### UI/UX Features

- ✅ Modern responsive design
- ✅ Dark/light theme support
- ✅ Mobile navigation with drawer
- ✅ Sticky navigation header
- ✅ Loading states and error handling
- ✅ Form validation
- ✅ Accessibility support

## API Endpoints

```
GET    /api/v1/products           # Get all products
POST   /api/v1/products           # Create new product
PUT    /api/v1/products/:id       # Update product
DELETE /api/v1/products/:id       # Delete product
GET    /api/v1/posts             # Get posts from JSONPlaceholder
```

## Installation and Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla.git
   cd hw-lesson-11
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   # Edit .env files with your actual configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

### Database Seeding

```bash
# Seed database with 30 sample products
cd server
npm run seed

# Clear seeded data
npm run seed:clear
```

## Key Features

### Frontend Optimizations
- **Lazy Loading**: Route-based code splitting
- **Memoization**: React.memo, useMemo, useCallback
- **Deferred Search**: useDeferredValue for smooth filtering
- **Custom Hooks**: Reusable logic extraction
- **Error Boundaries**: Graceful error handling

### Backend Features
- **RESTful API**: CRUD operations for products
- **MongoDB Integration**: Mongoose ODM with text indexing
- **Validation**: Express-validator with custom error messages
- **CORS**: Cross-origin resource sharing
- **Environment Configuration**: dotenv for secure config

### UI/UX Features
- **Emerald Theme**: Eye-friendly color palette
- **Sticky Navigation**: Fixed header with backdrop blur
- **Mobile Navigation**: Responsive burger menu and drawer
- **Search Functionality**: Real-time product filtering
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

## Design System

### Color Palette
- **Primary**: Emerald (#10b981, #059669)
- **Background**: Emerald-50/950 (light/dark)
- **Text**: Emerald-800/100 (light/dark)
- **Accent**: Emerald-200/700 (borders)

### Typography
- **Headings**: font-semibold tracking-tight
- **Body**: font-medium text-sm
- **Labels**: text-xs uppercase tracking-wide

### Components
- **Buttons**: Consistent styling with hover states
- **Cards**: Gradient backgrounds with shadow effects
- **Forms**: Accessible inputs with focus states
- **Navigation**: Sticky header with mobile drawer

## Performance Metrics

### Bundle Analysis
- **Main Bundle**: ~150KB (gzipped)
- **Vendor Chunks**: Separated for optimal caching
- **Lazy Chunks**: Route-based loading

### Runtime Performance
- **Initial Load**: < 2s
- **Search Response**: < 100ms (debounced)
- **Navigation**: Instant (code-split)
- **Memory Usage**: Optimized with memoization

## Scripts

### Root Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install:all` - Install dependencies for all parts of the project

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Server Scripts
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run seed:clear` - Clear seeded data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of a React JS course by Andriy Bryla.

## Acknowledgments

- **Course Instructor**: Andriy Bryla
- **Technologies**: React, Redux, Express, MongoDB
- **Community**: React ecosystem contributors

---

**Course**: React JS by Andriy Bryla (2025)
**Lesson**: 11 - Advanced Performance & Full-Stack Development
**Student**: Artem Masharipov
