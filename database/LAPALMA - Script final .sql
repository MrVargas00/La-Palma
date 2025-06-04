-- CREACION DE LA DB --
CREATE DATABASE DBLAPALMA
GO

USE DBLAPALMA
GO

-- MODULO DE UBICACIONES -- 

CREATE TABLE Pais (
	id_pais INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE -- Evitar países duplicados
);
GO

CREATE TABLE Ciudad (
	id_ciudad INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
	id_pais INT NOT NULL,
	FOREIGN KEY (id_pais) REFERENCES Pais(id_pais),
	UNIQUE(nombre, id_pais) -- Una ciudad no puede repetirse en el mismo país
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
	nombre VARCHAR(30) NOT NULL UNIQUE -- Evitar tipos duplicados
);
GO

CREATE TABLE Servicio (
	id_servicio INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(200),
	precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0), -- El precio puede ser 0 (gratuito)
	activo BIT DEFAULT 1 NOT NULL,
 	id_hotel INT NOT NULL,
	id_tipoServicio INT NOT NULL,
	FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel),
	FOREIGN KEY (id_tipoServicio) REFERENCES TipoServicio(id_tipoServicio)
);
GO

-------  MÓDULO DE HABITACIONES -----

CREATE TABLE Tipo_Habitacion (
	id_tipo_habitacion INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
	capacidad_base INT NOT NULL CHECK (capacidad_base > 0),
	capacidad_maxima INT NOT NULL CHECK (capacidad_maxima > 0),
	descripcion VARCHAR(200),
	CHECK (capacidad_maxima >= capacidad_base) -- La capacidad máxima debe ser >= base
);
GO 

CREATE TABLE Tipo_Vista (
    id_tipo_vista INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE -- interior, exterior, mar, jardín, montaña
);
GO

CREATE TABLE Estado_Habitacion (
	id_estadoH INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Habitacion (
	id_habitacion INT IDENTITY(1,1) PRIMARY KEY,
	numero_habitacion INT NOT NULL CHECK (numero_habitacion > 0),
	activo BIT DEFAULT 1 NOT NULL,
	precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
	tipo_vista INT NOT NULL,
 	id_hotel INT NOT NULL,
	id_tipo_habitacion INT NOT NULL,
	estado_habitacion INT NOT NULL,
	FOREIGN KEY (tipo_vista) REFERENCES Tipo_Vista(id_tipo_vista),
	FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel),
	FOREIGN KEY (id_tipo_habitacion) REFERENCES Tipo_Habitacion(id_tipo_habitacion),
	FOREIGN KEY (estado_habitacion) REFERENCES Estado_Habitacion(id_estadoH),
	UNIQUE(numero_habitacion, id_hotel) -- Número único por hotel
);
GO

-- MODULO DE PROVEEDORES

CREATE TABLE Tipo_Proveedor (
	id_tipo_proveedor INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Proveedor (
	id_proveedor INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	email VARCHAR(100) CHECK (email IS NULL OR email LIKE '%_@_%._%'), -- Email opcional
	activo BIT DEFAULT 1 NOT NULL, -- Estado del proveedor
	tipo_proveedor INT NOT NULL,
	FOREIGN KEY (tipo_proveedor) REFERENCES Tipo_Proveedor(id_tipo_proveedor)
);
GO

CREATE TABLE Producto (
	id_producto INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(200),
	activo BIT DEFAULT 1 NOT NULL -- Estado del producto
);
GO

CREATE TABLE Proveedor_Producto (
	id_proveedor_producto INT IDENTITY(1,1) PRIMARY KEY,
	id_proveedor INT NOT NULL,
	id_producto INT NOT NULL,
	precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
	cantidad_producto INT NOT NULL CHECK (cantidad_producto >= 0),
	id_hotel INT NOT NULL,
	activo BIT DEFAULT 1 NOT NULL,
	FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor),
	FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
	FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel)
);
GO

