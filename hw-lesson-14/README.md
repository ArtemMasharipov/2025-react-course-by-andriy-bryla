# EMR System - Electronic Medical Records

Comprehensive Electronic Medical Records (EMR) system built with React 19, RTK Query, and Firebase Firestore. Features real-time data synchronization, modern UI design, and full CRUD operations for patients, doctors, and appointments.

## Key Features

- **Real-time Data Sync**: Firebase Firestore integration with automatic updates
- **RTK Query Integration**: Efficient data fetching, caching, and state management
- **Modern UI Design**: Lime-themed responsive design with Tailwind CSS 4.x
- **CRUD Operations**: Complete management for patients, doctors, and appointments
- **Advanced Search**: Real-time search with debounced input
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Feature-Sliced Design**: Clean architecture with modular components
- **Firebase Hosting**: Production deployment with Firebase

## Technology Stack

**Frontend:**
- React 19.1.1
- RTK Query 2.9.0 (Redux Toolkit)
- React Router 7.8.2
- Tailwind CSS 4.1.13
- Vite 7.1.2

**Backend & Database:**
- Firebase Firestore 12.2.1
- Firebase Hosting
- Real-time synchronization

**Build & Development:**
- Vite 7.1.2
- ESLint 9.33.0
- Prettier 3.6.2

## Project Structure

```
hw-lesson-14/
├── README.md               # Project documentation
├── firebase.json           # Firebase configuration
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration with path aliases
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
│
├── firestore/              # Firebase Firestore configuration
│   ├── firestore.rules     # Security rules
│   └── firestore.indexes.json # Database indexes
│
└── src/                    # Source code
    ├── app/                # Application core layer (FSD)
    │   ├── layout/
    │   │   └── MainLayout.jsx      # Main application layout
    │   └── providers/
    │       ├── router.jsx          # Router configuration
    │       └── store.js            # RTK Query store setup
    │
    ├── modules/            # Business modules (FSD)
    │   ├── patient/        # Patient management module
    │   │   ├── api/
    │   │   │   └── patient.api.js  # Patient API endpoints
    │   │   ├── components/
    │   │   │   ├── PatientDetails.jsx    # Patient details view
    │   │   │   ├── PatientForm.jsx       # Patient form component
    │   │   │   └── PatientList.jsx       # Patient list component
    │   │   └── pages/
    │   │       ├── PatientDetailsPage.jsx # Patient details page
    │   │       ├── PatientFormPage.jsx    # Patient form page
    │   │       └── PatientsPage.jsx       # Patients listing page
    │   │
    │   ├── doctor/         # Doctor management module
    │   │   ├── api/
    │   │   │   └── doctor.api.js    # Doctor API endpoints
    │   │   ├── components/
    │   │   │   ├── DoctorDetails.jsx     # Doctor details view
    │   │   │   ├── DoctorForm.jsx        # Doctor form component
    │   │   │   └── DoctorList.jsx        # Doctor list component
    │   │   └── pages/
    │   │       ├── DoctorDetailsPage.jsx # Doctor details page
    │   │       ├── DoctorFormPage.jsx    # Doctor form page
    │   │       └── DoctorsPage.jsx       # Doctors listing page
    │   │
    │   └── appointment/    # Appointment management module
    │       ├── api/
    │       │   └── appointment.api.js    # Appointment API endpoints
    │       ├── components/
    │       │   ├── AppointmentDetails.jsx    # Appointment details view
    │       │   ├── AppointmentForm.jsx       # Appointment form component
    │       │   └── AppointmentList.jsx       # Appointment list component
    │       └── pages/
    │           ├── AppointmentDetailsPage.jsx # Appointment details page
    │           ├── AppointmentFormPage.jsx    # Appointment form page
    │           └── AppointmentsPage.jsx       # Appointments listing page
    │
    ├── pages/              # Application pages
    │   ├── HomePage.jsx    # Landing page with navigation cards
    │   └── NotFoundPage.jsx # 404 error page
    │
    └── shared/             # Shared resources (FSD)
        ├── api/
        │   ├── createCrudApi.js    # Generic CRUD API factory
        │   └── index.js            # API exports
        ├── components/
        │   ├── BackButton.jsx      # Navigation back button
        │   ├── BaseEntityPage.jsx  # Base page component
        │   ├── EntityFormPage.jsx  # Generic form page
        │   ├── ErrorPage.jsx       # Error display component
        │   └── index.js            # Component exports
        ├── config/
        │   ├── cascade.config.js   # Cascade delete configuration
        │   ├── entities.config.js  # Entity configuration
        │   ├── firebase.config.js  # Firebase configuration
        │   ├── form-options.config.js # Form options
        │   ├── navigation.config.js # Navigation configuration
        │   └── index.js            # Config exports
        ├── data/
        │   ├── AppPagination.jsx   # Pagination component
        │   ├── ListWrapper.jsx     # List wrapper component
        │   ├── PaginatedEntitySelector.jsx # Entity selector
        │   ├── SearchInput.jsx     # Search input component
        │   └── index.js            # Data exports
        ├── firebase/
        │   ├── FirebaseRepo.js     # Firebase repository
        │   └── index.js            # Firebase exports
        ├── forms/
        │   ├── AppForm.jsx         # Generic form component
        │   └── index.js            # Form exports
        ├── hooks/
        │   ├── useConfirmModal.jsx # Confirmation modal hook
        │   ├── useEntityActions.js # Entity actions hook
        │   ├── useEntityList.js    # Entity list hook
        │   └── index.js            # Hook exports
        ├── styles/
        │   ├── index.css           # Global styles
        │   └── index.js            # Style exports
        ├── ui/
        │   ├── AppButton.jsx       # Button component
        │   ├── AppCard.jsx         # Card component
        │   ├── Breadcrumbs.jsx     # Breadcrumb navigation
        │   ├── FormField.jsx       # Form field component
        │   ├── LoadingSpinner.jsx  # Loading spinner
        │   ├── MobileDrawer.jsx    # Mobile navigation drawer
        │   ├── Navbar.jsx          # Navigation bar
        │   ├── PageHeader.jsx      # Page header component
        │   └── index.js            # UI exports
        ├── utils/
        │   ├── debounce.js         # Debounce utility
        │   ├── errorHandler.js     # Error handling utility
        │   └── index.js            # Utility exports
        └── index.js                # Shared exports
```

