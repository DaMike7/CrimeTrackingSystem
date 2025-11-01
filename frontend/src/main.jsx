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
    path: '/admin/dashboard',
    element: <AdminDashboard />
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