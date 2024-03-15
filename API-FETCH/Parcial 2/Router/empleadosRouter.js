const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

// Se crea la conexión con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5365',
    database: 'API',
});

router.use(express.json());

// Consultar tabla (con o sin parametros)
router.get('/', (req, res) => {
    try {
        const EmpleadoID = req.query.EmpleadoID;
        let sql = 'SELECT * FROM Empleados';
        let params = [];
    
        if (EmpleadoID) {
            sql += ' WHERE EmpleadoID = ?';
            params.push(EmpleadoID);
        }
        connection.query(
            sql, params,
            function(err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                if (results.length > 0) {
                    res.send(results);
                } else {
                    res.status(404).json({ error: 'Datos no encontrados' });
                }
            });
    } catch (err) {
        res.send(err.code + ' / ' + err.message);
    }
});

// Agregar nuevo empleado
router.post('/', (req, res) => {
    try {
        const { EmpleadoID, Nombre, Apellido } = req.body;

        // Insertar el nuevo empleado en la base de datos
        connection.query(
            'INSERT INTO Empleados (EmpleadoID, Nombre, Apellido) VALUES (?, ?, ?)',
            [EmpleadoID, Nombre, Apellido],
            function(err, results, fields) {
                if (err) {
                    res.status(500).json({ error: 'Error al agregar empleado' });
                    return;
                }
                res.status(201).json({ message: 'Empleado agregado correctamente' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Más rutas pueden ser definidas aquí...

module.exports = router;
