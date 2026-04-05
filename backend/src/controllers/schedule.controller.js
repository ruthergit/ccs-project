import pool from '../config/db.js';

export const getSchedules = async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.*, 
        sub.code AS subject_code, sub.title AS subject_title, sub.type AS subject_type,
        sub.hours, sub.units,
        f.first_name AS faculty_first, f.last_name AS faculty_last,
        r.room_id AS room_code, r.name AS room_name, r.type AS room_type,
        r.capacity,
        (SELECT COUNT(*) FROM enrollments e WHERE e.schedule_id = s.id) AS enrolled
      FROM schedules s
      JOIN subjects sub ON s.subject_id = sub.id
      JOIN faculty  f   ON s.faculty_id  = f.id
      JOIN rooms    r   ON s.room_id     = r.id
      ORDER BY s.day, s.start_time
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const { subject_id, faculty_id, room_id, section, day, start_time, end_time } = req.body;
    if (!subject_id || !faculty_id || !room_id || !section || !day || !start_time || !end_time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const [result] = await pool.query(
      'INSERT INTO schedules (subject_id,faculty_id,room_id,section,day,start_time,end_time) VALUES (?,?,?,?,?,?,?)',
      [subject_id, faculty_id, room_id, section, day, start_time, end_time]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM schedules WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
