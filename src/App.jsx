import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { token } = useContext(UserContext);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/register'
          element={token ? <Navigate to='/' /> : <RegisterPage />}
        />

        <Route
          path='/login'
          element={token ? <Navigate to='/' /> : <LoginPage />}
        />

        <Route path='/cart' element={<Cart />} />

        <Route path='/pizza/:id' element={<Pizza />} />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;