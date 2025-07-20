# HW Lesson 7. Full-Stack React Application

Educational full-stack project demonstrating React 19 with React Router 7, modern state management, and Node.js/Express backend with MongoDB integration.

## Overview

This project implements a complete e-commerce application with product catalog, category navigation, and modern UI/UX patterns. Features include state machine architecture, performance optimization, and professional navigation with mobile-responsive design.

## Architecture

### 🏗️ Full-Stack Monorepo
- **Frontend:** React 19 + React Router 7 + Tailwind CSS
- **Backend:** Node.js + Express 4.21 + MongoDB
- **Architecture:** Feature-based organization with state machines
- **API:** RESTful endpoints with proper error handling

### 🎯 Key Features
- **Product Catalog:** Browse products by categories with filtering
- **State Management:** Professional state machine patterns (loading → error → empty → success)
- **Routing:** Hierarchical routing with breadcrumbs navigation
- **UI/UX:** Sticky navigation with mobile burger menu and glassmorphism effects
- **Performance:** Memoization, virtualization, and optimized API calls with AbortController
- **Responsive Design:** Mobile-first approach with Tailwind CSS

## Tech Stack

### Frontend (Client)
- **React 19.1.0** - Latest React with concurrent features
- **React Router 7.6.3** - Modern routing with data patterns
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Vite 7.0.4** - Lightning-fast build tool
- **Axios** - HTTP client with interceptors and timeout handling

### Backend (Server)
- **Node.js 18+** - JavaScript runtime
- **Express 4.21.2** - Web application framework
- **MongoDB** - NoSQL database for product storage
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## Project Structure

```
hw-lesson-7/
├── client/                           # Frontend React application
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.jsx              # Main application component
│   │   │   ├── routes.jsx           # Route definitions with layouts
│   │   │   └── routes.constants.js   # Route constants and builders
│   │   ├── features/                # Feature-based organization
│   │   │   ├── categories/
│   │   │   │   ├── components/      # Category components
│   │   │   │   ├── categories.constants.js
│   │   │   │   └── index.js
│   │   │   ├── navigation/
│   │   │   │   ├── NavBar.jsx       # Professional sticky navbar
│   │   │   │   └── navigation.constants.js
│   │   │   └── products/
│   │   │       ├── components/      # Product components
│   │   │       └── index.js
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx       # Main application layout
│   │   │   ├── SimpleLayout.jsx     # Simple layout for specific pages
│   │   │   └── PageContainer.jsx    # Responsive container
│   │   ├── pages/                   # Route components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ShopPage.jsx
│   │   │   ├── CategoriesPage.jsx
│   │   │   ├── CategoryProductsPage.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ContactsPage.jsx
│   │   │   ├── PaymentRulesPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── shared/
│   │   │   ├── components/ui/       # Reusable UI components
│   │   │   │   ├── AppFooter.jsx
│   │   │   │   ├── Breadcrumbs.jsx
│   │   │   │   └── Spinner.jsx
│   │   │   └── services/
│   │   │       └── api.js           # Axios API service with AbortController
│   │   ├── assets/
│   │   │   └── no_image.jpg         # Default product image
│   │   ├── index.css                # Global styles and Tailwind
│   │   └── main.jsx                 # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                          # Backend Node.js application
│   ├── src/
│   │   ├── index.js                 # Server entry point
│   │   └── v1/
│   │       ├── controllers/         # Request handlers
│   │       ├── models/              # MongoDB models
│   │       ├── routes/              # API routes
│   │       └── services/            # Business logic
│   ├── config/
│   │   ├── database.js              # MongoDB connection
│   │   └── default.mjs              # Server configuration
│   ├── middleware/
│   │   └── errorHandler.js          # Error handling middleware
│   └── package.json
├── package.json                     # Monorepo configuration
└── README.md                        # This file
```

## State Management Patterns

