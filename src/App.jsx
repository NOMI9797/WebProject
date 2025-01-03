import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import Home from './pages/Home';
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
          element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" />} 
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
