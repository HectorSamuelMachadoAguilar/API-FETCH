const express = require('express');
const empleadosRouter = require('./empleadosRouter.js');

const app = express();
const PORT = 3000;

app.use('/empleados', empleadosRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
