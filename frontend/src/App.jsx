import { useState, useEffect } from 'react';
import './App.css';
import {
  MdDashboard, MdPerson, MdPeople, MdSchedule,
  MdEvent, MdScience, MdBook, MdMeetingRoom,
  MdLightMode, MdDarkMode, MdChevronLeft
} from 'react-icons/md';
import Dashboard      from './modules/Dashboard/Dashboard';
import StudentProfile from './modules/StudentProfile/StudentProfile';
import FacultyProfile from './modules/FacultyProfile/FacultyProfile';
import Events         from './modules/Events/Events';
import Scheduling     from './modules/Scheduling/Scheduling';
import Research       from './modules/Research/Research';
import Instructional  from './modules/Instructional/Instructional';
import RoomManagement from './modules/RoomManagement/RoomManagement';

const modules = [
  { id: 'dashboard',    name: 'Dashboard',        icon: MdDashboard   },
  { id: 'student',      name: 'Student Profile',   icon: MdPerson      },
  { id: 'faculty',      name: 'Faculty Profile',   icon: MdPeople      },
  { id: 'scheduling',   name: 'Scheduling',        icon: MdSchedule    },
  { id: 'events',       name: 'Events',            icon: MdEvent       },
  { id: 'research',     name: 'Research',          icon: MdScience     },
  { id: 'instructional',name: 'Instructional',     icon: MdBook        },
  { id: 'rooms',        name: 'Room Management',   icon: MdMeetingRoom },
];

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [darkMode,      setDarkMode]      = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') { setDarkMode(true); document.documentElement.classList.add('dark'); }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':     return <Dashboard />;
      case 'student':       return <StudentProfile />;
      case 'faculty':       return <FacultyProfile />;
      case 'events':        return <Events />;
      case 'scheduling':    return <Scheduling />;
      case 'research':      return <Research />;
      case 'instructional': return <Instructional />;
      case 'rooms':         return <RoomManagement />;
      default:              return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* ── Sidebar ── */}
      <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <div
              className="logo-wrapper"
              onClick={() => !sidebarOpen && setSidebarOpen(true)}
              title={!sidebarOpen ? 'Open sidebar' : ''}
            >
              <img src="/ccs.png" alt="CCS Logo" className="logo-image" />
            </div>
            {sidebarOpen && (
              <div className="logo-text">
                <h2>CCS</h2>
                <p>Profiling System</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button className="toggle-btn" onClick={() => setSidebarOpen(false)} title="Collapse sidebar">
              <MdChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <ul className="nav-menu">
          {modules.map(({ id, name, icon: Icon }) => (
            <li
              key={id}
              className={currentModule === id ? 'active' : ''}
              onClick={() => setCurrentModule(id)}
              title={!sidebarOpen ? name : ''}
            >
              <span className="nav-icon"><Icon size={22} /></span>
              {sidebarOpen && <span className="nav-text">{name}</span>}
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <div className="theme-toggle-container">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
            <span className="toggle-icon">
              {darkMode ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
            </span>
            {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {renderModule()}
      </main>

      {/* ── Footer ── */}
      <footer className={`app-footer ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="footer-inner">
          <div className="footer-left">
            <img src="/ccs.png" alt="CCS Logo" className="footer-logo" />
            <div>
              <span className="footer-title">CCS Profiling System</span>
              <span className="footer-sub">College of Computer Studies</span>
            </div>
          </div>
          <div className="footer-center">
            © {new Date().getFullYear()} CCS 4IT-D. All rights reserved.
          </div>
          <div className="footer-right">
            v.2.3
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