### 🎯 State Machine Architecture
Components implement clean state transitions:
```javascript
const STATUS = {
  LOADING: 'loading',
  ERROR: 'error', 
  EMPTY: 'empty',
  SUCCESS: 'success'
}
```

### 🔄 API Integration
- Axios service with interceptors and AbortController
- Automatic request cancellation on component unmount
- Error handling with graceful fallbacks
- Environment-based API configuration

### 🎨 UI/UX Patterns
- Professional sticky navigation with glassmorphism
- Mobile-responsive burger menu with smooth animations
- Breadcrumb navigation for hierarchical routing
- Loading states with spinners and skeleton screens
- Error boundaries with retry functionality

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB (local or cloud instance)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd hw-lesson-7

# Install all dependencies (client + server)
npm run install:all

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB connection string

cp client/.env.example client/.env  
# Edit client/.env with your API base URL
```

### Development
```bash
# Start both client and server
npm run dev:all

# Or start individually:
npm run dev:client    # Frontend only (http://localhost:5173)
npm run dev:server    # Backend only (http://localhost:3001)
```

### Production Build
```bash
# Build client for production
npm run build:client

# Start server in production
cd server && npm start
```

## API Endpoints

### Products
- `GET /api/v1/products` - Get all products with optional filtering
- `GET /api/v1/products/:id` - Get product by ID

### Categories
- Predefined categories: smartphones, laptops, tablets, accessories

## Performance Optimizations

### 🚀 Frontend Optimizations
- **React.memo** for component memoization
- **useMemo** for expensive calculations
- **useCallback** for stable function references
- **AbortController** for request cancellation
- **State machines** for predictable state transitions
- **Image optimization** with fallback placeholders

### ⚡ Backend Optimizations
- **Connection pooling** with MongoDB
- **Error handling middleware** for consistent responses
- **Request validation** and sanitization
- **CORS configuration** for secure cross-origin requests

## Code Quality

### 🔧 Development Tools
- **ESLint** with React 19 rules and best practices
- **Vite** with fast HMR and optimized builds
- **Tailwind CSS** with utility-first approach
- **Feature-based architecture** for maintainability

### 📱 Responsive Design
- Mobile-first design approach
- Sticky navigation with mobile burger menu
- Responsive grid layouts for products
- Touch-friendly interactions

## Available Scripts

```bash
# Development
npm run dev:all      # Start both client and server
npm run dev:client   # Start frontend only
npm run dev:server   # Start backend only

# Production
npm run build        # Build client for production
npm run build:client # Build client explicitly
npm run build:server # Build server (if applicable)

# Code Quality
npm run lint         # Lint all workspaces
npm run test         # Run tests in all workspaces
npm run clean        # Clean all dependencies and builds

# Utilities
npm run install:all  # Install dependencies for all workspaces
```

## Learning Objectives

### 🎓 Frontend Skills
- **React 19** latest features and patterns
- **React Router 7** with modern routing approaches
- **State management** with hooks and state machines
- **Performance optimization** patterns and techniques
- **Modern UI/UX** with Tailwind CSS and responsive design

### 🎓 Backend Skills
- **Node.js/Express** server development
- **MongoDB** database integration with Mongoose
- **RESTful API** design and implementation
- **Error handling** and middleware patterns
- **CORS** and security considerations

### 🎓 Full-Stack Integration
- **Monorepo management** with npm workspaces
- **API integration** with modern HTTP clients
- **Development workflow** with concurrent processes
- **Production deployment** considerations

## Browser Support

- **Modern browsers** with ES2020+ support
- **Mobile browsers** with responsive design
- **Progressive enhancement** with graceful fallbacks

---

**Course:** React JS by Andriy Bryla (2025)  
**Assignment:** Homework 7 - Full-Stack React Application  
**Student:** Artem Masharipov  
**Technologies:** React 19, React Router 7, Node.js, Express, MongoDB, Tailwind CSS
