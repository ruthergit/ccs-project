const BASE = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('ccs_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  // Session expired
  if (res.status === 401) {
    localStorage.removeItem('ccs_token');
    localStorage.removeItem('ccs_user');
    window.location.reload();
    throw new Error('Session expired. Please log in again.');
  }

  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const api = {
  getDashboard:    ()            => request('/dashboard'),
  getStudents:     (p = {})      => request('/students?' + new URLSearchParams(p)),
  getStudentStats: ()            => request('/students/stats'),
  createStudent:   (b)           => request('/students',       { method:'POST',   body: JSON.stringify(b) }),
  updateStudent:   (id, b)       => request(`/students/${id}`, { method:'PUT',    body: JSON.stringify(b) }),
  deleteStudent:   (id)          => request(`/students/${id}`, { method:'DELETE' }),
  getFaculty:      ()            => request('/faculty'),
  createFaculty:   (b)           => request('/faculty',        { method:'POST',   body: JSON.stringify(b) }),
  updateFaculty:   (id, b)       => request(`/faculty/${id}`,  { method:'PUT',    body: JSON.stringify(b) }),
  deleteFaculty:   (id)          => request(`/faculty/${id}`,  { method:'DELETE' }),
  getEvents:       ()            => request('/events'),
  createEvent:     (b)           => request('/events',         { method:'POST',   body: JSON.stringify(b) }),
  updateEvent:     (id, b)       => request(`/events/${id}`,   { method:'PUT',    body: JSON.stringify(b) }),
  deleteEvent:     (id)          => request(`/events/${id}`,   { method:'DELETE' }),
  getResearch:     (p = {})      => request('/research?' + new URLSearchParams(p)),
  createResearch:  (b)           => request('/research',       { method:'POST',   body: JSON.stringify(b) }),
  deleteResearch:  (id)          => request(`/research/${id}`, { method:'DELETE' }),
  getRooms:        ()            => request('/rooms'),
  createRoom:      (b)           => request('/rooms',          { method:'POST',   body: JSON.stringify(b) }),
  updateRoom:      (id, b)       => request(`/rooms/${id}`,    { method:'PUT',    body: JSON.stringify(b) }),
  deleteRoom:      (id)          => request(`/rooms/${id}`,    { method:'DELETE' }),
  getMaterials:    ()            => request('/materials'),
  createMaterial:  (b)           => request('/materials',      { method:'POST',   body: JSON.stringify(b) }),
  deleteMaterial:  (id)          => request(`/materials/${id}`,{ method:'DELETE' }),
};
