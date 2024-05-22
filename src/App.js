//App.js
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Homepage } from './Pages/Homepage';
import { Courses } from './Pages/Courses';
import { Notfoundpage } from './Pages/Notfoundpage';
import { AuthProvider, AuthContext } from './Authorisation/AuthContext';
import Auth from './Pages/Auth';
import './styles/App.css';
import './styles/Auth.css';
import './styles/Homepage.css';
const ProtectedRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuth) {
      navigate('/auth');
    }
  }, [auth, navigate]);

  return auth.isAuth ? element : null;
};

function App() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <AuthProvider>
      <header>
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">Головна</Link>
        <Link className={location.pathname === '/courses' ? 'active' : ''} to="/courses">Курси</Link>
        <Link className={location.pathname === '/cabinet' ? 'active' : ''} to="/cabinet">Кабінет</Link>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<Courses data={data} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cabinet" element={<ProtectedRoute element={<Auth />} />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
