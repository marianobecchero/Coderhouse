-- Punto 1)
SHOW DATABASES;

CREATE DATABASE mibase;
USE mibase;

-- Punto 2)
CREATE TABLE usuario(
	id int unsigned not null auto_increment,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    edad int unsigned not null,
    email varchar(50) not null,
    primary key(id)
);

-- Punto 3)
INSERT INTO usuario (nombre, apellido, edad, email) VALUES
('Juan', 'Perez', 23, 'jp@gmail.com'),
('Pedro', 'Mei', 21, 'pm@gmail.com'),
('Juana', 'Suarez', 25, 'js@gmail.com');

-- Punto 4)
SELECT * FROM usuarios;

-- Punto 5)
DELETE FROM usuarios WHERE id = 2;

-- Punto 6)
UPDATE usuarios SET edad = 24 WHERE id = 1;

-- Punto 7)
SELECT * FROM usuarios;