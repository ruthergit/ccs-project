import React, { useState } from 'react';
import './FacultyProfile.css';
import { FaUser, FaGraduationCap, FaChartBar, FaFlask, FaCertificate, FaCheckCircle, FaExclamationTriangle, FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';

const FacultyProfile = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [searchTerm, setSearchTerm] = useState('');

  const [facultyList, setFacultyList] = useState([
    {
      id: 'FAC-2026-001',
      firstName: 'Maria',
      lastName: 'Santos',
      title: 'Dr.',
      department: 'Information Technology',
      email: 'maria.santos@ccs.edu',
      phone: '09187654321',
      specialization: 'Data Science & AI',
      employmentStatus: 'Full-time',
      maxLoad: 21,
      minLoad: 15,
      currentLoad: 8
    },
    {
      id: 'FAC-2026-002',
      firstName: 'John',
      lastName: 'Reyes',
      title: 'Prof.',
      department: 'Computer Science',
      email: 'john.reyes@ccs.edu',
      phone: '09198765432',
      specialization: 'Software Engineering',
      employmentStatus: 'Full-time',
      maxLoad: 21,
      minLoad: 15,
      currentLoad: 18
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: 'Prof.',
    department: 'Information Technology',
    email: '',
    phone: '',
    specialization: '',
    employmentStatus: 'Full-time',
    maxLoad: 21,
    minLoad: 15
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      firstName: '',
      lastName: '',
      title: 'Prof.',
      department: 'Information Technology',
      email: '',
      phone: '',
      specialization: '',
      employmentStatus: 'Full-time',
      maxLoad: 21,
      minLoad: 15
    });
    setShowModal(true);
  };

  const handleEdit = (faculty) => {
    setModalMode('edit');
    setFormData(faculty);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      setFacultyList(facultyList.filter(f => f.id !== id));
      if (selectedFaculty?.id === id) {
        setViewMode('list');
      }
    }
  };

  const handleView = (faculty) => {
    setSelectedFaculty(faculty);
    setViewMode('detail');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newFaculty = {
        ...formData,
        id: `FAC-2026-${String(facultyList.length + 1).padStart(3, '0')}`,
        currentLoad: 0
      };
      setFacultyList([...facultyList, newFaculty]);
    } else {
      setFacultyList(facultyList.map(f => f.id === formData.id ? formData : f));
      if (selectedFaculty?.id === formData.id) {
        setSelectedFaculty(formData);
      }
    }
    setShowModal(false);
  };

  const filteredFaculty = facultyList.filter(faculty =>
    faculty.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLoadStatus = (currentLoad, minLoad, maxLoad) => {
    if (currentLoad > maxLoad) return 'overload';
    if (currentLoad < minLoad) return 'underload';
    return 'normal';
  };

  if (viewMode === 'detail' && selectedFaculty) {
    const loadStatus = getLoadStatus(selectedFaculty.currentLoad, selectedFaculty.minLoad, selectedFaculty.maxLoad);

    return (
      <div className="faculty-profile-container">
        <div className="profile-actions">
          <button className="btn-back" onClick={() => setViewMode('list')}>
            ← Back to List
          </button>
          <div className="action-buttons">
            <button className="btn-edit-action" onClick={() => handleEdit(selectedFaculty)}>
              <FaEdit /> Edit
            </button>
            <button className="btn-delete-action" onClick={() => handleDelete(selectedFaculty.id)}>
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="profile-header faculty-header">
          <div className="profile-avatar">
            <div className="avatar-circle">{selectedFaculty.firstName[0]}{selectedFaculty.lastName[0]}</div>
          </div>
          <div className="profile-title">
            <h1>{selectedFaculty.title} {selectedFaculty.firstName} {selectedFaculty.lastName}</h1>
            <p>{selectedFaculty.id} • {selectedFaculty.department}</p>
            <p>{selectedFaculty.specialization}</p>
          </div>
          <div className="load-indicator">
            <div className={`load-badge ${loadStatus}`}>
              {loadStatus === 'overload' && <><FaExclamationTriangle /> Overload</>}
              {loadStatus === 'underload' && <><FaExclamationTriangle /> Underload</>}
              {loadStatus === 'normal' && <><FaCheckCircle /> Normal Load</>}
            </div>
            <div className="load-stats">
              <span>{selectedFaculty.currentLoad} / {selectedFaculty.maxLoad} units</span>
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <div className="section-card">
            <h3><FaUser /> Professional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email:</label>
                <span>{selectedFaculty.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{selectedFaculty.phone}</span>
              </div>
              <div className="info-item">
                <label>Employment Status:</label>
                <span>{selectedFaculty.employmentStatus}</span>
              </div>
              <div className="info-item">
                <label>Specialization:</label>
                <span>{selectedFaculty.specialization}</span>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3><FaChartBar /> Teaching Load Overview</h3>
            <div className="load-summary">
              <div className="summary-item">
                <span className="summary-label">Current Load:</span>
                <span className="summary-value">{selectedFaculty.currentLoad} units</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Min Load:</span>
                <span className="summary-value">{selectedFaculty.minLoad} units</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Max Load:</span>
                <span className="summary-value">{selectedFaculty.maxLoad} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="faculty-profile-container">
      <div className="list-header">
        <h1>Faculty Management</h1>
        <button className="btn-primary" onClick={handleCreate}>
          <FaPlus /> Add Faculty
        </button>
      </div>

      <div className="search-filter-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="faculty-grid">
        {filteredFaculty.map(faculty => {
          const loadStatus = getLoadStatus(faculty.currentLoad, faculty.minLoad, faculty.maxLoad);
          return (
            <div key={faculty.id} className="faculty-card">
              <div className="faculty-card-header">
                <div className="faculty-avatar-small">
                  {faculty.firstName[0]}{faculty.lastName[0]}
                </div>
                <div className="faculty-info">
                  <h3>{faculty.title} {faculty.firstName} {faculty.lastName}</h3>
                  <p>{faculty.id}</p>
                </div>
                <div className={`load-badge-small ${loadStatus}`}>
                  {loadStatus === 'overload' && '⚠️'}
                  {loadStatus === 'underload' && '⚠️'}
                  {loadStatus === 'normal' && '✓'}
                </div>
              </div>
              <div className="faculty-card-body">
                <div className="info-row">
                  <span className="label">Department:</span>
                  <span className="value">{faculty.department}</span>
                </div>
                <div className="info-row">
                  <span className="label">Specialization:</span>
                  <span className="value">{faculty.specialization}</span>
                </div>
                <div className="info-row">
                  <span className="label">Load:</span>
                  <span className="value">{faculty.currentLoad}/{faculty.maxLoad} units</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{faculty.email}</span>
                </div>
              </div>
              <div className="faculty-card-actions">
                <button className="btn-view" onClick={() => handleView(faculty)}>
                  <FaEye /> View
                </button>
                <button className="btn-edit-small" onClick={() => handleEdit(faculty)}>
                  <FaEdit />
                </button>
                <button className="btn-delete-small" onClick={() => handleDelete(faculty.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{modalMode === 'create' ? 'Add New Faculty' : 'Edit Faculty'}</h2>
            <form className="faculty-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <select
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  >
                    <option value="Prof.">Prof.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
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
                  <label>Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Employment Status *</label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Specialization *</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  required
                />
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
              <div className="form-row">
                <div className="form-group">
                  <label>Min Load (units) *</label>
                  <input
                    type="number"
                    value={formData.minLoad}
                    onChange={(e) => setFormData({...formData, minLoad: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Max Load (units) *</label>
                  <input
                    type="number"
                    value={formData.maxLoad}
                    onChange={(e) => setFormData({...formData, maxLoad: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {modalMode === 'create' ? 'Create Faculty' : 'Update Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;
