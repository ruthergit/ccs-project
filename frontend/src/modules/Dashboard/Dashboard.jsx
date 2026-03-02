import React, { useState } from 'react';
import './Dashboard.css';
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaClock, FaSearch, FaTrophy, FaChartLine } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';

const Dashboard = () => {
  const [stats] = useState({
    totalStudents: 1245,
    totalFaculty: 87,
    upcomingEvents: 12,
    todaySchedules: 24
  });

  const [recentActivities] = useState([
    { id: 1, action: 'New student enrolled', time: '5 mins ago', user: 'Admin' },
    { id: 2, action: 'Faculty profile updated', time: '15 mins ago', user: 'Dr. Smith' },
    { id: 3, action: 'Event created: Tech Summit 2026', time: '1 hour ago', user: 'Dean' },
    { id: 4, action: 'Research paper submitted', time: '2 hours ago', user: 'Prof. Johnson' }
  ]);

  const [topResearchers] = useState([
    { id: 1, name: 'Dr. Maria Santos', papers: 15, score: 95.5 },
    { id: 2, name: 'Prof. John Reyes', papers: 12, score: 92.3 },
    { id: 3, name: 'Dr. Ana Cruz', papers: 10, score: 89.7 }
  ]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>CCS Dashboard</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Global Search..." />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card students">
          <div className="stat-icon"><FaUserGraduate size={48} /></div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card faculty">
          <div className="stat-icon"><FaChalkboardTeacher size={48} /></div>
          <div className="stat-info">
            <h3>{stats.totalFaculty}</h3>
            <p>Total Faculty</p>
          </div>
        </div>
        <div className="stat-card events">
          <div className="stat-icon"><FaCalendarAlt size={48} /></div>
          <div className="stat-info">
            <h3>{stats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card schedules">
          <div className="stat-icon"><FaClock size={48} /></div>
          <div className="stat-info">
            <h3>{stats.todaySchedules}</h3>
            <p>Today's Schedule</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget chart-widget">
          <h3><FaChartLine /> Student Growth Chart</h3>
          <div className="chart-placeholder">
            <div className="bar" style={{height: '60%'}}><span>2023</span></div>
            <div className="bar" style={{height: '80%'}}><span>2024</span></div>
            <div className="bar" style={{height: '95%'}}><span>2025</span></div>
            <div className="bar" style={{height: '100%'}}><span>2026</span></div>
          </div>
        </div>

        <div className="widget distribution-widget">
          <h3><MdPeople /> Faculty Distribution</h3>
          <div className="distribution-list">
            <div className="dist-item">
              <span>BSIT</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '65%'}}></div>
              </div>
              <span>45</span>
            </div>
            <div className="dist-item">
              <span>BSCS</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '48%'}}></div>
              </div>
              <span>42</span>
            </div>
          </div>
        </div>

        <div className="widget researcher-widget">
          <h3><FaTrophy /> Best Researcher Panel</h3>
          <div className="researcher-list">
            {topResearchers.map((researcher, index) => (
              <div key={researcher.id} className="researcher-item">
                <span className="rank">#{index + 1}</span>
                <div className="researcher-info">
                  <strong>{researcher.name}</strong>
                  <small>{researcher.papers} papers • Score: {researcher.score}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget activity-widget">
          <h3>📋 Recent Activity Logs</h3>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-content">
                  <strong>{activity.action}</strong>
                  <small>{activity.user} • {activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
