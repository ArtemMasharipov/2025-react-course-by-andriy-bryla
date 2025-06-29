# 📚 Homework Lesson 3 - React Hooks (useRef, useEffect)

Modern React application demonstrating practical usage of `useRef` and `useEffect` hooks through two interactive trainers.

## 🎯 Tasks Overview

This homework contains 2 comprehensive React tasks focusing on hooks:

### 📋 Task List

| Task       | Description                | Key Hooks                    | Key Features                             |
| ---------- | -------------------------- | ---------------------------- | ---------------------------------------- |
| **Task 13** | Addition Trainer           | useRef, useEffect, useState  | Timer management, auto-progression       |
| **Task 14** | Hotel Room Booking        | useRef, useEffect, useState  | Form handling, success notifications     |

### 🔧 Technical Implementation Details

| Task       | React Concepts                               | State Management                     | UI Features                             | External Integrations |
| ---------- | -------------------------------------------- | ------------------------------------ | --------------------------------------- | --------------------- |
| **Task 13** | useRef for timers, useEffect cleanup        | useState for game state              | Progress bars, countdown timers         | -                     |
| **Task 14** | useRef for form access, useEffect cleanup   | useState for bookings management     | Floating toast notifications, forms     | UUID for unique IDs   |

## 🚀 How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🛠 Technologies Used

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10
- **State Management**: React Hooks (useState, useRef, useEffect)
- **ID Generation**: UUID 11.1.0
- **Code Quality**: ESLint 9.25.0
- **Type Safety**: JavaScript ES6+

## 📁 Project Structure

```
src/
├── app/                          # Application configuration
│   ├── App.jsx                   # Main application component
│   └── layout/                   # Layout components
│       ├── Header.jsx            # Sticky header with navigation
│       ├── TaskSwitcher.jsx      # Responsive task switcher
│       └── index.js              # Barrel exports
├── features/                     # Feature-based architecture
│   ├── addition-trainer/         # Addition training task
│   │   ├── AdditionTrainer.jsx   # Main component with game logic
│   │   ├── components/           # Task-specific components
│   │   │   ├── Question.jsx      # Question display with timer
│   │   │   ├── Results.jsx       # Results summary
│   │   │   ├── TrainerForm.jsx   # Initial setup form
│   │   │   └── index.js          # Barrel exports
│   │   ├── constants.js          # Trainer configuration
│   │   └── utils.js              # Math operations and formatting
│   ├── hotel-booking/            # Hotel booking task
│   │   ├── HotelBooking.jsx      # Main component with booking logic
│   │   ├── components/           # Task-specific components
│   │   │   ├── BookingForm.jsx   # Comprehensive booking form
│   │   │   ├── BookingsList.jsx  # Bookings management
│   │   │   └── index.js          # Barrel exports
│   │   ├── constants.js          # Room types and prices
│   │   └── utils.js              # Date calculations and booking creation
│   └── index.js                  # Feature barrel exports
├── shared/                       # Shared resources
│   ├── ui/                       # Reusable UI components
│   │   ├── Alert.jsx             # Alert notifications
│   │   ├── Button.jsx            # Styled button variants
│   │   ├── Card.jsx              # Container component
│   │   ├── Input.jsx             # Form input component
│   │   ├── ProgressBar.jsx       # Progress visualization
│   │   ├── TaskDescription.jsx   # Task description layout
│   │   └── index.js              # UI components exports
│   ├── appConstants.js           # Application-wide constants
│   └── utils.js                  # Shared utility functions
├── main.jsx                      # Application entry point
└── index.css                     # Global styles with Tailwind
```

## ✨ Features

### Task 13: Addition Trainer

- Random math problem generation (1-10 range)
- 10-second countdown timer per question
- Automatic progression with useEffect
- Real-time progress tracking
- Results summary with accuracy statistics
- Early answer submission capability

### Task 14: Hotel Room Booking System

- Comprehensive booking form with validation
- Multiple room types with dynamic pricing
- Date-based night calculation
- Booking history management
- Floating success notifications (no scroll interruption)
- Form auto-reset after submission

## 🎨 Key Concepts Demonstrated

- **useRef Hook**: DOM access, timer management, form references
- **useEffect Hook**: Timer intervals, cleanup functions, side effects
- **Memory Management**: Proper cleanup to prevent memory leaks
- **Component Architecture**: Feature-based organization with barrel exports
- **State Management**: Complex state handling with useState
- **Form Handling**: Controlled components without external libraries
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React Patterns**: Functional components with hooks

## 🔧 Hook Usage Patterns

### useRef Examples

```javascript
// Timer management
const timerRef = useRef(null)

// Form input access
const inputRef = useRef(null)

// Timeout storage
const timeoutRef = useRef(null)
```

### useEffect Examples

```javascript
// Timer cleanup
useEffect(() => {
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
}, [])

// Conditional effects
useEffect(() => {
  if (isActive && timeLeft > 0) {
    // Timer logic
  }
}, [isActive, timeLeft])
```

## 📱 Live Demo

The application features a responsive design with:
- Sticky header navigation
- Mobile hamburger menu
- Smooth task switching
- Floating notifications
- Progressive enhancement

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🎓 Learning Objectives

This homework demonstrates:

- Practical useRef and useEffect usage
- Timer management and cleanup
- Form handling without external libraries
- Component lifecycle management
- Modern React architecture patterns
- Performance optimization techniques
- Responsive design implementation

---

**Course:** React JS by Andriy Bryla (2025)  
**Student:** Artem Masharipov  
**Repository:** https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla
