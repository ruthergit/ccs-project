import React, { useState } from 'react';
import './StudentProfile.css';
import { FaClipboardList, FaGraduationCap, FaTrophy, FaFileAlt, FaAward, FaPaperclip, FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';

const StudentProfile = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [searchTerm, setSearchTerm] = useState('');

  const [students, setStudents] = useState([
    {
      id: 'STU-2026-001',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      middleName: 'Santos',
      program: 'BSIT',
      yearLevel: '3rd Year',
      section: 'A',
      email: 'juan.delacruz@ccs.edu',
      phone: '09123456789',
      address: '123 Main St, City',
      enrolledUnits: 21
    },
    {
      id: 'STU-2026-002',
      firstName: 'Maria',
      lastName: 'Santos',
      middleName: 'Garcia',
      program: 'BSCS',
      yearLevel: '2nd Year',
      section: 'B',
      email: 'maria.santos@ccs.edu',
      phone: '09187654321',
      address: '456 Oak Ave, City',
      enrolledUnits: 18
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    program: 'BSIT',
    yearLevel: '1st Year',
    section: 'A',
    email: '',
    phone: '',
    address: ''
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      program: 'BSIT',
      yearLevel: '1st Year',
      section: 'A',
      email: '',
      phone: '',
      address: ''
    });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setModalMode('edit');
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
      if (selectedStudent?.id === id) {
        setViewMode('list');
      }
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewMode('detail');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newStudent = {
        ...formData,
        id: `STU-2026-${String(students.length + 1).padStart(3, '0')}`,
        enrolledUnits: 0
      };
      setStudents([...students, newStudent]);
    } else {
      setStudents(students.map(s => s.id === formData.id ? formData : s));
      if (selectedStudent?.id === formData.id) {
        setSelectedStudent(formData);
      }
    }
    setShowModal(false);
  };

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (viewMode === 'detail' && selectedStudent) {
    return (
      <div className="student-profile-container">
        <div className="profile-actions">
          <button className="btn-back" onClick={() => setViewMode('list')}>
            ← Back to List
          </button>
          <div className="action-buttons">
            <button className="btn-edit-action" onClick={() => handleEdit(selectedStudent)}>
              <FaEdit /> Edit
            </button>
            <button className="btn-delete-action" onClick={() => handleDelete(selectedStudent.id)}>
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">{selectedStudent.firstName[0]}{selectedStudent.lastName[0]}</div>
          </div>
          <div className="profile-title">
            <h1>{selectedStudent.firstName} {selectedStudent.lastName}</h1>
            <p>{selectedStudent.id} • {selectedStudent.program} - {selectedStudent.yearLevel}</p>
          </div>
        </div>

        <div className="profile-sections">
          <div className="section-card">
            <h3><FaClipboardList /> Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name:</label>
                <span>{selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{selectedStudent.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{selectedStudent.phone}</span>
              </div>
              <div className="info-item">
                <label>Address:</label>
                <span>{selectedStudent.address}</span>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3><FaGraduationCap /> Academic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Program:</label>
                <span>{selectedStudent.program}</span>
              </div>
              <div className="info-item">
                <label>Year Level:</label>
                <span>{selectedStudent.yearLevel}</span>
              </div>
              <div className="info-item">
                <label>Section:</label>
                <span>{selectedStudent.section}</span>
              </div>
              <div className="info-item">
                <label>Total Enrolled Units:</label>
                <span className="units-badge">{selectedStudent.enrolledUnits} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-profile-container">
      <div className="list-header">
        <h1>Student Management</h1>
        <button className="btn-primary" onClick={handleCreate}>
          <FaPlus /> Add Student
        </button>
      </div>

      <div className="search-filter-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, ID, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="students-grid">
        {filteredStudents.map(student => (
          <div key={student.id} className="student-card">
            <div className="student-card-header">
              <div className="student-avatar-small">
                {student.firstName[0]}{student.lastName[0]}
              </div>
              <div className="student-info">
                <h3>{student.firstName} {student.lastName}</h3>
                <p>{student.id}</p>
              </div>
            </div>
            <div className="student-card-body">
              <div className="info-row">
                <span className="label">Program:</span>
                <span className="value">{student.program}</span>
              </div>
              <div className="info-row">
                <span className="label">Year & Section:</span>
                <span className="value">{student.yearLevel} - {student.section}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{student.email}</span>
              </div>
            </div>
            <div className="student-card-actions">
              <button className="btn-view" onClick={() => handleView(student)}>
                <FaEye /> View
              </button>
              <button className="btn-edit-small" onClick={() => handleEdit(student)}>
                <FaEdit />
              </button>
              <button className="btn-delete-small" onClick={() => handleDelete(student.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{modalMode === 'create' ? 'Add New Student' : 'Edit Student'}</h2>
            <form className="student-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Program *</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    required
                  >
                    <option value="BSIT">BSIT</option>
                    <option value="BSCS">BSCS</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Year Level *</label>
                  <select
                    value={formData.yearLevel}
                    onChange={(e) => setFormData({...formData, yearLevel: e.target.value})}
                    required
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Section *</label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {modalMode === 'create' ? 'Create Student' : 'Update Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
