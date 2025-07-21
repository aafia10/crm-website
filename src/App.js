import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  const isAuth = useSelector((state) => !!state.auth.token); // true if logged in

  return (
    <BrowserRouter>
      {isAuth && <Navbar />} {/* Only show navbar when authenticated */}

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
        />

        {/* Fallback for unmatched routes */}
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
