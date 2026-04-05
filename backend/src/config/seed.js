import pool from './db.js';

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log('🌱 Seeding database...');

    // Students
    await conn.query(`
      INSERT IGNORE INTO students
        (student_id,first_name,last_name,middle_name,age,gender,email,phone,address,program,year_level,section,skills,activities,affiliations,violations,added_date)
      VALUES
        ('STU-2026-001','Juan','Dela Cruz','Santos',20,'Male','juan.delacruz@ccs.edu','09123456789','123 Main St, Manila','BSIT','3rd Year','A','Programming,Web Development,Basketball','Hackathon Club,Intramurals','ICTSO,Basketball Varsity','','2026-01-10'),
        ('STU-2026-002','Maria','Santos','Garcia',19,'Female','maria.santos@ccs.edu','09187654321','456 Oak Ave, Quezon City','BSCS','2nd Year','B','Programming,Data Science,Volleyball','Research Club,Dance Troupe','Google Developer Student Club,Volleyball Team','Late submission (2026-02-14)','2026-01-15'),
        ('STU-2026-003','Carlos','Reyes','Bautista',21,'Male','carlos.reyes@ccs.edu','09234567890','789 Pine Rd, Cebu','BSIT','4th Year','A','Basketball,Networking,Cybersecurity','Basketball Varsity,CISCO Club','Basketball Varsity,CISCO NetAcad','','2026-01-20'),
        ('STU-2026-004','Ana','Cruz','Lopez',18,'Female','ana.cruz@ccs.edu','09345678901','321 Elm St, Davao','BSCS','1st Year','C','Programming,UI/UX Design,Swimming','Design Club,Swimming Team','ACM Student Chapter,Swimming Varsity','','2026-02-01'),
        ('STU-2026-005','Miguel','Torres','Ramos',22,'Male','miguel.torres@ccs.edu','09456789012','654 Maple Dr, Iloilo','BSIT','4th Year','B','Basketball,Football,Mobile Development','Sports Club,Mobile Dev Team','Basketball Varsity,Football Team','Dress code violation (2026-03-05),Tardiness (2026-03-12)','2026-02-10')
    `);

    // Faculty
    await conn.query(`
      INSERT IGNORE INTO faculty
        (employee_id,first_name,last_name,title,department,email,phone,specialization,employment_status,min_load,max_load,current_load)
      VALUES
        ('FAC-2026-001','Maria','Santos','Dr.','Information Technology','m.santos@ccs.edu','09187654321','Data Science & AI','Full-time',15,21,18),
        ('FAC-2026-002','John','Reyes','Prof.','Computer Science','j.reyes@ccs.edu','09198765432','Software Engineering','Full-time',15,21,8),
        ('FAC-2026-003','Ana','Cruz','Dr.','Computer Science','a.cruz@ccs.edu','09209876543','Machine Learning','Part-time',6,12,13)
    `);

    // Subjects
    await conn.query(`
      INSERT IGNORE INTO subjects (code,title,type,hours,units) VALUES
        ('IT301','Data Structures','LECTURE',2,2),
        ('IT301L','Data Structures Lab','LABORATORY',3,1),
        ('IT401','Machine Learning','PURE_LECTURE',3,3),
        ('IT302','Web Development','LECTURE',2,2),
        ('CS401','Software Engineering','PURE_LECTURE',3,3)
    `);

    // Rooms
    await conn.query(`
      INSERT IGNORE INTO rooms (room_id,name,type,building,floor,capacity,current_occupancy,status) VALUES
        ('LR-201','Lecture Room 201','LECTURE_ROOM','CCS Building','2nd Floor',40,35,'Occupied'),
        ('LAB-101','Computer Laboratory 1','LABORATORY_ROOM','CCS Building','1st Floor',30,28,'Occupied'),
        ('LR-305','Lecture Room 305','LECTURE_ROOM','CCS Building','3rd Floor',45,0,'Available')
    `);

    // Research
    await conn.query(`
      INSERT IGNORE INTO research (title,program,year_published,category,evaluation_score) VALUES
        ('AI in Education Systems','BSIT',2025,'Published',95.5),
        ('Machine Learning Applications in Healthcare','BSCS',2025,'Published',92.3),
        ('Blockchain Technology for Secure Transactions','BSIT',2025,'Published',89.7),
        ('IoT Solutions for Smart Cities','BSIT',2024,'Published',88.5)
    `);

    await conn.query(`
      INSERT IGNORE INTO research_authors (research_id,author_name,author_type) VALUES
        (1,'Dr. Maria Santos','faculty'),(1,'Prof. John Reyes','faculty'),
        (2,'Prof. John Reyes','faculty'),(2,'Dr. Ana Cruz','faculty'),
        (3,'Dr. Ana Cruz','faculty'),
        (4,'Prof. Mark Lee','faculty'),(4,'Juan Dela Cruz','student')
    `);

    // Events
    await conn.query(`
      INSERT IGNORE INTO events (title,type,date,time,venue,faculty,participants,status) VALUES
        ('Tech Summit 2026','Seminar','2026-03-15','09:00 AM','CCS Auditorium','Dr. Maria Santos',150,'Upcoming'),
        ('Web Development Workshop','Workshop','2026-03-20','01:00 PM','Computer Lab 1','Prof. John Reyes',45,'Upcoming'),
        ('Programming Competition','Competition','2026-03-25','08:00 AM','CCS Building','Dr. Ana Cruz',80,'Upcoming')
    `);

    // Materials
    await conn.query(`
      INSERT IGNORE INTO materials (subject,faculty,type,title,upload_date) VALUES
        ('IT301 – Data Structures','Dr. Maria Santos','Syllabus','Data Structures Syllabus 2026','2026-01-15'),
        ('IT301 – Data Structures','Dr. Maria Santos','Lesson Plan','Week 1–5 Lesson Plans','2026-01-20'),
        ('IT401 – Machine Learning','Dr. Maria Santos','Course Material','Introduction to Neural Networks','2026-02-01')
    `);

    console.log('✅ Seed complete!');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
