CREATE DATABASE IF NOT EXISTS hosting_anywhere;
USE hosting_anywhere;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  features JSON DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO plans (name, price, description, features) VALUES
('Basic', 5.00, 'For hobby projects. 1GB storage.', JSON_ARRAY('1 GB storage','Basic Support','Community Access')),
('Standard', 12.00, 'For small apps. 10GB storage, daily backups.', JSON_ARRAY('10 GB storage','Daily Backups','Email Support')),
('Pro', 30.00, 'For production. 100GB storage, SLA support.', JSON_ARRAY('100 GB storage','Priority Support','SLA'));
