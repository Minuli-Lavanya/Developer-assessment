CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active', 'inactive'),
    tags JSON,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ProductRestrictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    type VARCHAR(255),
    sub_type VARCHAR(255),
    value VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

CREATE TABLE ProductTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    status ENUM('active', 'inactive')
);

CREATE TABLE ProductTypeAmounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    type_id INT,
    price DECIMAL(10,2),
    currency VARCHAR(10),
    status ENUM('active', 'inactive'),
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES ProductTypes(id) ON DELETE CASCADE
);

CREATE TABLE ProductTypeDistributions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    status ENUM('active', 'inactive')
);

CREATE TABLE ProductTypeDistributionAmounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_type_amount_id INT,
    product_type_distribution_id INT,
    amount DECIMAL(10,2),
    FOREIGN KEY (product_type_amount_id) REFERENCES ProductTypeAmounts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_type_distribution_id) REFERENCES ProductTypeDistributions(id) ON DELETE CASCADE
);
