# 🎨 Frontend - React Application

Modern React application with Redux Toolkit, authentication, and responsive design.

## 🛠️ **Tech Stack**

- **React 19** - Latest React with concurrent features
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 **Project Structure**

```
src/
├── app/              # App configuration
│   ├── init/        # App initialization
│   ├── router/      # Routing configuration
│   └── store/       # Redux store
├── pages/           # Route components
├── widgets/         # Complex UI components
├── features/        # Business features
├── entities/        # Business entities
└── shared/          # Shared utilities
```

## 🔧 **Environment Variables**

```env
VITE_API_URL=http://localhost:4000/api
```

## 📦 **Deployment**

### Vercel
1. Connect GitHub repository
2. Set Root Directory: `client`
3. Add environment variable: `VITE_API_URL`

## 🎯 **Features**

- User authentication with JWT
- Role-based access control
- Responsive design
- Error handling
- Loading states
- CRUD operations

## 🧪 **Development**

```bash
# Lint code
npm run lint

# Build and preview
npm run build && npm run preview
```