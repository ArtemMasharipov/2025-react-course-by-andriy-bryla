# 📚 Homework Lesson 2 - Styles, Conditional Rendering, Lists & Deploy

A collection of React assignments demonstrating styles, conditional rendering, lists and deployment concepts.

## 🎯 Tasks

- **Task 1**: Login Validation - login and password validation with conditional styling
- **Task 2**: Flight Ticket - class selection with conditional rendering and background images
- **Task 3**: English Word Trainer - interactive word learning with state management
- **Task 4**: Employee List - displaying employee data with formatted salaries
- **Task 5**: Search Results - displaying search results with tags and links
- **Task 6**: Kitchen Orders - kanban-style order management system

## 🚀 How to Run

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open your browser to view the application

## 🛠 Technologies

- **Frontend**: React 19, JavaScript ES6+
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **State Management**: React Hooks (useState, useEffect)
- **Images**: Cloudinary CDN
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── index.css            # Global styles
├── shared/              # Shared components and utilities
│   ├── components/      # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingButton.jsx
│   │   ├── TaskDescription.jsx
│   │   └── layouts/
│   │       ├── StatCard.jsx
│   │       └── TaskLayout.jsx
│   ├── constants/       # Application constants
│   │   └── index.js
│   └── utils/          # Utility functions
│       └── cloudinary.js
└── tasks/              # Individual task components
    ├── task_1_login/   # Login validation
    ├── task_2_ticket/  # Flight ticket selection
    ├── task_3_trainer/ # English word trainer
    ├── task_4_employees/ # Employee list
    ├── task_5_search/  # Search results
    └── task_6_kitchen/ # Kitchen order management
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

## 📱 Demo

🔗 [View Live Demo](https://your-deployed-app-url.com)

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
**Student:** [Your Name]  
**Repository:** https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla
