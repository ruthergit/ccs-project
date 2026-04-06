import pool from "../config/db.js";

export const getDashboardStats = async (_req, res) => {
  try {
    // 1. Basic Counts - REMOVED the status filter to test connectivity
    const [sRows] = await pool.query("SELECT COUNT(*) AS total FROM students");
    const [fRows] = await pool.query("SELECT COUNT(*) AS total FROM faculty");
    const [eRows] = await pool.query("SELECT COUNT(*) AS total FROM events"); // No WHERE clause
    const [cRows] = await pool.query("SELECT COUNT(*) AS total FROM schedules");

    // 2. Top Skill Logic - Added extra null checks
    const [skillRows] = await pool.query('SELECT skills FROM students WHERE skills IS NOT NULL');
    const allSkills = (skillRows || []).flatMap((r) => 
      (r.skills || "").split(",").map((s) => s.trim()).filter(Boolean)
    );
    const skillCount = allSkills.reduce((a, s) => { a[s] = (a[s] || 0) + 1; return a; }, {});
    const topSkill = Object.entries(skillCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    // 3. Recent Students
    const [recentStudents] = await pool.query(
      "SELECT first_name, last_name, program, year_level, skills FROM students LIMIT 3"
    );

    // 4. Top Researchers - Minimal query
    const [topResearchers] = await pool.query(
      "SELECT title, evaluation_score FROM research ORDER BY evaluation_score DESC LIMIT 3"
    );

    res.json({
      totalStudents:  sRows[0]?.total || 0,
      totalFaculty:   fRows[0]?.total || 0,
      upcomingEvents: eRows[0]?.total || 0, 
      totalSchedules: cRows[0]?.total || 0,
      topSkill,
      recentStudents: (recentStudents || []).map((s) => ({
        name: `${s.first_name || ''} ${s.last_name || ''}`,
        program: s.program || 'N/A',
        year: s.year_level || 'N/A',
        skills: s.skills ? s.skills.split(",").map((x) => x.trim()) : [],
      })),
      topResearchers: (topResearchers || []).map((r, i) => ({
        rank: i + 1,
        title: r.title || 'Untitled',
        score: r.evaluation_score || 0,
        authors: [],
      })),
    });
  } catch (err) {
    // This is the most important part for us right now
    console.error("DEBUG ERROR:", err.message);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};