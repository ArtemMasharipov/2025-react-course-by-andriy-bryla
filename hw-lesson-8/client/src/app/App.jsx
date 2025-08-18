import { BrowserRouter, Routes } from 'react-router-dom'
import { appRoutes } from '../routes/routes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{appRoutes}</Routes>
    </BrowserRouter>
  )
}
