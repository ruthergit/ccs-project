import pool from '../config/db.js';

export const getFaculty = async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM faculty ORDER BY last_name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM faculty WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Faculty not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFaculty = async (req, res) => {
  try {
    const {
      employee_id, first_name, last_name, title = 'Prof.',
      department, email, phone = '', specialization = '',
      employment_status = 'Full-time', min_load = 15, max_load = 21, current_load = 0,
    } = req.body;

    if (!employee_id || !first_name || !last_name || !department || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO faculty
        (employee_id,first_name,last_name,title,department,email,phone,specialization,employment_status,min_load,max_load,current_load)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [employee_id, first_name, last_name, title, department, email, phone, specialization, employment_status, min_load, max_load, current_load]
    );
    const [rows] = await pool.query('SELECT * FROM faculty WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Employee ID or email already exists' });
    res.status(500).json({ message: err.message });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const {
      first_name, last_name, title, department, email, phone,
      specialization, employment_status, min_load, max_load, current_load,
    } = req.body;

    await pool.query(
      `UPDATE faculty SET
        first_name=?,last_name=?,title=?,department=?,email=?,phone=?,
        specialization=?,employment_status=?,min_load=?,max_load=?,current_load=?
       WHERE id=?`,
      [first_name, last_name, title, department, email, phone, specialization, employment_status, min_load, max_load, current_load, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM faculty WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Faculty not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM faculty WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Faculty not found' });
    res.json({ message: 'Faculty deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
