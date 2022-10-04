import React, { useState } from 'react'
import './assets/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './features/home'
import { Inventory } from './features/inventory'
import { Processing } from './features/processing'
import { Production } from './features/production'
import { Storage } from './features/storage'
import { TTB } from './features/ttb'


function App() {
  //const [currentUser, setCurrentUser] = useState(null)

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/raw-materials" element={ <Inventory/> } />
        <Route path="/production" element={ <Production/> } />
        <Route path="/warehousing" element={ <Storage/> } />
        <Route path="/processing" element={ <Processing/> } />
        <Route path="/ttb" element={ <TTB/> } />
      </Routes>
    </Router>
  );
}

export default App;
