CREATE DATABASE enlaces_db;

USE enlaces_db;


-- TABLA DE USUARIOS
CREATE TABLE usuarios(
    id INT(11) NOT NULL,
    usuario VARCHAR(16) NOT NULL,
    clave VARCHAR (50)  NOT NULL,
    apellido VARCHAR (50) NOT NULL
    );

ALTER TABLE usuarios
    ADD PRIMARY KEY (id);


ALTER TABLE usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

    DESCRIBE usuarios;   


-- TABLA DE ENLACES
CREATE TABLE enlaces(
    id INT(11) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    url VARCHAR (255)  NOT NULL,
    descripcion TEXT,
    usuario_id INT (11),
    creado timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)  
    );



ALTER TABLE enlaces
    ADD PRIMARY KEY (id);

ALTER TABLE enlaces
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;    

    DESCRIBE enlaces;   