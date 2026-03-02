import React, { useState } from 'react';
import './Scheduling.css';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';

const Scheduling = () => {
  const [schedules] = useState([
    {
      id: 1,
      code: 'IT301',
      subject: 'Data Structures',
      type: 'Lecture',
      hours: 2,
      units: 2,
      section: '3A',
      faculty: 'Dr. Maria Santos',
      room: 'LR-201',
      roomType: 'Lecture Room',
      capacity: 40,
      enrolled: 35,
      day: 'Monday',
      time: '09:00 AM - 11:00 AM'
    },
    {
      id: 2,
      code: 'IT301L',
      subject: 'Data Structures Lab',
      type: 'Laboratory',
      hours: 3,
      units: 1,
      section: '3A',
      faculty: 'Dr. Maria Santos',
      room: 'LAB-101',
      roomType: 'Laboratory Room',
      capacity: 30,
      enrolled: 35,
      day: 'Tuesday',
      time: '01:00 PM - 04:00 PM'
    },
    {
      id: 3,
      code: 'IT401',
      subject: 'Machine Learning',
      type: 'Pure Lecture',
      hours: 3,
      units: 3,
      section: '4A',
      faculty: 'Dr. Maria Santos',
      room: 'LR-305',
      roomType: 'Lecture Room',
      capacity: 45,
      enrolled: 42,
      day: 'Wednesday',
      time: '10:00 AM - 01:00 PM'
    }
  ]);

  const getCapacityStatus = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage > 100) return 'overcapacity';
    if (percentage >= 90) return 'near-full';
    return 'available';
  };

  return (
    <div className="scheduling-container">
      <div className="scheduling-header">
        <h1><FaCalendarAlt /> Scheduling Module</h1>
        <button className="btn-primary"><FaPlus /> Add Schedule</button>
      </div>

      <div className="schedule-summary">
        <div className="summary-card">
          <h3>Subject Time Types</h3>
          <div className="time-types">
            <div className="time-type">
              <span className="type-label">Lecture:</span>
              <span>2 hours = 2 units</span>
            </div>
            <div className="time-type">
              <span className="type-label">Laboratory:</span>
              <span>3 hours = 1 unit</span>
            </div>
            <div className="time-type">
              <span className="type-label">Pure Lecture:</span>
              <span>3 hours = 3 units</span>
            </div>
          </div>
        </div>
      </div>

      <div className="schedules-table-container">
        <table className="schedules-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Section</th>
              <th>Faculty</th>
              <th>Room</th>
              <th>Capacity</th>
              <th>Day</th>
              <th>Time</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => {
              const capacityStatus = getCapacityStatus(schedule.enrolled, schedule.capacity);
              return (
                <tr key={schedule.id}>
                  <td>{schedule.code}</td>
                  <td>{schedule.subject}</td>
                  <td><span className={`type-badge ${schedule.type.toLowerCase()}`}>{schedule.type}</span></td>
                  <td>{schedule.section}</td>
                  <td>{schedule.faculty}</td>
                  <td>
                    <div className="room-info">
                      <span>{schedule.room}</span>
                      <small>{schedule.roomType}</small>
                    </div>
                  </td>
                  <td>
                    <div className={`capacity-indicator ${capacityStatus}`}>
                      {schedule.enrolled}/{schedule.capacity}
                      <div className="capacity-bar">
                        <div 
                          className="capacity-fill" 
                          style={{width: `${Math.min((schedule.enrolled / schedule.capacity) * 100, 100)}%`}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>{schedule.day}</td>
                  <td>{schedule.time}</td>
                  <td><strong>{schedule.units}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scheduling;
