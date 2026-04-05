import pool from '../config/db.js';

export const getMaterials = async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM materials ORDER BY upload_date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const { subject, faculty = '', type, title } = req.body;
    if (!subject || !type || !title) return res.status(400).json({ message: 'Missing required fields' });

    const [result] = await pool.query(
      'INSERT INTO materials (subject,faculty,type,title,upload_date) VALUES (?,?,?,?,CURDATE())',
      [subject, faculty, type, title]
    );
    const [rows] = await pool.query('SELECT * FROM materials WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM materials WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Material not found' });
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