--- MODULO DE CLIENTES Y RESERVAS   ----

CREATE TABLE Tipo_Documento (
	id_tipo_documento INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Tipo_Telefono (
	id_tipo_telefono INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Genero ( 
	id_genero INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Idioma (
	id_idioma INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Estado_Reserva (
	id_estadoR INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL UNIQUE
);
GO

CREATE TABLE Cargo (
	id_cargo INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL UNIQUE,
	salario DECIMAL(10,2) NOT NULL CHECK (salario >= 0),
	descripcion VARCHAR(200), -- Descripción del cargo
	activo BIT DEFAULT 1 NOT NULL
);
GO

CREATE TABLE Empleado (
    documento VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) CHECK (email IS NULL OR email LIKE '%_@_%._%'),
    direccion VARCHAR(200),
    fecha_nacimiento DATE CHECK (fecha_nacimiento < GETDATE()), -- No puede nacer en el futuro
    fecha_contratacion DATE, -- Fecha de contratación
    activo BIT DEFAULT 1 NOT NULL,
	id_cargo INT NOT NULL,
    id_genero INT NOT NULL,
    tipo_documento INT NOT NULL,
    id_hotel INT NOT NULL,
	FOREIGN KEY (id_cargo) REFERENCES Cargo(id_cargo),
    FOREIGN KEY (id_genero) REFERENCES Genero(id_genero),
    FOREIGN KEY (tipo_documento) REFERENCES Tipo_Documento(id_tipo_documento),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel)
);
GO

CREATE TABLE Telefono (
    id_telefono INT IDENTITY(1,1) PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    id_tipo_telefono INT NOT NULL,
    tipo_duenio VARCHAR(10) NOT NULL CHECK (tipo_duenio IN ('Cliente', 'Empleado')),
    id_duenio VARCHAR(50) NOT NULL,  
    activo BIT DEFAULT 1 NOT NULL,
    FOREIGN KEY (id_tipo_telefono) REFERENCES Tipo_Telefono(id_tipo_telefono)
);
GO

CREATE TABLE Cliente (
	documento VARCHAR(50) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	fecha_nacimiento DATE NOT NULL CHECK (fecha_nacimiento < GETDATE()),
	direccion VARCHAR(100),
	email VARCHAR(100) CHECK (email IS NULL OR email LIKE '%_@_%._%'),
	activo BIT DEFAULT 1 NOT NULL,
	ciudad_origen INT NOT NULL,
	idioma_preferido INT NOT NULL,
	id_genero INT NOT NULL,
	tipo_documento INT NOT NULL,
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
	precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
	duracion_dias INT CHECK (duracion_dias > 0), -- Duración del paquete
	incluye_transporte_aereo BIT NOT NULL DEFAULT 0,
	incluye_transporte_terrestre BIT NOT NULL DEFAULT 0,
	incluye_spa BIT NOT NULL DEFAULT 0,
	incluye_comidas BIT NOT NULL DEFAULT 0,
	incluye_tour BIT NOT NULL DEFAULT 0,
	activo BIT DEFAULT 1 NOT NULL
);
GO

CREATE TABLE Reserva (
	id_reserva INT IDENTITY(1,1) PRIMARY KEY,
	fecha_reserva DATETIME DEFAULT GETDATE(), -- Cuándo se hizo la reserva
	fecha_llegada DATE NOT NULL,
	fecha_salida DATE NOT NULL,
	numero_huespedes INT NOT NULL CHECK (numero_huespedes > 0), -- Cantidad de huéspedes
	observaciones VARCHAR(500), -- Observaciones especiales
	activo BIT DEFAULT 1 NOT NULL,
	documento_cliente VARCHAR(50) NOT NULL,
	id_habitacion INT NOT NULL,
	id_paquete INT,
	Estado INT NOT NULL,
	FOREIGN KEY (documento_cliente) REFERENCES Cliente(documento),
	FOREIGN KEY (id_habitacion) REFERENCES Habitacion(id_habitacion),
	FOREIGN KEY (id_paquete) REFERENCES Paquete(id_paquete),
	FOREIGN KEY (Estado) REFERENCES Estado_Reserva(id_estadoR),
	CHECK (fecha_salida > fecha_llegada)
);
GO

CREATE TABLE CheckIn (
	id_checkin INT IDENTITY(1,1) PRIMARY KEY,
	fecha_hora DATETIME NOT NULL DEFAULT GETDATE(),
	documento_empleado VARCHAR(50), -- Empleado que hace el check-in
	id_reserva INT NOT NULL UNIQUE, -- Una reserva solo puede tener un check-in
	FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva),
	FOREIGN KEY (documento_empleado) REFERENCES Empleado(documento)
);
GO

CREATE TABLE CheckOut (
	id_checkout INT IDENTITY(1,1) PRIMARY KEY,
	fecha_hora DATETIME NOT NULL DEFAULT GETDATE(),
	documento_empleado VARCHAR(50), -- Empleado que hace el check-out
	cargos_adicionales DECIMAL(10,2) DEFAULT 0 CHECK (cargos_adicionales >= 0),
	id_reserva INT NOT NULL UNIQUE, -- Una reserva solo puede tener un check-out
	FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva),
	FOREIGN KEY (documento_empleado) REFERENCES Empleado(documento)
);
GO

