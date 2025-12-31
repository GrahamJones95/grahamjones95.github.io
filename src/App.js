import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Thoughts from './components/Thoughts';
import ThoughtDetail from './components/ThoughtDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Graham's Personal Site</h1>
          <nav className="nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
              end
            >
              About Me
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
            >
              Projects
            </NavLink>
            <NavLink 
              to="/thoughts" 
              className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
            >
              Thoughts
            </NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/thoughts/:id" element={<ThoughtDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