## Quick Start

**Prerequisites:** Node.js 18+, Firebase CLI

**Installation:**

```bash
git clone https://github.com/ArtemMasharipov/2025-react-course-by-andriy-bryla.git
cd 2025-react-course-by-andriy-bryla/hw-lesson-14

# Install dependencies
npm install

# Set up Firebase (if not already configured)
firebase login
firebase init

# Start development server
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Firebase Console: https://console.firebase.google.com

## Firebase Configuration

### Firestore Database

The application uses Firebase Firestore with the following collections:

- **patients**: Patient records with personal information
- **doctors**: Doctor profiles with specialties and contact info
- **appointments**: Appointment scheduling with patient/doctor relationships

### Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for demo purposes)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Database Indexes

Composite indexes are configured for efficient querying:

```json
{
  "indexes": [
    {
      "collectionGroup": "appointments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "patientId", "order": "ASCENDING" },
        { "fieldPath": "appointmentDate", "order": "ASCENDING" }
      ]
    }
  ]
}
```

## RTK Query Implementation

### Key Features

**Automatic Caching:**
- Smart caching with background refetching
- Cache invalidation on mutations
- Optimistic updates for better UX

**Real-time Synchronization:**
- Firebase Firestore real-time listeners
- Automatic UI updates on data changes
- Conflict resolution and error handling

**Entity Management:**
- Generic CRUD operations for all entities
- Cascade delete functionality
- Search and pagination support

### API Structure

```javascript
// Example RTK Query API slice
export const patientsApi = createCrudApi({
  entityName: 'patients',
  baseUrl: 'patients',
  tagTypes: ['Patient']
})

