# âš¡ React Performance Optimization - Homework 6

Educational project demonstrating React 19 performance optimization techniques through 4 practical tasks.

## í³‹ Overview

This project implements performance optimization patterns including React.memo, useMemo, useDeferredValue, useCallback, and react-window virtualization for large datasets.

## í¾¯ Tasks Implemented

### Task 1: âš¡ Selective Rendering
- **React.memo** implementation for child components
- **useMemo** for expensive calculations
- Independent state management to prevent unnecessary re-renders
- Calculator with counter demonstration

### Task 2: í³Š Large Dataset Handling
- **react-window** library for virtualizing 10,000+ items
- **useDeferredValue** for search queries and sort configurations
- **useCallback** for optimized event handlers
- FixedSizeList component for performance optimization

### Task 3: í³ Window Size Monitoring
- Custom **useWindowSize** hook with debouncing
- Performance-optimized resize event handling
- Real-time display of window dimensions

### Task 4: í´ Optimized Search
- **useDebounce** custom hook implementation
- Debounced user input for search functionality
- Performance patterns for real-time filtering

## í» ï¸ Tech Stack

- **React 19** - Latest React features
- **Vite 7.0.0** - Build tool and dev server
- **TailwindCSS 4.x** - Utility-first CSS framework
- **react-window** - Virtual scrolling for large datasets
- **ESLint** - Code quality enforcement
- **JavaScript** - Vanilla JS (no TypeScript)

## âš¡ Performance Patterns

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

## íº€ Getting Started

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

## í³ Project Structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ App.jsx
â”‚   â”œâ”€â”€ layout/MainLayout.jsx
â”‚   â””â”€â”€ metadata/tasks.js
â”œâ”€â”€ features/
â”‚   â”œâ”€â”€ task-1/          # âš¡ Selective Rendering
â”‚   â”œâ”€â”€ task-2/          # í³Š Large Dataset Handling (react-window)
â”‚   â”œâ”€â”€ task-3/          # í³ Window Size Monitoring
â”‚   â””â”€â”€ task-4/          # í´ Optimized Search
â””â”€â”€ shared/
    â””â”€â”€ ui/              # Reusable components
```

## í³¦ Dependencies

- **react-window**: Virtual scrolling for efficient rendering of large lists
- **tailwindcss**: Utility-first CSS framework
- **vite**: Fast build tool and development server

## í´§ Code Quality

- ESLint configuration with React 19 rules
- Import ordering conventions with path aliases
- Consistent naming patterns
- Ukrainian language UI (educational context)

---
**Course:** React JS by Andriy Bryla (2025)  
**Assignment:** Homework 6 - Performance Optimization  
**Student:** Artem Masharipov
