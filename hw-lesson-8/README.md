# Homework Lesson 8 – Teachers & Meetings App

Full-stack React 19 + Node.js (Express + MongoDB) application for managing teachers and scheduling a 2‑participant meeting ("Збори"). This project extends previous homework lessons by introducing optimistic UI updates, file uploads (avatar), modular feature-based architecture, and improved mobile navigation.

## ✨ Highlights

- React 19 with `useOptimistic`, `startTransition` for smooth state updates
- Feature-based folder structure (teachers, meetings, subjects)
- Optimistic assignment/unassignment of teachers to a single active meeting
- Avatar upload (client encodes Base64; server persists)
- Barrel exports to simplify imports (`shared/ui`, `features/teacher/components`)
- Mobile-friendly fixed header + full-width slide-in navigation
- Axios API client with centralized base config
- Reusable UI primitives (Button, Navbar, Spinner)
- Utility helpers (`fileToBase64`, `formatDate`)
- Consistent API response normalization on the server (`{ data: ... }` envelope)

## 🗂 Structure

```
./client   # React 19 + Vite 7 frontend
./server   # Express + Mongoose backend (API v1)
```

Key frontend paths:

```
client/src/features/teacher     # Teacher CRUD + meeting assignment logic
client/src/features/meetings    # Meeting page + components
client/src/shared/ui            # Reusable UI components (barrel export)
client/src/shared/utils         # Utilities (fileToBase64, formatDate)
client/src/routes               # Route config
client/src/layout               # Layouts with fixed header spacing
```

Backend highlights:

```
server/src/v1/models            # Mongoose models (Teacher, Subject, Meeting)
server/src/v1/controllers       # Controller logic
server/src/v1/services          # Business logic layer
server/src/v1/routes            # REST API endpoints
```

## 🚀 Running Locally

Prerequisites: Node 18+, MongoDB running locally or a connection string.

Install deps:

```
cd client && npm install
cd ../server && npm install
```

Run dev (two terminals):

```
# Terminal 1
cd server && npm start
# Terminal 2
cd client && npm run dev
```

Build frontend:

```
cd client && npm run build
```

## 🔗 API Overview (v1)

- `GET /api/v1/teachers` – list teachers
- `POST /api/v1/teachers` – create teacher
- `PUT /api/v1/teachers/:id` – update teacher
- `DELETE /api/v1/teachers/:id` – remove teacher
- `GET /api/v1/meeting` – get current meeting (if exists)
- `POST /api/v1/meeting/assign/:teacherId` – assign teacher
- `POST /api/v1/meeting/unassign/:teacherId` – unassign teacher

## 🧠 Key Patterns

| Area    | Pattern                                       |
| ------- | --------------------------------------------- |
| State   | Optimistic updates + transitions              |
| Imports | Barrel index files to reduce relative paths   |
| Layout  | Fixed header + compensated `pt-*` spacing     |
| UX      | Slide-in mobile nav + scroll lock + ESC close |
| Files   | Utility extraction (`fileToBase64`)           |

## 📦 Tech Stack

**Frontend:** React 19, Vite 7, Tailwind CSS 4 (utility classes), React Router 7, Axios 1.x
**Backend:** Node.js 18+, Express 4.21, Mongoose, MongoDB
**Tooling:** ESLint, Prettier (format script), npm scripts

## ✅ Completed Improvements (Lesson 8 Scope)

- Refactored markup to remove inline excessive logic
- Implemented optimistic meeting participant updates
- Added avatar upload with base64 conversion util
- Introduced barrel exports across UI & feature components
- Rebuilt mobile nav with full-width panel and overlay
- Converted header to fixed; adjusted layouts for spacing
- Resolved React warning: optimistic updates wrapped in `startTransition`

## 🔮 Possible Next Steps

- Add focus trap & initial focus for mobile nav accessibility
- Add unit tests for optimistic reducer logic
- Dark mode theme switcher
- Server-side image validation (size/type)

---

**Course:** React JS by Andriy Bryla (2025)
**Homework:** Lesson 8
**Author:** Artem Masharipov
