import { useState } from 'react';
import './App.css';
import { MdDashboard, MdPerson, MdPeople, MdSchedule, MdEvent, MdScience, MdBook, MdMeetingRoom } from 'react-icons/md';
import Logo from './components/Logo';
import Dashboard from './modules/Dashboard/Dashboard';
import StudentProfile from './modules/StudentProfile/StudentProfile';
import FacultyProfile from './modules/FacultyProfile/FacultyProfile';
import Events from './modules/Events/Events';
import Scheduling from './modules/Scheduling/Scheduling';
import Research from './modules/Research/Research';
import Instructional from './modules/Instructional/Instructional';
import RoomManagement from './modules/RoomManagement/RoomManagement';

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: MdDashboard },
    { id: 'student', name: 'Student Profile', icon: MdPerson },
    { id: 'faculty', name: 'Faculty Profile', icon: MdPeople },
    { id: 'scheduling', name: 'Scheduling', icon: MdSchedule },
    { id: 'events', name: 'Events', icon: MdEvent },
    { id: 'research', name: 'Research', icon: MdScience },
    { id: 'instructional', name: 'Instructional', icon: MdBook },
    { id: 'rooms', name: 'Room Management', icon: MdMeetingRoom }
  ];

  const renderModule = () => {
    switch(currentModule) {
      case 'dashboard': return <Dashboard />;
      case 'student': return <StudentProfile />;
      case 'faculty': return <FacultyProfile />;
      case 'events': return <Events />;
      case 'scheduling': return <Scheduling />;
      case 'research': return <Research />;
      case 'instructional': return <Instructional />;
      case 'rooms': return <RoomManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div 
              className="logo-wrapper"
              onClick={() => !sidebarOpen && setSidebarOpen(true)}
              style={{ cursor: !sidebarOpen ? 'pointer' : 'default' }}
              title={!sidebarOpen ? 'Click to open sidebar' : ''}
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
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ◀
            </button>
          )}
        </div>
        <ul className="nav-menu">
          {modules.map(module => {
            const IconComponent = module.icon;
            return (
              <li 
                key={module.id}
                className={currentModule === module.id ? 'active' : ''}
                onClick={() => setCurrentModule(module.id)}
              >
                <span className="nav-icon"><IconComponent size={24} /></span>
                {sidebarOpen && <span className="nav-text">{module.name}</span>}
              </li>
            );
          })}
        </ul>
      </nav>
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {renderModule()}
      </main>
    </div>
  );
}

export default App;
