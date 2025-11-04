import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { createBrowserRouter , RouterProvider } from 'react-router';
import './index.css'
import App from './App.jsx'
import SignIn from './pages/Signin.jsx';
import AnonymousReport from './pages/FormPage.jsx';
import AdminDashboard from './pages/Adminpanel.jsx';
import ErrorPage from './pages/Errorpage.jsx';
import Cases from './pages/Cases.jsx';
import Profile from './pages/Profile.jsx';
import UserManagement from './pages/UserManagement.jsx';
import CrimeReports from './pages/CrimeReports.jsx';
import { Routing } from './services/PrivateRoute.jsx';
import AddCase from './pages/NewCase.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/admin/signin',
    element: <SignIn />
  },
  {
    path: '/report/form',
    element: <AnonymousReport />
  },
   {
    path: '/reports/all',
    element: <Routing.PrivateRoute><CrimeReports /></Routing.PrivateRoute>
  },
    {
    path: '/cases/all-cases',
    element: <Routing.PrivateRoute><Cases/></Routing.PrivateRoute>
  },
  {
    path: '/users/all',
    element: <Routing.PrivateRoute><UserManagement/></Routing.PrivateRoute>
  },
   {
    path: '/profile',
    element: <Routing.PrivateRoute><Profile/></Routing.PrivateRoute>
  },
  {
    path: '/admin/dashboard',
    element: <Routing.AdminProtectedRoute><AdminDashboard /></Routing.AdminProtectedRoute>
  },
  {
    path: '/cases/new-case',
    element: <Routing.PrivateRoute><AddCase /></Routing.PrivateRoute>
  },
  {
    path: '*',
    element: <ErrorPage/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)