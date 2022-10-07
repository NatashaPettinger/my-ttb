import React from 'react'
import './assets/main.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Home } from './features/home'
import { Inventory } from './features/inventory'
import { Processing } from './features/processing'
import { Production } from './features/production'
import { Storage } from './features/storage'
import { TTB } from './features/ttb'
import useAuth, { AuthProvider } from './features/api/useAuth'


function App() {

  const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();
  
    if (!token) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  
    return children;
  };

  return (
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route 
            path="/raw-materials" 
            element={ 
              <ProtectedRoute>
                <Inventory/>
              </ProtectedRoute> 
            } 
          />
          <Route 
            path="/production" 
            element={ 
              <ProtectedRoute>
                <Production/> 
              </ProtectedRoute> 
            }
          />
          <Route 
            path="/warehousing" 
            element={ 
              <ProtectedRoute>
                <Storage/>
              </ProtectedRoute> 
            }/>
          <Route 
            path="/processing" 
            element={
              <ProtectedRoute>
                <Processing/>
              </ProtectedRoute> 
            }/>
          <Route 
            path="/ttb" 
            element={
              <ProtectedRoute>
                <TTB/>
              </ProtectedRoute> 
            }/>
        </Routes>
      </AuthProvider>
      </Router>
  );
}

export default App;
