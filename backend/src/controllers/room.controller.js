import pool from '../config/db.js';

export const getRooms = async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Room not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { room_id, name, type, building = '', floor = '', capacity, current_occupancy = 0, status = 'Available' } = req.body;
    if (!room_id || !name || !type || !capacity) return res.status(400).json({ message: 'Missing required fields' });

    const [result] = await pool.query(
      'INSERT INTO rooms (room_id,name,type,building,floor,capacity,current_occupancy,status) VALUES (?,?,?,?,?,?,?,?)',
      [room_id, name, type, building, floor, capacity, current_occupancy, status]
    );
    const [rows] = await pool.query('SELECT * FROM rooms WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Room ID already exists' });
    res.status(500).json({ message: err.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { name, type, building, floor, capacity, current_occupancy, status } = req.body;
    await pool.query(
      'UPDATE rooms SET name=?,type=?,building=?,floor=?,capacity=?,current_occupancy=?,status=? WHERE id=?',
      [name, type, building, floor, capacity, current_occupancy, status, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Room not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM rooms WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
