import pool from "../config/db.js";

export const getDashboardStats = async (_req, res) => {
  try {
    const [totalStudents] = await pool.query(
      "SELECT COUNT(*) AS totalStudents FROM students",
    );
    const [totalFaculty] = await pool.query(
      "SELECT COUNT(*) AS totalFaculty  FROM faculty",
    );
    const [upcomingEventsRows] = await pool.query(
      "SELECT COUNT(*) AS total FROM events WHERE status = ?",
      ["Upcoming"],
    );
    const upcomingEvents = upcomingEventsRows[0]?.total || 0;
    const [totalSchedules] = await pool.query(
      "SELECT COUNT(*) AS totalSchedules FROM schedules",
    );

    // top skill
    const [skillRows] = await pool.query(
      'SELECT skills FROM students WHERE skills IS NOT NULL AND skills != ""',
    );
    const allSkills = skillRows.flatMap((r) =>
      r.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
    const skillCount = allSkills.reduce((a, s) => {
      a[s] = (a[s] || 0) + 1;
      return a;
    }, {});
    const topSkill =
      Object.entries(skillCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    // recent students
    const [recentStudents] = await pool.query(
      "SELECT first_name, last_name, program, year_level, skills FROM students ORDER BY added_date DESC LIMIT 3",
    );

    // top researchers
    const [topResearchers] = await pool.query(
      "SELECT r.title, r.evaluation_score, GROUP_CONCAT(a.author_name) AS authors FROM research r LEFT JOIN research_authors a ON a.research_id = r.id GROUP BY r.id ORDER BY r.evaluation_score DESC LIMIT 3",
    );

    res.json({
      // We use [0] because query returns an array, and the first element is our row
      totalStudents: totalStudents[0]?.totalStudents || 0,
      totalFaculty: totalFaculty[0]?.totalFaculty || 0,
      upcomingEvents: upcomingEvents[0]?.upcomingEvents || 0,
      totalSchedules: totalSchedules[0]?.totalSchedules || 0,
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
        authors: r.authors ? r.authors.split(",") : [],
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
