
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home.js';
import Login from './pages/login/Login.js';
import Signup from './pages/signup/Signup.js';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
