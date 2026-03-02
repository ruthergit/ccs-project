import React, { useState } from 'react';
import './RoomManagement.css';
import { FaBuilding, FaPlus, FaDoorOpen, FaMapMarkerAlt, FaChair, FaUsers } from 'react-icons/fa';

const RoomManagement = () => {
  const [rooms] = useState([
    {
      id: 'LR-201',
      name: 'Lecture Room 201',
      type: 'Lecture Room',
      building: 'CCS Building',
      floor: '2nd Floor',
      capacity: 40,
      currentOccupancy: 35,
      status: 'Occupied'
    },
    {
      id: 'LAB-101',
      name: 'Computer Laboratory 1',
      type: 'Laboratory Room',
      building: 'CCS Building',
      floor: '1st Floor',
      capacity: 30,
      currentOccupancy: 28,
      status: 'Occupied'
    },
    {
      id: 'LR-305',
      name: 'Lecture Room 305',
      type: 'Lecture Room',
      building: 'CCS Building',
      floor: '3rd Floor',
      capacity: 45,
      currentOccupancy: 0,
      status: 'Available'
    }
  ]);

  const getUtilization = (current, capacity) => {
    return ((current / capacity) * 100).toFixed(1);
  };

  const getUtilizationStatus = (utilization) => {
    if (utilization >= 90) return 'critical';
    if (utilization >= 75) return 'warning';
    return 'normal';
  };

  return (
    <div className="room-management-container">
      <div className="room-header">
        <h1><FaBuilding /> Room Management</h1>
        <button className="btn-primary"><FaPlus /> Add Room</button>
      </div>

      <div className="room-stats">
        <div className="stat-box">
          <h3>{rooms.length}</h3>
          <p>Total Rooms</p>
        </div>
        <div className="stat-box">
          <h3>{rooms.filter(r => r.status === 'Available').length}</h3>
          <p>Available</p>
        </div>
        <div className="stat-box">
          <h3>{rooms.filter(r => r.status === 'Occupied').length}</h3>
          <p>Occupied</p>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.map(room => {
          const utilization = getUtilization(room.currentOccupancy, room.capacity);
          const status = getUtilizationStatus(utilization);
          
          return (
            <div key={room.id} className="room-card">
              <div className={`room-status-badge ${room.status.toLowerCase()}`}>
                {room.status}
              </div>
              <h3>{room.name}</h3>
              <p className="room-id">{room.id}</p>
              
              <div className="room-details">
                <div className="detail-row">
                  <span><FaBuilding /> Building:</span>
                  <span>{room.building}</span>
                </div>
                <div className="detail-row">
                  <span><FaMapMarkerAlt /> Floor:</span>
                  <span>{room.floor}</span>
                </div>
                <div className="detail-row">
                  <span><FaChair /> Type:</span>
                  <span>{room.type}</span>
                </div>
                <div className="detail-row">
                  <span><FaUsers /> Capacity:</span>
                  <span>{room.capacity}</span>
                </div>
              </div>

              <div className="capacity-section">
                <div className="capacity-header">
                  <span>Capacity Utilization</span>
                  <span className={`utilization-percent ${status}`}>
                    {utilization}%
                  </span>
                </div>
                <div className="capacity-progress">
                  <div 
                    className={`capacity-bar ${status}`}
                    style={{width: `${utilization}%`}}
                  ></div>
                </div>
                <div className="capacity-numbers">
                  {room.currentOccupancy} / {room.capacity} students
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomManagement;
