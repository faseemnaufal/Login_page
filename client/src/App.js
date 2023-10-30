import './App.css';
import Login from './Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App">
      
      {/* <Login /> */}
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

