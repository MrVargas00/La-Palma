-- CREACION DE LA DB --
CREATE DATABASE DBLAPALMA
GO

USE DBLAPALMA
GO
-- MODULO DE UBICACIONES -- 

CREATE TABLE Pais (
	id_pais INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);
GO

 CREATE TABLE Ciudad (
	id_ciudad INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
	id_pais INT NOT NULL,
	FOREIGN KEY (id_pais) REFERENCES Pais(id_pais)
);
GO

CREATE TABLE Hotel (
	id_hotel INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    categoria INT NOT NULL CHECK (categoria >= 1 AND categoria <= 5), -- Estrellas del hotel (1-5)
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL CHECK (email LIKE '%_@_%._%'),
	id_ciudad INT NOT NULL,
	descripcion VARCHAR(200),
	activo BIT DEFAULT 1 NOT NULL,
	FOREIGN KEY (id_ciudad) REFERENCES Ciudad(id_ciudad)
);
GO
-- MODULO DE SERVICIOS --

CREATE TABLE TipoServicio (
	id_tipoServicio INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL, --(restaurante, piscina, gimnasio, SPA, salón de eventos, lavandería etc.)
);
GO

CREATE TABLE Servicio (
	id_servicio INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(200),
	precio DECIMAL(10,2) NOT NULL,
	activo BIT DEFAULT 1  NOT NULL, --(activo/inactivo)
 	id_hotel INT NOT NULL,  -- FK
	id_tipoServicio INT NOT NULL,  --FK
	FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel),
	FOREIGN KEY (id_tipoServicio) REFERENCES TipoServicio(id_tipoServicio)
);
GO

-------  MÓDULO DE HABITACIONES -----

 CREATE TABLE Tipo_Habitacion (
	id_tipo_habitacion INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL, --  (individual, doble, suite, etc.)
	capacidad_base INT NOT NULL,
	capacidad_maxima INT NOT NULL,
	descripcion VARCHAR(200)
 );
 GO 

 CREATE TABLE Tipo_Vista (
    id_tipo_vista INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL -- interior, exterior, mar, jardín, montaña.
);

 CREATE TABLE Habitacion (
	id_habitacion INT IDENTITY(1,1) PRIMARY KEY,
	numero_habitacion INT NOT NULL CHECK (numero_habitacion > 0),
	activo BIT DEFAULT 1  NOT NULL, -- (disponible, ocupada, en mantenimiento, limpieza) 
	precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
	tipo_vista INT NOT NULL, -- (FK)
 	id_hotel INT NOT NULL, -- (FK)
	id_tipo_habitacion INT NOT NULL, -- (FK)
	FOREIGN KEY (tipo_vista) REFERENCES Tipo_Vista(id_tipo_vista),
	FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel),
	FOREIGN KEY (id_tipo_habitacion) REFERENCES Tipo_Habitacion(id_tipo_habitacion)
);
GO

-- MODULO DE PROVEEDORES

CREATE TABLE Tipo_Proveedor (
	id_tipo_proveedor INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Proveedor(
	id_proveedor INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	tipo_proveedor INT NOT NULL, -- (FK)
	FOREIGN KEY (tipo_proveedor) REFERENCES Tipo_Proveedor(id_tipo_proveedor)
);
GO

CREATE TABLE Producto (
	id_producto INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(200)
);
GO

CREATE TABLE Proveedor_Producto (
  id_proveedor INT FOREIGN KEY REFERENCES Proveedor(id_proveedor),
  id_producto INT FOREIGN KEY REFERENCES Producto(id_producto),
  precio_unitario DECIMAL(10,2),
  cantidad_producto INT NOT NULL,
  id_hotel INT FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel),
  PRIMARY KEY (id_proveedor, id_producto)
);
GO

--- MODULO DE CLIENTES Y RESERVAS   ----

