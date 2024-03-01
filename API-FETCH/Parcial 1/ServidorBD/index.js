const express = require('express');
const mysql = require('mysql2');
const app = express();

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5365',
    database: 'API',
});

app.use(express.json());

// consultar tabla (con o sin parametros)
app.get('/empleados', (req, res) => {
    try{
        const EmpleadoID = req.query.EmpleadoID;
        let sql = 'SELECT * FROM Empleados';
        let params = [];
    
        if(EmpleadoID){
            sql += ' WHERE EmpleadoID = ?';
            params.push(EmpleadoID);
        }
        connection.query(
            sql, params,
            function(err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                if(results.length > 0){
                    res.send(results);
                } else {
                    res.status(404).json({ error: 'Datos no encontrados' });
                }
            });
    } catch (err) {
        res.send(err.code+' / ' + err.message);
    }
});

app.post('/empleados', (req, res) => {
    try {
        const { EmpleadoID, Nombre, Apellido } = req.body; // Se espera que el cuerpo de la solicitud contenga estos campos

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

app.put('/empleados', (req, res) => {
    try {
        const EmpleadoID = req.query.EmpleadoID; // Obtener el EmpleadoID de los parámetros de consulta
        const { Nombre, Apellido } = req.body; // Se espera que el cuerpo de la solicitud contenga estos campos

        // Verificar si se proporcionó el EmpleadoID en los parámetros de consulta
        if (!EmpleadoID) {
            res.status(400).json({ error: 'Se requiere el parámetro EmpleadoID en los parámetros de consulta' });
            return;
        }

        // Actualizar el empleado en la base de datos
        connection.query(
            'UPDATE Empleados SET Nombre = ?, Apellido = ? WHERE EmpleadoID = ?',
            [Nombre, Apellido, EmpleadoID],
            function(err, results, fields) {
                if (err) {
                    res.status(500).json({ error: 'Error al modificar empleado' });
                    return;
                }
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Empleado no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Empleado modificado correctamente' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.delete('/empleados', (req, res) => {
    try {
        const EmpleadoID = req.query.EmpleadoID;

        if (!EmpleadoID) {
            res.status(400).json({ error: 'Se requiere el parámetro EmpleadoID' });
            return;
        }

        // Eliminar el empleado de la base de datos
        connection.query(
            'DELETE FROM Empleados WHERE EmpleadoID = ?',
            [EmpleadoID],
            function(err, results, fields) {
                if (err) {
                    res.status(500).json({ error: 'Error al eliminar empleado' });
                    return;
                }
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Empleado no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Empleado eliminado correctamente' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.listen(3000, () => {
    console.log('Escuchando 3000!');
});