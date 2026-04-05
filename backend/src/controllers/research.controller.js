import pool from '../config/db.js';

export const getResearch = async (req, res) => {
  try {
    const { year, program } = req.query;
    let sql = 'SELECT * FROM research WHERE 1=1';
    const params = [];
    if (year    && year    !== 'all') { sql += ' AND year_published = ?'; params.push(year); }
    if (program && program !== 'all') { sql += ' AND program = ?'; params.push(program); }
    sql += ' ORDER BY evaluation_score DESC';

    const [rows] = await pool.query(sql, params);

    // attach authors
    const ids = rows.map(r => r.id);
    let authors = [];
    if (ids.length) {
      const [aRows] = await pool.query('SELECT * FROM research_authors WHERE research_id IN (?)', [ids]);
      authors = aRows;
    }

    const result = rows.map((r, i) => ({
      ...r,
      rank: i + 1,
      authors: authors.filter(a => a.research_id === r.id).map(a => a.author_name),
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createResearch = async (req, res) => {
  try {
    const { title, program, year_published, category, evaluation_score = 0, authors = [] } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });

    const [result] = await pool.query(
      'INSERT INTO research (title,program,year_published,category,evaluation_score) VALUES (?,?,?,?,?)',
      [title, program, year_published, category, evaluation_score]
    );
    const rid = result.insertId;

    if (authors.length) {
      const vals = authors.map(a => [rid, a.name || a, a.type || 'faculty']);
      await pool.query('INSERT INTO research_authors (research_id,author_name,author_type) VALUES ?', [vals]);
    }

    const [rows] = await pool.query('SELECT * FROM research WHERE id = ?', [rid]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteResearch = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM research WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Research not found' });
    res.json({ message: 'Research deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
