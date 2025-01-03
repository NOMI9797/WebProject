import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SalesPage from './pages/SalesPage';
import Dashboard from './dashboard/Dashboard';
import { getCurrentUser } from './appwrite/Services/authServices';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/products" 
          element={user ? <ProductPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/sales" 
          element={user ? <SalesPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/" /> : <SignupForm setUser={setUser} />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