CREATE TABLE Tipo_Documento (
	id_tipo_documento INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Tipo_Telefono (
	id_tipo_telefono INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Genero ( 
	id_genero INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Idioma (
	id_idioma INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Cargo(
	id_cargo INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	salario DECIMAL(10,2) NOT NULL
);

CREATE TABLE Telefono (
    id_telefono INT IDENTITY(1,1) PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    id_tipo_telefono INT NOT NULL,
    tipo_duenio VARCHAR(10) NOT NULL CHECK (tipo_duenio IN ('Cliente', 'Empleado')),
    id_duenio INT NOT NULL,
    activo BIT DEFAULT 1,
    FOREIGN KEY (id_tipo_telefono) REFERENCES Tipo_Telefono(id_tipo_telefono)
);

CREATE TABLE Empleado (
    documento VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    direccion VARCHAR(200),
    fecha_nacimiento DATE,
    activo BIT DEFAULT 1 NOT NULL,
	id_cargo INT NOT NULL, -- (FK)
    id_genero INT NOT NULL,  -- (FK)
    tipo_documento INT NOT NULL,    -- (FK)
    id_hotel INT NOT NULL,        -- FK (dónde trabaja)}
	FOREIGN KEY (id_cargo) REFERENCES Cargo(id_cargo),
    FOREIGN KEY (id_genero) REFERENCES Genero(id_genero),
    FOREIGN KEY (tipo_documento) REFERENCES Tipo_Documento(id_tipo_documento),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel)
);

 CREATE TABLE Cliente (
	id_cliente INT IDENTITY(1,1) PRIMARY KEY, 
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	numero_documento VARCHAR(100) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	direccion VARCHAR(100),
	email VARCHAR(100) CHECK (email IS NULL OR email LIKE '%_@_%._%'),
	activo BIT DEFAULT 1 NOT NULL,
	ciudad_origen INT NOT NULL, -- (FK)
	idioma_preferido INT NOT NULL, -- (FK)
	id_genero INT NOT NULL, -- (FK)
	tipo_documento INT NOT NULL, --(FK)
	FOREIGN KEY (ciudad_origen) REFERENCES Ciudad(id_ciudad),
	FOREIGN KEY (idioma_preferido) REFERENCES Idioma(id_idioma),
	FOREIGN KEY (id_genero) REFERENCES Genero(id_genero),
	FOREIGN KEY (tipo_documento) REFERENCES Tipo_Documento(id_tipo_documento)
);
GO

CREATE TABLE Paquete (
	id_paquete INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(200) NOT NULL,
	precio DECIMAL(10,2) NOT NULL,
	incluye_transporte_aereo BIT NOT NULL,
	incluye_transporte_terrestre BIT NOT NULL,
	incluye_spa BIT NOT NULL,
	incluye_comidas BIT NOT NULL,
	incluye_tour BIT NOT NULL
);
GO

CREATE TABLE Reserva (
	id_reserva INT IDENTITY(1,1) PRIMARY KEY,
	fecha_llegada DATE NOT NULL,
	fecha_salida DATE NOT NULL,
	activo BIT DEFAULT 1 NOT NULL,
	id_cliente INT NOT NULL, -- (FK)
	id_habitacion INT NOT NULL, -- (FK)
	id_paquete INT, -- (FK)
	FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
	FOREIGN KEY (id_habitacion) REFERENCES Habitacion(id_habitacion),
	FOREIGN KEY (id_paquete) REFERENCES Paquete(id_paquete),
	CHECK (fecha_salida > fecha_llegada)
);
GO

CREATE TABLE CheckIn (
	id_checkin INT IDENTITY(1,1) PRIMARY KEY,
	fecha_hora DATETIME NOT NULL,
	id_reserva INT NOT NULL, -- (FK)
	FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);
GO

CREATE TABLE CheckOut (
	id_checkout INT IDENTITY(1,1) PRIMARY KEY,
	fecha_hora DATETIME NOT NULL,
	id_reserva INT NOT NULL, -- (FK)
	FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);
GO

CREATE TABLE Metodo_Pago (
    id_metodo_pago INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL -- Efectivo, Tarjeta, Transferencia, Cheque
);

CREATE TABLE Pago (
    id_pago INT IDENTITY(1,1) PRIMARY KEY,
    fecha_pago DATETIME NOT NULL DEFAULT GETDATE(),
    monto_total DECIMAL(10,2) NOT NULL,
    estado_pago VARCHAR(20) NOT NULL CHECK (estado_pago IN ('Completado', 'Pendiente', 'Fallido')),
    referencia VARCHAR(50),
	id_metodo_pago INT NOT NULL,   --(FK)
    id_reserva INT NOT NULL,    --(FK)
    FOREIGN KEY (id_metodo_pago) REFERENCES Metodo_Pago(id_metodo_pago),
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);

-- Insertar países --
INSERT INTO Pais(nombre)
VALUES
    ('Colombia'),
    ('Argentina'),
    ('Brasil'),
    ('México'),
    ('Venezuela'),
    ('España'),   
    ('Estados Unidos'),
    ('Alemania'),    
    ('Inglaterra');
GO

-- Insertar ciudades --
INSERT INTO Ciudad(nombre, id_pais)
VALUES
    ('Medellín', 1), ('Barranquilla', 1), ('Santa Marta', 1), ('Bogotá', 1), ('Cali', 1), ('Pasto', 1),
    ('Buenos Aires', 2), ('Córdoba', 2), ('Rosario', 2), ('Mendoza', 2),
    ('Brasilia', 3), ('Rio de Janeiro', 3), ('São Paulo', 3), ('Fortaleza', 3),
    ('Ciudad de México', 4), ('Guadalajara', 4), ('Monterrey', 4), ('Cancún', 4),
    ('Caracas', 5), ('Maracaibo', 5), ('Valencia', 5),
    ('Madrid', 6), ('Barcelona', 6), ('Valencia', 6), ('Bilbao', 6),
    ('New York', 7), ('Los Angeles', 7), ('Chicago', 7), ('Houston', 7),
    ('Berlín', 8), ('Múnich', 8), ('Hamburgo', 8), ('Frankfurt', 8),
    ('Londres', 9), ('Manchester', 9), ('Liverpool', 9), ('Birmingham', 9);
GO

INSERT INTO TipoServicio (nombre)
VALUES
    ('Restaurante'),
    ('Piscina'),
    ('Gimnasio'),
    ('SPA'),
    ('Salón de eventos'),
    ('Lavandería'),
    ('Bar'),
    ('Sauna'),
    ('Parqueadero');
GO

INSERT INTO Tipo_Documento (nombre)
VALUES
    ('Cédula de ciudadanía'),
    ('Cédula de extranjería'),
    ('Pasaporte'),
    ('Tarjeta de identidad'),
    ('NIT'),
    ('Licencia de conducción');
GO

INSERT INTO Tipo_Telefono (nombre)
VALUES
    ('Celular'),
    ('Fijo'),
    ('Oficina'),
    ('Residencia'),
    ('Emergencia');
GO

INSERT INTO Genero (nombre)
VALUES
    ('Masculino'),
    ('Femenino'),
    ('No binario'),
    ('Prefiere no decirlo'),
    ('Otro');
GO

INSERT INTO Idioma (nombre)
VALUES
    ('Español'),
    ('Inglés'),
    ('Francés'),
    ('Alemán'),
    ('Portugués'),
    ('Italiano'),
    ('Chino'),
    ('Japonés'),
    ('Árabe'),
    ('Ruso');
GO
