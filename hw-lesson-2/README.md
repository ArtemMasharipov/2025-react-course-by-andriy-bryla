# 📚 Homework Lesson 2 - React Development

A comprehensive React application demonstrating modern development practices including styling, conditional rendering, lists, and deployment.

## 🎯 Tasks Overview

This homework contains 6 interactive React tasks:

### 📋 Task List

| Task | Description | Technologies | Features |
|------|-------------|--------------|----------|
| **Task 1** | Login Validation | React Hooks, Form Validation | Conditional styling, Special user handling |
| **Task 2** | Airline Ticket Selection | Conditional Rendering, Cloudinary | Dynamic backgrounds, Class-based options |
| **Task 3** | English Word Trainer | State Management, Effects | Interactive learning, Progress tracking |
| **Task 4** | Employee List | List Rendering, Data Processing | Statistics, Formatted display |
| **Task 5** | Search Results | Mock Data, Component Design | Modern UI, Tag system |
| **Task 6** | Kitchen Orders (Kanban) | Complex State, Drag & Drop Logic | Multi-column workflow, Real-time updates |

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
- **Styling**: Tailwind CSS 4.1.8
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Lucide React
- **Image Management**: Cloudinary
- **ID Generation**: Nanoid
- **Code Quality**: ESLint
- **Type Safety**: JavaScript ES6+

## 📁 Project Structure

```
src/
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
├── index.css                   # Global styles
├── shared/                     # Shared resources
│   ├── components/            # Reusable UI components
│   │   ├── Button.jsx         # Button component
│   │   ├── Input.jsx          # Input component
│   │   ├── LoadingButton.jsx  # Loading button
│   │   ├── TaskDescription.jsx # Task description
│   │   └── layouts/           # Layout components
│   │       ├── StatCard.jsx   # Statistics card
│   │       └── TaskLayout.jsx # Task layout wrapper
│   ├── constants/             # Application constants
│   │   └── index.js           # Main constants file
│   └── utils/                 # Utility functions
│       └── cloudinary.js      # Cloudinary integration
└── tasks/                     # Individual task implementations
    ├── task_1_login/          # Login validation task
    │   ├── TaskLogin.jsx      # Main component
    │   ├── useLogin.js        # Custom hook
    │   ├── validation.js      # Validation logic
    │   └── constants.js       # Task constants
    ├── task_2_ticket/         # Airline ticket task
    │   ├── TaskTicket.jsx     # Main component
    │   ├── useTicketSelection.js # Custom hook
    │   ├── components/        # Task-specific components
    │   └── constants/         # Task constants
    ├── task_3_trainer/        # English trainer task
    ├── task_4_employees/      # Employee list task
    ├── task_5_search/         # Search results task
    └── task_6_kitchen/        # Kitchen orders task
```

## ✨ Features

### Task 1: Login Validation
- Form validation with real-time feedback
- Conditional error styling based on username
- Loading states and success messages

### Task 2: Flight Ticket Selection
- Class selection (Business/Economy)
- Conditional rendering based on class
- Dynamic background images from Cloudinary
- Interactive form elements

### Task 3: English Word Trainer
- Interactive vocabulary learning
- Progress tracking
- Immediate feedback with animations
- State-based background changes

### Task 4: Employee List
- Formatted employee data display
- Salary formatting with Ukrainian locale
- Statistics cards with employee metrics
- Responsive grid layout

### Task 5: Search Results
- Dynamic search result display
- Tag system with filtering
- External link handling
- Card-based layout with hover effects

### Task 6: Kitchen Order Management
- Kanban-style workflow (Waiting → Processing → Completed)
- Real-time order tracking
- Statistics dashboard
- Drag-and-drop style interactions

## 🎨 Key Concepts Demonstrated

- **Conditional Rendering**: Show/hide components based on state
- **Dynamic Styling**: Apply CSS classes conditionally
- **State Management**: Complex state handling with multiple components
- **Form Handling**: Input validation and form submission
- **List Rendering**: Dynamic list creation with map()
- **Component Composition**: Reusable component architecture
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📱 Live Demo

Each task can be accessed through the navigation bar at the top of the application. The interface allows seamless switching between different tasks without page reloads.

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🎓 Learning Objectives

This homework demonstrates:
- React component lifecycle and hooks
- Conditional rendering patterns
- State management strategies
- Modern CSS with Tailwind
- Component reusability
- Project structure organization

---

**Course:** React JS by Andriy Bryla (2025)  
**Student:** Artem Masharipov  
**Repository:** https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla
