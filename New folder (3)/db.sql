-- Create database and sample data for ezshop
CREATE DATABASE IF NOT EXISTS ezshop CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE ezshop;


CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
image VARCHAR(500) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS orders (
id INT AUTO_INCREMENT PRIMARY KEY,
customer_name VARCHAR(255) NOT NULL,
customer_email VARCHAR(255) NOT NULL,
shipping_address TEXT NOT NULL,
items_json JSON NOT NULL,
total DECIMAL(12,2) NOT NULL,
created_at DATETIME NOT NULL
);


INSERT INTO products (name, price, image) VALUES
('Basic T-Shirt',249.00,'https://via.placeholder.com/400x300?text=T-Shirt'),
('Portable Charger',899.00,'https://via.placeholder.com/400x300?text=Charger'),
('Wireless Earbuds',1299.00,'https://via.placeholder.com/400x300?text=Earbuds');