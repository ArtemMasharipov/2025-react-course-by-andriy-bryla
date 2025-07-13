# React Performance Optimization - Homework 6

Educational project demonstrating React 19 performance optimization techniques through 4 practical tasks.

## Overview

This project implements performance optimization patterns including React.memo, useMemo, useDeferredValue, useCallback, and react-window virtualization for large datasets.

## Tasks Implemented

### Task 1: Selective Rendering
- **React.memo** implementation for child components
- **useMemo** for expensive calculations
- Independent state management to prevent unnecessary re-renders
- Calculator with counter demonstration

### Task 2: Large Dataset Handling
- **react-window** library for virtualizing 10,000+ items
- **useDeferredValue** for search queries and sort configurations
- **useCallback** for optimized event handlers
- FixedSizeList component for performance optimization

### Task 3: Window Size Monitoring
- Custom **useWindowSize** hook with debouncing
- Performance-optimized resize event handling
- Real-time display of window dimensions

### Task 4: Optimized Search
- **useDebounce** custom hook implementation
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
- Component memoization with React.memo()
- Expensive calculation optimization with useMemo()
- Deferred value processing with useDeferredValue()
- Event handler optimization with useCallback()
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
src/
├── app/
│   ├── App.jsx
│   ├── layout/MainLayout.jsx
│   └── metadata/tasks.js
├── features/
│   ├── task-1/          # Selective Rendering
│   ├── task-2/          # Large Dataset Handling (react-window)
│   ├── task-3/          # Window Size Monitoring
│   └── task-4/          # Optimized Search
└── shared/
    └── ui/              # Reusable components
```

## Dependencies

- **react-window**: Virtual scrolling for efficient rendering of large lists
- **tailwindcss**: Utility-first CSS framework
- **vite**: Fast build tool and development server

## Code Quality

- ESLint configuration with React 19 rules
- Import ordering conventions with path aliases
- Consistent naming patterns
- Ukrainian language UI (educational context)

---
**Course:** React JS by Andriy Bryla (2025)  
**Assignment:** Homework 6 - Performance Optimization  
**Student:** Artem Masharipov
