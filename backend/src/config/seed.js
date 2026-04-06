import pool from "./db.js";

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log("🏗️  Initializing Database Schema...");

    // 1. Create Students Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) UNIQUE,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        middle_name VARCHAR(100),
        age INT,
        gender VARCHAR(20),
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        program VARCHAR(50),
        year_level VARCHAR(20),
        section VARCHAR(10),
        skills TEXT,
        activities TEXT,
        affiliations TEXT,
        violations TEXT,
        added_date DATE
      )
    `);

    // 2. Create Faculty Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id VARCHAR(50) UNIQUE,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        title VARCHAR(20),
        department VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        specialization TEXT,
        employment_status VARCHAR(50),
        min_load INT,
        max_load INT,
        current_load INT
      )
    `);

    // 3. Create Subjects Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(20) UNIQUE,
        title VARCHAR(255),
        type VARCHAR(50),
        hours INT,
        units INT
      )
    `);

    // 4. Create Rooms Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        room_id VARCHAR(20) UNIQUE,
        name VARCHAR(100),
        type VARCHAR(50),
        building VARCHAR(100),
        floor VARCHAR(50),
        capacity INT,
        current_occupancy INT,
        status VARCHAR(50)
      )
    `);

    // 5. Create Research Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS research (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        program VARCHAR(50),
        year_published INT,
        category VARCHAR(50),
        evaluation_score DECIMAL(5,2)
      )
    `);

    // 6. Create Research Authors Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS research_authors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        research_id INT,
        author_name VARCHAR(255),
        author_type VARCHAR(50)
      )
    `);

    // 7. Create Events Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        type VARCHAR(50),
        date DATE,
        time VARCHAR(50),
        venue VARCHAR(255),
        faculty VARCHAR(255),
        participants INT,
        status VARCHAR(50)
      )
    `);

    // 8. Create Materials Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS materials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject VARCHAR(255),
        faculty VARCHAR(255),
        type VARCHAR(100),
        title VARCHAR(255),
        upload_date DATE
      )
    `);

    // 9. Create Users Table (Crucial for admin login!)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role ENUM('admin', 'faculty', 'student') DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT,
        room_id VARCHAR(20),
        day VARCHAR(20),
        time_start TIME,
        time_end TIME
      )
    `);

    console.log("🌱 Tables ready. Inserting seed data...");

    // --- DATA INSERTION ---

    await conn.query(`
      INSERT IGNORE INTO students 
        (student_id,first_name,last_name,middle_name,age,gender,email,phone,address,program,year_level,section,skills,activities,affiliations,violations,added_date)
      VALUES 
        ('STU-2026-001','Juan','Dela Cruz','Santos',20,'Male','juan.delacruz@ccs.edu','09123456789','123 Main St, Manila','BSIT','3rd Year','A','Programming,Web Development','Hackathon Club','ICTSO','','2026-01-10'),
        ('STU-2026-005','Miguel','Torres','Ramos',22,'Male','miguel.torres@ccs.edu','09456789012','654 Maple Dr, Iloilo','BSIT','4th Year','B','Mobile Development','Sports Club','Basketball Varsity','Tardiness','2026-02-10')
    `);

    await conn.query(`
      INSERT IGNORE INTO faculty 
        (employee_id,first_name,last_name,title,department,email,phone,specialization,employment_status,min_load,max_load,current_load)
      VALUES 
        ('FAC-2026-001','Maria','Santos','Dr.','Information Technology','m.santos@ccs.edu','09187654321','Data Science & AI','Full-time',15,21,18)
    `);

    await conn.query(`
      INSERT IGNORE INTO subjects (code,title,type,hours,units) VALUES 
        ('IT301','Data Structures','LECTURE',2,2),
        ('CS401','Software Engineering','PURE_LECTURE',3,3)
    `);

    await conn.query(`
      INSERT IGNORE INTO rooms (room_id,name,type,building,floor,capacity,current_occupancy,status) VALUES 
        ('LR-201','Lecture Room 201','LECTURE_ROOM','CCS Building','2nd Floor',40,35,'Occupied'),
        ('LAB-101','Computer Laboratory 1','LABORATORY_ROOM','CCS Building','1st Floor',30,28,'Occupied')
    `);

    await conn.query(`
      INSERT IGNORE INTO research (title,program,year_published,category,evaluation_score) VALUES 
        ('AI in Education Systems','BSIT',2025,'Published',95.5)
    `);

    await conn.query(`
      INSERT IGNORE INTO events (title,type,date,time,venue,faculty,participants,status) VALUES 
        ('Tech Summit 2026','Seminar','2026-03-15','09:00 AM','CCS Auditorium','Dr. Maria Santos',150,'Upcoming')
    `);

    console.log("✅ Seed complete! Your database is ready for the demo.");
  } catch (err) {
    console.error("❌ Database Initialization Error:", err.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
