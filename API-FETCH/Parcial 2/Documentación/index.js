const express = require('express');
const mysql = require('mysql2');
const app = express();

/**
 * Se crea la conexión con la base de datos.
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5365',
    database: 'API',
});

app.use(express.json());

/**
 * Consulta la tabla de empleados (con o sin parámetros).
 * @param {number} req.query.EmpleadoID - El ID del empleado a consultar (opcional).
 * @returns {Array} Una lista de empleados que coinciden con los parámetros de búsqueda, si se proporcionan.
 * @throws {Error} Si ocurre un error durante la consulta.
 */
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

/**
 * Agrega un nuevo empleado a la base de datos.
 * @param {Object} req.body - Los datos del nuevo empleado a agregar.
 * @param {number} req.body.EmpleadoID - El ID del nuevo empleado.
 * @param {string} req.body.Nombre - El nombre del nuevo empleado.
 * @param {string} req.body.Apellido - El apellido del nuevo empleado.
 * @returns {Object} Un mensaje indicando el éxito de la operación.
 * @throws {Error} Si ocurre un error durante la inserción.
 */
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

/**
 * Modifica un empleado existente en la base de datos.
 * @param {number} req.query.EmpleadoID - El ID del empleado a modificar.
 * @param {Object} req.body - Los datos actualizados del empleado.
 * @param {string} req.body.Nombre - El nuevo nombre del empleado.
 * @param {string} req.body.Apellido - El nuevo apellido del empleado.
 * @returns {Object} Un mensaje indicando el éxito de la operación.
 * @throws {Error} Si ocurre un error durante la modificación.
 */
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

/**
 * Elimina un empleado de la base de datos.
 * @param {number} req.query.EmpleadoID - El ID del empleado a eliminar.
 * @returns {Object} Un mensaje indicando el éxito de la operación.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
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

/**
 * Inicia el servidor y lo hace escuchar en el puerto 3000.
 */
app.listen(3000, () => {
    console.log('Escuchando 3000!');
});