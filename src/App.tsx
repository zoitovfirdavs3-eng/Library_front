import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import RequireAuth from '@/components/RequireAuth'
import RequireRole from '@/components/RequireRole'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import VerifyEmail from '@/pages/VerifyEmail'
import Dashboard from '@/pages/Dashboard'
import Books from '@/pages/Books'
import Authors from '@/pages/Authors'
import Categories from '@/pages/Categories'
import Profile from '@/pages/Profile'
import NoAccess from '@/pages/NoAccess'
import AdminManagement from '@/pages/AdminManagement'
import ErrorBoundary from '@/components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/no-access" element={<NoAccess />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/" element={
              <RequireAuth>
                <Navigate to="/dashboard" replace />
              </RequireAuth>
            } />
            
            {/* Dashboard - all authenticated users */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </RequireAuth>
              }
            />
            
            {/* Books - all authenticated users */}
            <Route
              path="/books"
              element={
                <RequireAuth>
                  <Layout>
                    <Books />
                  </Layout>
                </RequireAuth>
              }
            />
            
            {/* Profile - all authenticated users */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Layout>
                    <Profile />
                  </Layout>
                </RequireAuth>
              }
            />
            
            {/* Authors - admin and super_admin */}
            <Route
              path="/authors"
              element={
                <RequireRole allowedRoles={['admin', 'super_admin']}>
                  <Layout>
                    <Authors />
                  </Layout>
                </RequireRole>
              }
            />
            
            {/* Categories - admin and super_admin */}
            <Route
              path="/categories"
              element={
                <RequireRole allowedRoles={['admin', 'super_admin']}>
                  <Layout>
                    <Categories />
                  </Layout>
                </RequireRole>
              }
            />
            
            {/* Admin Management - super_admin only */}
            <Route
              path="/admin-management"
              element={
                <RequireRole allowedRoles={['super_admin']}>
                  <Layout>
                    <AdminManagement />
                  </Layout>
                </RequireRole>
              }
            />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
