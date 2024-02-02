const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Respondiendo GET');
});

app.post('/', (req, res) => {
    res.send('Respondiendo POST');
});

app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
});