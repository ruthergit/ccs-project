-- CCS Profiling System — MySQL Schema
CREATE DATABASE IF NOT EXISTS ccs_db;
USE ccs_db;

-- ── Users ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(191) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('ADMIN','DEAN','CHAIRPERSON','FACULTY','STUDENT') DEFAULT 'STUDENT',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Students ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  student_id   VARCHAR(50)  NOT NULL UNIQUE,
  first_name   VARCHAR(100) NOT NULL,
  last_name    VARCHAR(100) NOT NULL,
  middle_name  VARCHAR(100),
  age          INT,
  gender       ENUM('Male','Female','Other') DEFAULT 'Male',
  email        VARCHAR(191) NOT NULL UNIQUE,
  phone        VARCHAR(20),
  address      TEXT,
  program      VARCHAR(20)  NOT NULL,
  year_level   VARCHAR(20)  NOT NULL,
  section      VARCHAR(10)  NOT NULL,
  skills       TEXT,
  activities   TEXT,
  affiliations TEXT,
  violations   TEXT,
  added_date   DATE DEFAULT (CURRENT_DATE),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Faculty ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faculty (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  employee_id       VARCHAR(50)  NOT NULL UNIQUE,
  first_name        VARCHAR(100) NOT NULL,
  last_name         VARCHAR(100) NOT NULL,
  title             VARCHAR(20)  DEFAULT 'Prof.',
  department        VARCHAR(100) NOT NULL,
  email             VARCHAR(191) NOT NULL UNIQUE,
  phone             VARCHAR(20),
  specialization    VARCHAR(200),
  employment_status ENUM('Full-time','Part-time') DEFAULT 'Full-time',
  min_load          INT DEFAULT 15,
  max_load          INT DEFAULT 21,
  current_load      INT DEFAULT 0,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Subjects ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  code  VARCHAR(20)  NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  type  ENUM('LECTURE','LABORATORY','PURE_LECTURE') NOT NULL,
  hours INT NOT NULL,
  units INT NOT NULL
);

-- ── Rooms ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rooms (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  room_id           VARCHAR(20)  NOT NULL UNIQUE,
  name              VARCHAR(200) NOT NULL,
  type              ENUM('LECTURE_ROOM','LABORATORY_ROOM') NOT NULL,
  building          VARCHAR(100),
  floor             VARCHAR(20),
  capacity          INT NOT NULL,
  current_occupancy INT DEFAULT 0,
  status            ENUM('Available','Occupied') DEFAULT 'Available'
);

-- ── Schedules ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS schedules (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT NOT NULL,
  faculty_id INT NOT NULL,
  room_id    INT NOT NULL,
  section    VARCHAR(10) NOT NULL,
  day        VARCHAR(20) NOT NULL,
  start_time VARCHAR(10) NOT NULL,
  end_time   VARCHAR(10) NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  FOREIGN KEY (faculty_id) REFERENCES faculty(id)  ON DELETE CASCADE,
  FOREIGN KEY (room_id)    REFERENCES rooms(id)     ON DELETE CASCADE
);

-- ── Enrollments ────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  student_id  INT NOT NULL,
  schedule_id INT NOT NULL,
  UNIQUE KEY uq_enrollment (student_id, schedule_id),
  FOREIGN KEY (student_id)  REFERENCES students(id)  ON DELETE CASCADE,
  FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
);

-- ── Research ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS research (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  title            VARCHAR(500) NOT NULL,
  program          VARCHAR(20),
  year_published   INT,
  category         VARCHAR(100),
  evaluation_score DECIMAL(5,2) DEFAULT 0.00,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_authors (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  research_id INT NOT NULL,
  author_name VARCHAR(200) NOT NULL,
  author_type ENUM('faculty','student','external') DEFAULT 'faculty',
  FOREIGN KEY (research_id) REFERENCES research(id) ON DELETE CASCADE
);

-- ── Events ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(300) NOT NULL,
  type         VARCHAR(50)  NOT NULL,
  date         DATE         NOT NULL,
  time         VARCHAR(20),
  venue        VARCHAR(200),
  faculty      VARCHAR(200),
  participants INT DEFAULT 0,
  status       VARCHAR(50)  DEFAULT 'Upcoming',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Instructional Materials ────────────────────────
CREATE TABLE IF NOT EXISTS materials (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  subject     VARCHAR(200) NOT NULL,
  faculty     VARCHAR(200),
  type        VARCHAR(100) NOT NULL,
  title       VARCHAR(300) NOT NULL,
  upload_date DATE DEFAULT (CURRENT_DATE),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
