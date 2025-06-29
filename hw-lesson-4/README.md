# 📱 Homework Lesson 4 - Components. Practice

Modern React application demonstrating practical component composition and state management through two interactive applications.

## 🎯 Tasks Overview

This homework contains 2 comprehensive React tasks focusing on component architecture and user interaction:

### 📋 Task List

| Task       | Description               | Key Features                           | UI Components                            |
| ---------- | ------------------------- | -------------------------------------- | ---------------------------------------- |
| **Task 1** | Messenger App            | Message management, Like system        | Message list, Message form, User switching |
| **Task 2** | Number Guessing Game     | Turn-based gameplay, Digit tracking    | Game board, Player panels, Digit selector |

### 🔧 Technical Implementation Details

| Task       | React Concepts                               | State Management                     | UI Features                             | Game Logic             |
| ---------- | -------------------------------------------- | ------------------------------------ | --------------------------------------- | ---------------------- |
| **Task 1** | Component composition, Event handling        | useState for messages and likes      | Interactive chat UI, User switching     | Message persistence    |
| **Task 2** | Complex game state, Turn management         | useState for game progression        | Visual feedback, Player indicators      | Win/lose conditions    |

## 📱 Applications Features

### 🗨️ Messenger App (Task 1)
- **Add Messages**: Create new messages with author identification
- **Like System**: Interactive like functionality for each message
- **User Switching**: Switch between different users (Dima and Olga)
- **Message Display**: Clean, modern message layout with author info
- **Real-time Updates**: Instant UI updates for all interactions

### 🎯 Number Guessing Game (Task 2)
- **Three-digit Number**: Computer generates random target number
- **Turn-based Gameplay**: Players alternate guessing digits
- **Used Digits Tracking**: Visual tracking of already guessed digits
- **Progressive Revelation**: Correctly guessed digits appear in target display
- **Win/Lose Conditions**: Last player to guess loses the game
- **Player Statistics**: Track which digits each player has guessed

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
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: React Hooks (useState, useEffect)
- **Code Quality**: ESLint 9.29.0
- **ID Generation**: UUID 11.1.0
- **Development**: Hot Module Replacement (HMR)

## 📁 Project Structure

```
src/
├── app/
│   ├── App.jsx              # Main application component
│   ├── constants.js         # Application constants and task definitions
│   ├── layout/
│   │   ├── Header.jsx       # Application header
│   │   ├── TaskLayout.jsx   # Task wrapper component
│   │   └── index.js         # Layout exports
│   └── styles/
│       └── index.css        # Global styles
├── assets/
│   └── react.svg            # React logo asset
├── features/
│   ├── index.js             # Features barrel exports
│   ├── messenger/
│   │   ├── MessengerApp.jsx    # Main messenger component
│   │   ├── constants.js        # Messenger constants
│   │   └── ui/
│   │       ├── MessageForm.jsx     # Message creation form
│   │       ├── MessageItem.jsx     # Individual message component
│   │       ├── MessageList.jsx     # Messages container
│   │       ├── UserSwitcher.jsx    # User selection component
│   │       └── index.js            # UI exports
│   └── guess-number/
│       ├── NumberGuessingGame.jsx  # Main game component
│       ├── constants.js            # Game constants
│       ├── utils.js                # Game utility functions
│       └── ui/
│           ├── Chip.jsx                # Generic chip component
│           ├── DigitSelector.jsx       # Digit selection interface
│           ├── GameEndStatus.jsx       # Game over display
│           ├── GuessedDigitsDisplay.jsx # Target number display
│           ├── PlayersPanel.jsx        # Player information panel
│           ├── UsedDigitsDisplay.jsx   # Used digits tracker
│           └── index.js                # UI exports
├── shared/
│   ├── index.js             # Shared barrel exports
│   ├── hooks/
│   │   └── useLocalStorage.js  # Local storage hook
│   └── ui/
│       ├── Button.jsx          # Reusable button component
│       ├── Card.jsx            # Card wrapper component
│       ├── TaskDescription.jsx # Task description display
│       └── index.js            # Shared UI exports
└── main.jsx                 # Application entry point
```

## 🎨 Styling Approach

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Component-based Styling**: Each component contains its styling logic
- **Responsive Design**: Mobile-first responsive layouts
- **Modern UI**: Clean, contemporary interface design
- **Interactive Elements**: Hover states and visual feedback

## 🧠 Learning Outcomes

This homework demonstrates:

1. **Component Architecture**: Proper separation of concerns and component hierarchy
2. **State Management**: Complex state handling across multiple components
3. **Event Handling**: User interactions and state updates
4. **Conditional Rendering**: Dynamic UI based on application state
5. **Game Logic Implementation**: Turn-based gameplay and win conditions
6. **Modern React Patterns**: Hooks usage and functional components
7. **Code Organization**: Feature-based folder structure

## 🔗 Related Lessons

- **Previous**: [Homework 3 - React Hooks](../hw-lesson-3/)
- **Course Repository**: [2025 React Course by Andriy Bryla](https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla)

---

**Assignment**: Homework Lesson 4 - Components. Practice  
**Course**: React JS by Andriy Bryla (2025)  
**Student**: Artem Masharipov