CREATE TABLE Metodo_Pago (
    id_metodo_pago INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE, -- Efectivo, Tarjeta, Transferencia, Cheque
    activo BIT DEFAULT 1 NOT NULL
);
GO

CREATE TABLE Pago (
    id_pago INT IDENTITY(1,1) PRIMARY KEY,
    fecha_pago DATETIME NOT NULL DEFAULT GETDATE(),
    monto_total DECIMAL(10,2) NOT NULL CHECK (monto_total > 0),
    estado_pago VARCHAR(20) NOT NULL DEFAULT 'Pendiente' CHECK (estado_pago IN ('Completado', 'Pendiente', 'Fallido')),
    referencia VARCHAR(50),
	id_metodo_pago INT NOT NULL,
    id_reserva INT NOT NULL,
    FOREIGN KEY (id_metodo_pago) REFERENCES Metodo_Pago(id_metodo_pago),
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);
GO

-- MODULO DE AUTENTICACION (SISTEMA INTERNO) --

CREATE TABLE Perfil (
    id_perfil INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    paginanavegar VARCHAR(100)
);
GO

CREATE TABLE Usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    salt VARCHAR(100),
    documento_empleado VARCHAR(50), -- FK al empleado
    FOREIGN KEY (documento_empleado) REFERENCES Empleado(documento)
);
GO

CREATE TABLE Usuario_Perfil (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_perfil INT NOT NULL,
	activo BIT DEFAULT 1 NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil)
);
GO

-- INSERTAR DATOS INICIALES --

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

INSERT INTO Tipo_Vista (nombre)
VALUES
    ('Interior'),
    ('Exterior'),
    ('Mar'),
    ('Jardín'),
    ('Montaña'),
    ('Ciudad'),
    ('Piscina');
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

INSERT INTO Metodo_Pago (nombre)
VALUES
    ('Efectivo'),
    ('Tarjeta de Crédito'),
    ('Tarjeta de Débito'),
    ('Transferencia'),
    ('Cheque'),
    ('Pago Móvil');
GO

INSERT INTO Tipo_Proveedor (nombre)
VALUES
    ('Alimentos y Bebidas'),
    ('Limpieza y Mantenimiento'),
    ('Textiles y Lencería'),
    ('Tecnología'),
    ('Construcción'),
    ('Transporte'),
    ('Servicios Profesionales');
GO

