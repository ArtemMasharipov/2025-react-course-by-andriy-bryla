```markdown
# Posts Management Application – RTK Query

Full-stack posts management system built as part of the **React JS Course by Andriy Bryla (2025)**.  
Implements **RTK Query** for efficient data fetching, caching, and synchronization with a clean Feature-Sliced Design (FSD) architecture.

## Features

- Posts CRUD operations with pagination and infinite scroll  
- RTK Query for data fetching, caching, and invalidation  
- Feature-Sliced Design architecture for maintainability and scalability  
- RESTful API with MongoDB and validation  
- Responsive UI with Tailwind CSS  
- Optimistic updates, background refetching, and error handling  

## Technology Stack

**Frontend:**

- React 19.1.1  
- Redux Toolkit (RTK Query) 2.8.2  
- React Router 7.8.2  
- Tailwind CSS 4.1.12  
- Vite 7.1.2  

**Backend:**

- Node.js + Express 5.1.0  
- MongoDB / Mongoose 8.16.5  
- Express Validator 7.2.1  

## Project Structure

```

hw-lesson-13/
├── README.md
├── .gitignore
│
├── server/
│   ├── src/
│   │   ├── index.js
│   │   └── v1/
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── utils/
│   │       └── validators/
│   ├── config/
│   ├── middleware/
│   └── package.json
│
└── client/
├── src/
│   ├── app/
│   ├── entities/
│   │   └── post/
│   │       ├── api/
│   │       │   └── postApi.js
│   │       ├── model/
│   │       │   └── selectors.js
│   │       └── ui/
│   ├── features/
│   │   ├── infinite-scroll/
│   │   └── pagination/
│   ├── shared/
│   ├── layouts/
│   ├── pages/
│   ├── widgets/
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── tailwind.config.js
└── package.json

````

## Quick Start

**Requirements:** Node.js 18+, MongoDB

```bash
git clone https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla.git
cd 2025-react-course-by-andriy-bryla/hw-lesson-13

# Backend
cd server
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
````

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:4000](http://localhost:4000)

## API Endpoints

```
GET    /api/v1/posts           # Get posts (paginated)
POST   /api/v1/posts           # Create post
GET    /api/v1/posts/:id       # Get single post
PUT    /api/v1/posts/:id       # Update post
DELETE /api/v1/posts/:id       # Delete post
```

## Development Scripts

**Server:**

```bash
npm run dev    # Run in development with nodemon
npm start      # Run in production
```

**Client:**

```bash
npm run dev    # Start Vite dev server
npm run build  # Production build
npm run lint   # ESLint checks
```

## Comparison with Lesson 12

* **Lesson 12**: Implemented posts management using **Redux Toolkit slices** with entity adapters and async thunks. Data fetching was handled manually with Axios, and caching or invalidation logic had to be written explicitly.
* **Lesson 13**: Migrated to **RTK Query**, which introduced declarative data fetching, automatic caching, invalidation, background refetching, and optimistic updates. This reduced boilerplate code and improved maintainability.

This evolution demonstrates a clear progression from traditional Redux data management to **modern RTK Query patterns**, aligning with current best practices in React development.

---

**Course:** React JS by Andriy Bryla (2025)
**Lesson:** 13 – Posts Management App (RTK Query)
**Student:** Artem Masharipov

```
```