// Generated endpoints:
// - getPatients: GET /patients
// - getPatient: GET /patients/:id
// - createPatient: POST /patients
// - updatePatient: PUT /patients/:id
// - deletePatient: DELETE /patients/:id
```

## Development

**Development Server:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

**Firebase Operations:**
```bash
npm run deploy       # Deploy to Firebase Hosting
npm run deploy:all   # Deploy hosting and Firestore rules
npm run serve        # Serve locally with Firebase
```

**Database Management:**
```bash
npm run seed         # Seed database with sample data
npm run fix-search   # Fix missing search fields
```

## Features Overview

### Patient Management
- ✅ View patient list with search and pagination
- ✅ Add new patients with form validation
- ✅ Edit existing patient information
- ✅ Delete patients with cascade appointment cleanup
- ✅ Patient details view with appointment history

### Doctor Management
- ✅ View doctor list with specialties
- ✅ Add new doctors with profile information
- ✅ Edit doctor profiles and specialties
- ✅ Delete doctors with cascade appointment cleanup
- ✅ Doctor details view with appointment schedule

### Appointment Management
- ✅ View appointments with patient/doctor information
- ✅ Schedule new appointments with date/time selection
- ✅ Edit appointment details
- ✅ Cancel appointments
- ✅ Appointment details view with full information

### UI/UX Features
- ✅ Modern lime-themed design with gradients
- ✅ Responsive layout for all screen sizes
- ✅ Mobile navigation with drawer
- ✅ Real-time search with debounced input
- ✅ Loading states and error handling
- ✅ Form validation and error messages
- ✅ Breadcrumb navigation
- ✅ Confirmation modals for destructive actions

## Design System

### Color Palette
- **Primary**: Lime (#84cc16, #65a30d)
- **Background**: Lime-50/950 (light/dark)
- **Text**: Lime-800/100 (light/dark)
- **Accent**: Lime-200/700 (borders)

### Typography
- **Headings**: font-semibold tracking-tight
- **Body**: font-medium text-sm
- **Labels**: text-xs uppercase tracking-wide

### Components
- **Buttons**: Consistent styling with hover states
- **Cards**: Gradient backgrounds with shadow effects
- **Forms**: Accessible inputs with focus states
- **Navigation**: Responsive header with mobile drawer

## Performance Features

### Frontend Optimizations
- **Code Splitting**: Route-based lazy loading
- **Memoization**: React.memo, useMemo, useCallback
- **Debounced Search**: Optimized search performance
- **RTK Query Caching**: Automatic data caching
- **Error Boundaries**: Graceful error handling

### Firebase Optimizations
- **Real-time Listeners**: Efficient data synchronization
- **Composite Indexes**: Optimized query performance
- **Security Rules**: Proper access control
- **Hosting**: CDN distribution with caching

## Deployment

The application is deployed on Firebase Hosting:

**Live Demo:** https://hw-lesson-14-erm-rtk-query.web.app

**Deployment Process:**
1. Build the application: `npm run build`
2. Deploy to Firebase: `npm run deploy`
3. Configure Firestore rules and indexes
4. Set up Firebase Hosting redirects

## Scripts Reference

### Development Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Firebase Scripts
- `npm run deploy` - Deploy to Firebase Hosting
- `npm run deploy:all` - Deploy hosting and Firestore
- `npm run serve` - Serve locally with Firebase

### Database Scripts
- `npm run seed` - Seed database with sample data
- `npm run fix-search` - Fix missing search fields

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a React JS course by Andriy Bryla.

## Acknowledgments

- **Course Instructor**: Andriy Bryla
- **Technologies**: React, RTK Query, Firebase, Tailwind CSS
- **Community**: React and Firebase ecosystem contributors

---

**Course:** React JS by Andriy Bryla (2025) | **Lesson:** 14 - EMR System with RTK Query & Firebase

**Key Learning Outcomes:**
- RTK Query integration with Firebase Firestore
- Real-time data synchronization
- Feature-Sliced Design architecture
- Modern UI/UX with Tailwind CSS 4.x
- Firebase deployment and configuration


