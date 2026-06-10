CREATE TABLE IF NOT EXISTS student (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(20),
  college VARCHAR(200),
  course VARCHAR(100),
  year VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price DOUBLE PRECISION NOT NULL,
  domain VARCHAR(100),
  project_type VARCHAR(20),
  difficulty_level VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active',
  phase VARCHAR(50),
  owner_type VARCHAR(20) DEFAULT 'admin',
  developer_name VARCHAR(100),
  student_name VARCHAR(100),
  student_email VARCHAR(120),
  student_phone VARCHAR(20),
  student_college VARCHAR(200),
  student_course VARCHAR(100),
  student_year VARCHAR(20),
  technologies TEXT,
  video_tutorial VARCHAR(500),
  requirements TEXT,
  screenshots TEXT,
  zip_file VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_buy_enquiry (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES project(id),
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  college VARCHAR(200) NOT NULL,
  branch VARCHAR(100) NOT NULL,
  year VARCHAR(50) NOT NULL,
  city_state VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sell_project_student (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  college_name VARCHAR(200) NOT NULL,
  course VARCHAR(100) NOT NULL,
  year VARCHAR(50) NOT NULL,
  project_title VARCHAR(200) NOT NULL,
  developer VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  domain VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  github_url VARCHAR(500) NOT NULL,
  requirements TEXT NOT NULL,
  instructions TEXT NOT NULL,
  screenshots TEXT,
  zip_file VARCHAR(500),
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_project (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  project_type VARCHAR(50) NOT NULL,
  budget VARCHAR(50) NOT NULL,
  technologies TEXT,
  deadline DATE NOT NULL,
  description TEXT NOT NULL,
  additional_info TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
