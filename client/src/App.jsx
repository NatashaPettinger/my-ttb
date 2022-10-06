import React from 'react'
import './assets/main.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './features/home'
import { Inventory } from './features/inventory'
import { Processing } from './features/processing'
import { Production } from './features/production'
import { Storage } from './features/storage'
import { TTB } from './features/ttb'
import useAuth from './features/api/useAuth'


function App() {

  function RequireAuth({ children }) {
    const { authed } = useAuth();

    return authed === true ? children : <Navigate to="/" replace />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route 
          path="/raw-materials" 
          element={ 
            <RequireAuth>
              <Inventory/>
            </RequireAuth> 
          } 
        />
        <Route path="/production" element={ <Production/> } />
        <Route path="/warehousing" element={ <Storage/> } />
        <Route path="/processing" element={ <Processing/> } />
        <Route path="/ttb" element={ <TTB/> } />
      </Routes>
    </Router>
  );
}

export default App;
