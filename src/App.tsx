import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Papers } from './pages/Papers';
import { Profile } from './pages/Profile';
import { SubmitPaper } from './pages/SubmitPaper';
import { Community } from './pages/Community';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit" element={<SubmitPaper />} />
            <Route path="/community" element={<Community />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;