import React from 'react';import React, { useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';import LoginPage from './components/LoginPage';

import RegisterPage from './components/RegisterPage';import RegisterPage from './components/RegisterPage';

import './App.css';import './App.css';



function App() {function App() {

  return (  return (

    <div className="App">    <div className="App">

      <Routes>      <Routes>

        <Route path="/login" element={<LoginPage />} />        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Navigate to="/login" />} />        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>      </Routes>

    </div>    </div>

  );  );

}}



export default App;export default App;
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom hook for Campus Eats functionality
function useCampusEats() {
  const [userId, setUserId] = useState(localStorage.getItem('authToken') ? localStorage.getItem('mockUserId') : null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        const data = await response.json();
        setMenuItems(data);
        
        if (isAuthenticated) {
          const token = localStorage.getItem('authToken');
          const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setProfile(await profileResponse.json());

          const ordersResponse = await fetch(`${API_BASE_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setOrders(await ordersResponse.json());
        }
      } catch (err) {
        setError(err.message);
        // Fallback mock data
        setMenuItems([
          { id: '1', name: 'Veg Biryani', price: 95, time: 15, category: 'Main' },
          { id: '2', name: 'Paneer Roll', price: 80, time: 10, category: 'Snacks' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [isAuthenticated]);

  const handleLogin = async (collegeId, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('mockUserId', data.userId);
      setUserId(data.userId);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserId(null);
    setOrders([]);
    setProfile({});
  };

  return {
    userId,
    isAuthenticated,
    menuItems,
    orders,
    profile,
    loading,
    error,
    handleLogin,
    handleLogout,
    setOrders,
  };
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [cart, setCart] = useState([]);

  const {
    isAuthenticated,
    menuItems,
    orders,
    profile,
    loading,
    error,
    handleLogin,
    handleLogout,
    setOrders
  } = useCampusEats();

  useEffect(() => {
    if (isAuthenticated && currentPage === 'login') {
      setCurrentPage('menu');
    }
  }, [isAuthenticated]);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <LoginPage setCurrentPage={setCurrentPage} handleLogin={handleLogin} />
      );
    }

    switch (currentPage) {
      case 'menu':
        return <MenuPage menuItems={menuItems} cart={cart} setCart={setCart} />;
      case 'cart':
        return <CartPage cart={cart} setCart={setCart} setOrders={setOrders} />;
      case 'dashboard':
        return <DashboardPage orders={orders} />;
      case 'profile':
        return <ProfilePage profile={profile} handleLogout={handleLogout} />;
      default:
        return <MenuPage menuItems={menuItems} cart={cart} setCart={setCart} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex bg-gray-100">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
          }}
        />
        
        {isAuthenticated && (
          <Sidebar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            profile={profile}
            handleLogout={handleLogout}
          />
        )}
        <main className="flex-1 overflow-y-auto">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 m-4 rounded-lg">
              {error}
            </div>
          )}
          {renderPage()}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;