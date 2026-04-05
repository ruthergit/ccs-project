import pool from '../config/db.js';

export const getEvents = async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY date ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, type, date, time = '', venue = '', faculty = '', participants = 0, status = 'Upcoming' } = req.body;
    if (!title || !type || !date) return res.status(400).json({ message: 'Missing required fields' });

    const [result] = await pool.query(
      'INSERT INTO events (title,type,date,time,venue,faculty,participants,status) VALUES (?,?,?,?,?,?,?,?)',
      [title, type, date, time, venue, faculty, participants, status]
    );
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, type, date, time, venue, faculty, participants, status } = req.body;
    await pool.query(
      'UPDATE events SET title=?,type=?,date=?,time=?,venue=?,faculty=?,participants=?,status=? WHERE id=?',
      [title, type, date, time, venue, faculty, participants, status, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