INSERT INTO Tipo_Habitacion (nombre, capacidad_base, capacidad_maxima, descripcion)
VALUES
    ('Individual', 1, 1, 'Habitación para una persona'),
    ('Doble', 2, 2, 'Habitación para dos personas'),
	('Matrimonial', 2, 2, 'Habitación para una pareja'),
    ('Triple', 3, 3, 'Habitación para tres personas'),
    ('Suite Junior', 2, 4, 'Suite con sala y habitación'),
    ('Suite Ejecutiva', 2, 6, 'Suite amplia con múltiples ambientes'),
    ('Familiar', 4, 6, 'Habitación amplia para familias');
GO

INSERT INTO Perfil (nombre, paginanavegar)
VALUES
    ('Administrador', 'PaginaInicio.html'),
    ('Gerente', 'PaginaInicio.html'),
    ('Recepcionista', 'PaginaInicio.html'),
    ('Contador', 'PaginaInicio.html');
GO

INSERT INTO Cargo (nombre, salario, descripcion)
VALUES
    ('Recepcionista', 2500000.00, 'Atención al cliente y check-in/out'),
    ('Housekeeping', 2200000.00, 'Limpieza y mantenimiento de habitaciones'),
    ('Gerente', 8000000.00, 'Administración general del hotel'),
    ('Botones', 2000000.00, 'Asistencia a huéspedes con equipaje'),
    ('Cocinero', 3000000.00, 'Preparación de alimentos'),
    ('Mantenimiento', 2800000.00, 'Reparaciones y mantenimiento general'),
    ('Seguridad', 2400000.00, 'Vigilancia y seguridad del hotel'),
    ('Contador', 4500000.00, 'Gestión contable y financiera'),
    ('Administrador', 6000000.00, 'Administración y supervisión general');
GO

INSERT INTO Hotel (nombre, direccion, categoria, telefono, email, id_ciudad, descripcion)
VALUES
    ('Hotel Palma Coco Resort', 'Carrera 3 # 18-58, Rodadero', 5, '+57 5 432-1000', 'info@lapalma.com', 3, 'Hotel de lujo frente al mar en Santa Marta');
GO

INSERT INTO Empleado (documento, nombre, apellidos, email, direccion, fecha_nacimiento, fecha_contratacion, activo, id_cargo, id_genero, tipo_documento, id_hotel)
VALUES
    ('1234567890', 'María Elena', 'González Pérez', 'maria.gonzalez@lapalmbeach.com', 'Calle 22 # 5-45, Centro Histórico', '1990-03-15', '2020-01-15', 1, 3, 2, 1, 1),
    ('9876543210', 'Carlos Andrés', 'Martínez López', 'carlos.martinez@lapalmbeach.com', 'Carrera 8 # 15-30, Rodadero', '1985-07-22', '2019-05-10', 1, 1, 1, 1, 1),
    ('5566778899', 'Ana Sofía', 'Rodríguez Villa', 'ana.rodriguez@lapalmbeach.com', 'Calle 19 # 3-67, Centro', '1992-11-08', '2021-03-20', 1, 8, 2, 1, 1),
    ('1122334455', 'Luis Fernando', 'Jiménez Castro', 'luis.jimenez@lapalmbeach.com', 'Carrera 12 # 8-25, Bastidas', '1988-01-30', '2020-08-05', 1, 6, 1, 1, 1),
    ('9988776655', 'Patricia', 'Vargas Moreno', 'patricia.vargas@lapalmbeach.com', 'Calle 24 # 4-12, Mamatoco', '1995-05-14', '2022-02-28', 1, 1, 2, 1, 1);
GO

-- Inserts para Estado_Reserva
INSERT INTO Estado_Reserva (nombre) VALUES 
('Pendiente'),
('Confirmada'),
('Cancelada'),
('Check-In'),
('Check-Out');

-- Inserts para Estado_Habitacion
INSERT INTO Estado_Habitacion (nombre) VALUES 
('Disponible'),
('Ocupada'),
('Limpieza'),
('Mantenimiento'),
('Reservada');
