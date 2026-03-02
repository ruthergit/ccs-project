import React, { useState } from 'react';
import './Instructional.css';
import { FaBook, FaPlus, FaFileAlt, FaEdit, FaBookOpen, FaLink } from 'react-icons/fa';

const Instructional = () => {
  const [materials] = useState([
    {
      id: 1,
      subject: 'IT301 - Data Structures',
      faculty: 'Dr. Maria Santos',
      type: 'Syllabus',
      title: 'Data Structures Syllabus 2026',
      uploadDate: '2026-01-15'
    },
    {
      id: 2,
      subject: 'IT301 - Data Structures',
      faculty: 'Dr. Maria Santos',
      type: 'Lesson Plan',
      title: 'Week 1-5 Lesson Plans',
      uploadDate: '2026-01-20'
    },
    {
      id: 3,
      subject: 'IT401 - Machine Learning',
      faculty: 'Dr. Maria Santos',
      type: 'Course Material',
      title: 'Introduction to Neural Networks',
      uploadDate: '2026-02-01'
    }
  ]);

  const [mapping] = useState([
    { subject: 'IT301', code: 'Data Structures', faculty: 'Dr. Maria Santos', section: '3A' },
    { subject: 'IT302', code: 'Web Development', faculty: 'Prof. John Reyes', section: '3B' },
    { subject: 'IT401', code: 'Machine Learning', faculty: 'Dr. Maria Santos', section: '4A' }
  ]);

  return (
    <div className="instructional-container">
      <h1><FaBook /> Instructional Management</h1>

      <div className="instructional-sections">
        <div className="section-card">
          <h3><FaBookOpen /> Course Materials</h3>
          <button className="btn-primary"><FaPlus /> Upload Material</button>
          <div className="materials-list">
            {materials.map(material => (
              <div key={material.id} className="material-item">
                <div className="material-icon">
                  {material.type === 'Syllabus' && <FaFileAlt size={32} />}
                  {material.type === 'Lesson Plan' && <FaEdit size={32} />}
                  {material.type === 'Course Material' && <FaBookOpen size={32} />}
                </div>
                <div className="material-info">
                  <strong>{material.title}</strong>
                  <p>{material.subject}</p>
                  <small>{material.faculty} • {material.uploadDate}</small>
                </div>
                <span className={`material-type ${material.type.toLowerCase().replace(' ', '-')}`}>
                  {material.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3><FaLink /> Subject-to-Faculty Mapping</h3>
          <table className="mapping-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Faculty</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {mapping.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.code}</td>
                  <td>{item.faculty}</td>
                  <td>{item.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Instructional;
