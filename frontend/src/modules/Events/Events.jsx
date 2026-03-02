import React, { useState } from 'react';
import './Events.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const Events = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Tech Summit 2026',
      type: 'Seminar',
      date: '2026-03-15',
      time: '09:00 AM',
      venue: 'CCS Auditorium',
      faculty: 'Dr. Maria Santos',
      participants: 150,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      type: 'Workshop',
      date: '2026-03-20',
      time: '01:00 PM',
      venue: 'Computer Lab 1',
      faculty: 'Prof. John Reyes',
      participants: 45,
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Programming Competition',
      type: 'Competition',
      date: '2026-03-25',
      time: '08:00 AM',
      venue: 'CCS Building',
      faculty: 'Dr. Ana Cruz',
      participants: 80,
      status: 'Upcoming'
    }
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="events-container">
      <div className="events-header">
        <h1><FaCalendarAlt /> Events Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Create Event
        </button>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className={`event-type-badge ${event.type.toLowerCase()}`}>
              {event.type}
            </div>
            <h3>{event.title}</h3>
            <div className="event-details">
              <div className="detail-item">
                <span className="icon"><FaCalendarAlt /></span>
                <span>{event.date}</span>
              </div>
              <div className="detail-item">
                <span className="icon"><FaClock /></span>
                <span>{event.time}</span>
              </div>
              <div className="detail-item">
                <span className="icon"><FaMapMarkerAlt /></span>
                <span>{event.venue}</span>
              </div>
              <div className="detail-item">
                <span className="icon"><FaChalkboardTeacher /></span>
                <span>{event.faculty}</span>
              </div>
              <div className="detail-item">
                <span className="icon"><FaUsers /></span>
                <span>{event.participants} participants</span>
              </div>
            </div>
            <div className="event-actions">
              <button className="btn-view">View Details</button>
              <button className="btn-edit">Edit</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Create New Event</h2>
            <form className="event-form">
              <input type="text" placeholder="Event Title" required />
              <select required>
                <option value="">Select Type</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
              </select>
              <input type="date" required />
              <input type="time" required />
              <input type="text" placeholder="Venue" required />
              <input type="text" placeholder="Assigned Faculty" required />
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
