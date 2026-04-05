import pool from '../config/db.js';

// Helper: parse comma-separated JSON-like fields
const parseList = (val) => (val ? val.split(',').map(s => s.trim()).filter(Boolean) : []);

const format = (row) => ({
  ...row,
  skills:       parseList(row.skills),
  activities:   parseList(row.activities),
  affiliations: parseList(row.affiliations),
  violations:   parseList(row.violations),
});

export const getStudents = async (req, res) => {
  try {
    const { search, program, yearLevel, skill, gender } = req.query;
    let sql = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (first_name LIKE ? OR last_name LIKE ? OR student_id LIKE ? OR program LIKE ? OR skills LIKE ? OR affiliations LIKE ?)';
      const q = `%${search}%`;
      params.push(q, q, q, q, q, q);
    }
    if (program && program !== 'All') { sql += ' AND program = ?'; params.push(program); }
    if (yearLevel && yearLevel !== 'All') { sql += ' AND year_level = ?'; params.push(yearLevel); }
    if (skill && skill !== 'All Skills') { sql += ' AND FIND_IN_SET(?, skills)'; params.push(skill); }
    if (gender && gender !== 'All') { sql += ' AND gender = ?'; params.push(gender); }

    sql += ' ORDER BY added_date DESC';
    const [rows] = await pool.query(sql, params);
    res.json(rows.map(format));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Student not found' });
    res.json(format(rows[0]));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      student_id, first_name, last_name, middle_name = '',
      age, gender = 'Male', email, phone = '', address = '',
      program, year_level, section,
      skills = [], activities = [], affiliations = [], violations = [],
    } = req.body;

    if (!student_id || !first_name || !last_name || !email || !program || !year_level || !section) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO students
        (student_id,first_name,last_name,middle_name,age,gender,email,phone,address,
         program,year_level,section,skills,activities,affiliations,violations,added_date)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())`,
      [
        student_id, first_name, last_name, middle_name, age, gender, email, phone, address,
        program, year_level, section,
        skills.join(','), activities.join(','), affiliations.join(','), violations.join(','),
      ]
    );
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
    res.status(201).json(format(rows[0]));
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Student ID or email already exists' });
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      first_name, last_name, middle_name, age, gender, email, phone, address,
      program, year_level, section,
      skills = [], activities = [], affiliations = [], violations = [],
    } = req.body;

    await pool.query(
      `UPDATE students SET
        first_name=?,last_name=?,middle_name=?,age=?,gender=?,email=?,phone=?,address=?,
        program=?,year_level=?,section=?,skills=?,activities=?,affiliations=?,violations=?
       WHERE id=?`,
      [
        first_name, last_name, middle_name, age, gender, email, phone, address,
        program, year_level, section,
        skills.join(','), activities.join(','), affiliations.join(','), violations.join(','),
        req.params.id,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Student not found' });
    res.json(format(rows[0]));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentStats = async (_req, res) => {
  try {
    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM students');
    const [skillRows]   = await pool.query('SELECT skills FROM students');
    const allSkills     = skillRows.flatMap(r => parseList(r.skills));
    const skillCount    = allSkills.reduce((a, s) => { a[s] = (a[s]||0)+1; return a; }, {});
    const topSkill      = Object.entries(skillCount).sort((a,b) => b[1]-a[1])[0]?.[0] || '—';
    const categories    = Object.keys(skillCount).length;
    const [recent]      = await pool.query('SELECT first_name, last_name, added_date FROM students ORDER BY added_date DESC LIMIT 3');
    res.json({ total, topSkill, skillCategories: categories, recentStudents: recent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
