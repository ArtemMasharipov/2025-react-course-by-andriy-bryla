# 🛒 Firebase E-Commerce Platform

A modern full-stack e-commerce application built with React 19, Redux Toolkit, and Firebase featuring user authentication, role-based access control, and comprehensive product management.

## 🚀 **Live Demo**
- **Application:** [Firebase Hosting](https://hw-lesson-18.web.app)

## 🛠️ **Tech Stack**

### Frontend
- **React 19.1.1** - Latest React with modern features
- **Redux Toolkit 2.8.2** - State management with RTK Query
- **React Router 7.8.0** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Vite 7.1.2** - Fast build tool and dev server
- **i18next** - Internationalization (EN/UK)

### Backend & Database
- **Firebase Firestore** - NoSQL database with real-time sync
- **Firebase Authentication** - User authentication with Google OAuth
- **Firebase Hosting** - Static site hosting

## 📁 **Project Structure**

```
hw-lesson-18/
├── src/
│   ├── app/                    # Application core (FSD)
│   │   ├── router/            # Router configuration
│   │   ├── store/             # Redux store setup
│   │   └── init/              # App initialization
│   ├── pages/                 # Route components
│   │   ├── HomePage.jsx       # Landing page
│   │   ├── ProductsPage.jsx   # Product catalog
│   │   ├── UsersPage.jsx      # User management
│   │   ├── CartPage.jsx       # Shopping cart
│   │   └── FavoritesPage.jsx  # User favorites
│   ├── widgets/               # Complex UI components
│   │   ├── Header/            # Navigation header
│   │   ├── ProductsList/      # Product grid
│   │   ├── CartList/          # Cart items
│   │   └── UserList/          # User management
│   ├── features/              # Business features
│   │   ├── auth/              # Authentication
│   │   ├── products/          # Product management
│   │   ├── cart/              # Shopping cart
│   │   ├── favorites/         # User favorites
│   │   └── users/             # User management
│   ├── entities/              # Business entities
│   │   ├── product/           # Product entity
│   │   ├── user/              # User entity
│   │   ├── cartItem/          # Cart item entity
│   │   └── favoriteItem/      # Favorite item entity
│   └── shared/                # Shared resources
│       ├── api/               # API layer
│       ├── config/            # Configuration
│       ├── hooks/             # Custom hooks
│       ├── ui/                # UI components
│       └── utils/             # Utilities
├── firebase.json              # Firebase configuration
├── firestore.rules            # Firestore security rules
└── package.json               # Dependencies
```

## 🔐 **Features**

### Authentication & Authorization
- **User Registration/Login** - Email/password and Google OAuth
- **Role-Based Access Control** - Admin, Manager, User, Guest roles
- **Protected Routes** - Route-level access control
- **Session Management** - Persistent authentication state

### Product Management
- **Product Catalog** - Browse products with search and filtering
- **CRUD Operations** - Create, read, update, delete products
- **Image Upload** - Product image management
- **Role-Based Actions** - Admin/Manager can manage products

### Shopping Features
- **Shopping Cart** - Add/remove items, quantity management
- **Favorites System** - Save products for later
- **Real-time Updates** - Live cart and favorites sync

### User Management
- **User Profiles** - View and edit user information
- **Admin Panel** - User management for administrators
- **Role Assignment** - Assign roles to users

### UI/UX Features
- **Responsive Design** - Mobile-first approach
- **Internationalization** - English and Ukrainian support
- **Modern UI** - Clean, professional design
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Comprehensive error management

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Firebase CLI
- Firebase project

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hw-lesson-18
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
```bash
# Set up Firebase project
firebase login
firebase init

# Configure environment variables
# Create .env.local file with your Firebase config
```

4. **Start development server**
```bash
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Firebase Console: https://console.firebase.google.com

## 🔧 **Development**

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run deploy       # Deploy to Firebase Hosting
```

### Firebase Configuration

#### Firestore Database
Collections:
- **users** - User profiles and roles
- **products** - Product catalog
- **cartItems** - Shopping cart items
- **favoriteItems** - User favorites

#### Security Rules
Firestore security rules are configured for role-based access control. See `FIREBASE_RULES.txt` for detailed rules documentation.

## 🏗️ **Architecture**

The application follows **Feature-Sliced Design (FSD)** architecture:

- **app/** - Application configuration and initialization
- **pages/** - Route-level components
- **widgets/** - Complex UI components
- **features/** - Business features and functionality
- **entities/** - Business entities and data models
- **shared/** - Shared utilities, UI components, and configurations

## 🔒 **Security Features**

- Firebase Authentication with JWT tokens
- Role-based access control
- Firestore security rules
- Input validation and sanitization
- CORS configuration
- Error handling and logging

## 📱 **Responsive Design**

- Mobile-first approach
- Tailwind CSS for styling
- Responsive navigation with mobile drawer
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🌐 **Internationalization**

- English and Ukrainian language support
- Dynamic language switching
- Localized content and UI elements
- Browser language detection

## 🚀 **Deployment**

### Firebase Hosting
```bash
# Build and deploy
npm run build
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🧪 **Testing**

### Default Users
- **Admin:** admin@admin.com / admin123
- **Manager:** manager@manager.com / manager123

## 📚 **API Structure**

### Firebase Collections
- **users** - User management
- **products** - Product catalog
- **cartItems** - Shopping cart
- **favoriteItems** - User favorites

### Redux Store
- **auth** - Authentication state
- **products** - Product management
- **cart** - Shopping cart state
- **favorites** - Favorites state
- **users** - User management

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 **License**

This project is part of the React JS Course homework assignments.

---

**Course:** React JS by Andriy Bryla (2025)  
**Lesson:** 18 - Firebase E-Commerce Platform  
**Student:** Artem Masharipov  
**Repository:** [GitHub Repo](https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla)
