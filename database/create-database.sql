
CREATE DATABASE IF NOT EXISTS `basicDataBase_dev`;
GRANT ALL ON `basicDataBase_dev` .* TO 'root'@'%';

CREATE TABLE IF NOT EXISTS basicDataBase.books (
    id int not null AUTO_INCREMENT Primary Key,
    title varchar(255) not null,
    author varchar(255) not null,
    createdAt TIMESTAMP DEFAULT NOW(),
	updatedAt TIMESTAMP DEFAULT NOW(),
    UNIQUE(title)
);

CREATE TABLE IF NOT EXISTS basicDataBase_dev.books (
    id int not null AUTO_INCREMENT Primary Key,
    title varchar(255) not null,
    author varchar(255) not null,
    createdAt TIMESTAMP DEFAULT NOW(),
	updatedAt TIMESTAMP DEFAULT NOW(),
    UNIQUE(title)
);
