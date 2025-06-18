# 📚 Homework Lesson 2 - Styles. Conditional Rendering. Lists. Deploy

A comprehensive React application demonstrating modern development practices including styling, conditional rendering, lists, and deployment.

## 🎯 Tasks Overview

This homework contains 6 interactive React tasks:

### 📋 Task List

| Task       | Description              | Main Hook             | Key Components                                       | Key Features                             |
| ---------- | ------------------------ | --------------------- | ---------------------------------------------------- | ---------------------------------------- |
| **Task 1** | Login Validation         | useLogin.js           | TaskLogin, Input, LoadingButton                      | Form validation, special user handling   |
| **Task 2** | Airline Ticket Selection | useTicketSelection.js | TaskTicket, ClassSelectionCard, BusinessClassOptions | Dynamic backgrounds, class-based options |
| **Task 3** | English Word Trainer     | useTrainer.js         | TaskTrainer, Input, Button                           | Progress tracking, auto-progression      |
| **Task 4** | Employee List            | useEmployees.js       | TaskEmployees, StatCard                              | Statistics dashboard, formatted display  |
| **Task 5** | Search Results           | useSearch.js          | TaskSearch, SearchResult                             | Mock data, tag system, external links    |
| **Task 6** | Kitchen Orders (Kanban)  | useKitchen.js         | TaskKitchen, KitchenColumn, KitchenOrderCard         | Multi-column workflow, order management  |

### 🔧 Technical Implementation Details

| Task       | React Concepts                               | State Management                     | UI Features                             | External Integrations |
| ---------- | -------------------------------------------- | ------------------------------------ | --------------------------------------- | --------------------- |
| **Task 1** | Controlled components, conditional rendering | useState for form data, error states | Loading animations, conditional styling | -                     |
| **Task 2** | Conditional rendering, component composition | useState for ticket selection        | Dynamic backgrounds, responsive cards   | Cloudinary images     |
| **Task 3** | useEffect for timers, state transitions      | useState for progress tracking       | Progress bars, emoji displays           | -                     |
| **Task 4** | Array mapping, data formatting               | useState for employee data           | Statistics cards, responsive layout     | -                     |
| **Task 5** | Static data rendering, external links        | useState for search results          | Tag badges, hover effects               | -                     |
| **Task 6** | Complex state management, event handling     | useState for order tracking          | Kanban interface, statistics            | Nanoid for IDs        |

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
    │   │   ├── BusinessClassOptions.jsx # Business class form
    │   │   ├── ClassSelectionCard.jsx   # Class selection card
    │   │   └── EconomyClassOptions.jsx  # Economy class form
    │   └── constants/         # Task constants
    │       └── constants.js   # Ticket configuration
    ├── task_3_trainer/        # English trainer task
    │   ├── TaskTrainer.jsx    # Main component
    │   ├── useTrainer.js      # Custom hook
    │   └── constants.js       # Word pairs and config
    ├── task_4_employees/      # Employee list task
    │   ├── TaskEmployees.jsx  # Main component
    │   ├── useEmployees.js    # Custom hook
    │   └── constants.js       # Employee data and stats
    ├── task_5_search/         # Search results task
    │   ├── TaskSearch.jsx     # Main component
    │   ├── useSearch.js       # Custom hook
    │   └── constants.js       # Mock search data
    └── task_6_kitchen/        # Kitchen orders task
        ├── TaskKitchen.jsx    # Main component
        ├── useKitchen.js      # Custom hook
        ├── constants.js       # Order statuses and config
        └── components/        # Task-specific components
            ├── KitchenColumn.jsx     # Kanban column
            └── KitchenOrderCard.jsx  # Order card
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
