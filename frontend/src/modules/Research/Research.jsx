import React, { useState } from 'react';
import './Research.css';
import { FaFlask, FaPlus, FaUsers, FaBook, FaCalendarAlt, FaFolder } from 'react-icons/fa';

const Research = () => {
  const [researches] = useState([
    {
      id: 1,
      title: 'AI in Education Systems',
      authors: ['Dr. Maria Santos', 'Prof. John Reyes'],
      program: 'BSIT',
      year: 2025,
      category: 'Published',
      score: 95.5,
      rank: 1
    },
    {
      id: 2,
      title: 'Machine Learning Applications in Healthcare',
      authors: ['Prof. John Reyes', 'Dr. Ana Cruz'],
      program: 'BSCS',
      year: 2025,
      category: 'Published',
      score: 92.3,
      rank: 2
    },
    {
      id: 3,
      title: 'Blockchain Technology for Secure Transactions',
      authors: ['Dr. Ana Cruz'],
      program: 'BSIT',
      year: 2025,
      category: 'Published',
      score: 89.7,
      rank: 3
    },
    {
      id: 4,
      title: 'IoT Solutions for Smart Cities',
      authors: ['Prof. Mark Lee', 'Student: Juan Dela Cruz'],
      program: 'BSIT',
      year: 2024,
      category: 'Published',
      score: 88.5,
      rank: 1
    }
  ]);

  const [filter, setFilter] = useState({ year: 'all', program: 'all' });

  const filteredResearches = researches.filter(r => {
    if (filter.year !== 'all' && r.year !== parseInt(filter.year)) return false;
    if (filter.program !== 'all' && r.program !== filter.program) return false;
    return true;
  });

  return (
    <div className="research-container">
      <div className="research-header">
        <h1><FaFlask /> College Research Module</h1>
        <button className="btn-primary"><FaPlus /> Add Research</button>
      </div>

      <div className="research-filters">
        <select value={filter.year} onChange={e => setFilter({...filter, year: e.target.value})}>
          <option value="all">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <select value={filter.program} onChange={e => setFilter({...filter, program: e.target.value})}>
          <option value="all">All Programs</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
        </select>
      </div>

      <div className="research-grid">
        {filteredResearches.map(research => (
          <div key={research.id} className="research-card">
            <div className="research-rank">#{research.rank}</div>
            <h3>{research.title}</h3>
            <div className="research-meta">
              <span className="meta-item"><FaUsers /> {research.authors.join(', ')}</span>
              <span className="meta-item"><FaBook /> {research.program}</span>
              <span className="meta-item"><FaCalendarAlt /> {research.year}</span>
              <span className="meta-item"><FaFolder /> {research.category}</span>
            </div>
            <div className="research-score-section">
              <span>Evaluation Score:</span>
              <span className="score-value">{research.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Research;
