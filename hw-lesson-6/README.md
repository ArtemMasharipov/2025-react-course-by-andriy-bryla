# HW Lesson 6. Hooks. Practice.

Educational project demonstrating React 19 performance optimization techniques through 4 practical tasks.

## Overview

This project implements performance optimization patterns including React.memo, useMemo, useDeferredValue, useCallback, and react-window virtualization for large datasets.

## Tasks Implemented

### Task 1: :zap: Selective Rendering
- React.memo implementation for child components
- useMemo for expensive calculations
- Independent state management to prevent unnecessary re-renders
- Calculator with counter demonstration

### Task 2: :bar_chart: Large Dataset Handling
- react-window library for virtualizing 10,000+ items
- useDeferredValue for search queries and sort configurations
- useCallback for optimized event handlers
- FixedSizeList component for performance optimization

### Task 3: :straight_ruler: Window Size Monitoring
- Custom useWindowSize hook with debouncing
- Performance-optimized resize event handling
- Real-time display of window dimensions

### Task 4: :mag: Optimized Search
- useDebounce custom hook implementation
- Debounced user input for search functionality
- Performance patterns for real-time filtering

## Tech Stack

- **React 19** - Latest React features
- **Vite 7.0.0** - Build tool and dev server
- **TailwindCSS 4.x** - Utility-first CSS framework
- **react-window** - Virtual scrolling for large datasets
- **ESLint** - Code quality enforcement
- **JavaScript** - Vanilla JS (no TypeScript)

## Performance Patterns

### Optimization Techniques Used
- Component memoization with `React.memo()`
- Expensive calculation optimization with `useMemo()`
- Deferred value processing with `useDeferredValue()`
- Event handler optimization with `useCallback()`
- Virtual scrolling for large datasets (react-window)
- Debouncing for user input handling

### Architecture
- Feature-based organization (`src/features/task-N/`)
- Shared UI components (`src/shared/ui/`)
- Custom hooks for reusable logic
- Constants files for localized strings

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Project Structure

```
hw-lesson-6/
├── public/
│   └── vite.svg
├── src/
│   ├── app/
│   │   ├── App.jsx                    # Main application component
│   │   ├── layout/
│   │   │   └── MainLayout.jsx         # Central layout with task navigation
│   │   └── metadata/
│   │       └── tasks.js               # Task descriptions and metadata
│   ├── assets/
│   │   └── react.svg
│   ├── features/
│   │   ├── navbar/
│   │   │   ├── Navbar.jsx             # Navigation component
│   │   │   └── constants.js           # Navigation constants
│   │   ├── task-1/                    # :zap: Selective Rendering
│   │   │   ├── Task1.jsx              # Task 1 main component
│   │   │   ├── constants.js           # Task 1 constants
│   │   │   └── components/
│   │   │       ├── Calculator.jsx     # Main calculator component
│   │   │       ├── Counter.jsx        # Independent counter
│   │   │       ├── NumberInput.jsx    # Memoized input component
│   │   │       └── ResultDisplay.jsx  # Memoized result display
│   │   ├── task-2/                    # :bar_chart: Large Dataset Handling
│   │   │   ├── Task2.jsx              # Task 2 main component
│   │   │   ├── constants.js           # Virtualization config
│   │   │   ├── components/
│   │   │   │   ├── DataGrid.jsx       # Main grid with react-window
│   │   │   │   ├── GridHeader.jsx     # Sortable header
│   │   │   │   ├── GridRow.jsx        # Virtualized row component
│   │   │   │   └── SearchInput.jsx    # Search input component
│   │   │   └── utils/
│   │   │       └── dataUtils.js       # Data filtering and sorting
│   │   ├── task-3/                    # :straight_ruler: Window Size Monitoring
│   │   │   ├── Task3.jsx              # Task 3 main component
│   │   │   ├── constants.js           # Task 3 constants
│   │   │   ├── components/
│   │   │   │   ├── InfoRow.jsx        # Information display row
│   │   │   │   └── WindowSizeDisplay.jsx # Window size component
│   │   │   └── hooks/
│   │   │       └── useWindowSize.js   # Custom window size hook
│   │   └── task-4/                    # :mag: Optimized Search
│   │       ├── Task4.jsx              # Task 4 main component
│   │       ├── constants.js           # Search constants
│   │       ├── components/
│   │       │   ├── DebouncedSearch.jsx # Main search component
│   │       │   ├── SearchInput.jsx    # Search input
│   │       │   └── SearchResults.jsx  # Results display
│   │       └── hooks/
│   │           └── useDebounce.js     # Custom debounce hook
│   ├── shared/
│   │   └── ui/
│   │       ├── TaskCard.jsx           # Reusable task card
│   │       ├── TaskContainer.jsx      # Task wrapper component
│   │       └── TaskDescription.jsx    # Task description component
│   ├── index.css                      # Global styles and Tailwind
│   └── main.jsx                       # Application entry point
├── .gitignore                         # Git ignore rules
├── README.md                          # This file
├── eslint.config.js                   # ESLint configuration
├── index.html                         # HTML template
├── package.json                       # Dependencies and scripts
├── package-lock.json                  # Dependency lock file
├── tailwind.config.js                 # Tailwind CSS configuration
└── vite.config.js                     # Vite configuration with path aliases
```

## Dependencies

### Production Dependencies
- `react: ^19.0.0` - Core React library
- `react-dom: ^19.0.0` - React DOM renderer
- `react-window: ^1.8.11` - Virtual scrolling for large lists

### Development Dependencies
- `@vitejs/plugin-react: ^4.3.4` - Vite React plugin
- `eslint: ^9.17.0` - JavaScript linter
- `eslint-plugin-react: ^7.37.2` - React-specific linting rules
- `eslint-plugin-react-hooks: ^5.0.0` - React Hooks linting
- `eslint-plugin-react-refresh: ^0.4.16` - React Fast Refresh support
- `tailwindcss: ^4.1.10` - Utility-first CSS framework
- `vite: ^6.0.7` - Build tool and dev server

## Configuration Files

- `vite.config.js`: Path aliases configuration (@/ → ./src/)
- `eslint.config.js`: Custom ESLint rules for React 19
- `tailwind.config.js`: TailwindCSS 4.x configuration
- `package.json`: Scripts and dependencies management

## Code Quality

- ESLint configuration with React 19 rules
- Import ordering conventions with path aliases
- Consistent naming patterns (PascalCase for components)
- Ukrainian language UI (educational context)
- No TypeScript (vanilla JavaScript for simplicity)

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint with auto-fix
```

## Learning Objectives

- **Performance Optimization:** Understanding React performance bottlenecks
- **Memoization:** Proper usage of React.memo, useMemo, useCallback
- **Deferred Values:** Managing non-urgent updates with useDeferredValue
- **Virtualization:** Handling large datasets efficiently
- **Custom Hooks:** Creating reusable logic with custom hooks
- **Architecture:** Feature-based project organization

---

**Course:** React JS by Andriy Bryla (2025)  
**Assignment:** Homework 6 - Performance Optimization  
**Student:** Artem Masharipov
