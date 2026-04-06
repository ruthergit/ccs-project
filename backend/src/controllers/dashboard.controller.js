import pool from "../config/db.js";

export const getDashboardStats = async (_req, res) => {
  try {
    // 1. Basic Counts - Using the simplest possible SQL syntax
    const [sRows] = await pool.query("SELECT COUNT(*) AS total FROM students");
    const [fRows] = await pool.query("SELECT COUNT(*) AS total FROM faculty");
    const [eRows] = await pool.query("SELECT COUNT(*) AS total FROM events WHERE status = ?", ["Upcoming"]);
    const [cRows] = await pool.query("SELECT COUNT(*) AS total FROM schedules");

    // 2. Top Skill Logic
    const [skillRows] = await pool.query('SELECT skills FROM students WHERE skills IS NOT NULL AND skills != ""');
    const allSkills = skillRows.flatMap((r) => r.skills.split(",").map((s) => s.trim()).filter(Boolean));
    const skillCount = allSkills.reduce((a, s) => { a[s] = (a[s] || 0) + 1; return a; }, {});
    const topSkill = Object.entries(skillCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    // 3. Recent Students
    const [recentStudents] = await pool.query(
      "SELECT first_name, last_name, program, year_level, skills FROM students ORDER BY id DESC LIMIT 3"
    );

    // 4. Top Researchers - Simplified to avoid GROUP BY strict mode errors
    const [topResearchers] = await pool.query(
      `SELECT r.title, r.evaluation_score 
       FROM research r 
       ORDER BY r.evaluation_score DESC LIMIT 3`
    );

    // 5. Final Response Construction
    res.json({
      totalStudents:  sRows[0]?.total || 0,
      totalFaculty:   fRows[0]?.total || 0,
      upcomingEvents: eRows[0]?.total || 0,
      totalSchedules: cRows[0]?.total || 0,
      topSkill,
      recentStudents: recentStudents.map((s) => ({
        name: `${s.first_name} ${s.last_name}`,
        program: s.program,
        year: s.year_level,
        skills: s.skills ? s.skills.split(",").map((x) => x.trim()) : [],
      })),
      topResearchers: topResearchers.map((r, i) => ({
        rank: i + 1,
        title: r.title,
        score: r.evaluation_score,
        authors: [], // Temporarily empty to stop the JOIN from crashing the 500 error
      })),
    });
  } catch (err) {
    // This will now show the EXACT error in Render logs
    console.error("Dashboard Controller Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};