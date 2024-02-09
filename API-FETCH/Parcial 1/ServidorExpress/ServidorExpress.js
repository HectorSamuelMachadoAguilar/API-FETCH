const express = require('express');
const morgan = require('morgan');
const app = express();

app.use((req,res,next)=>{
    console.log("Peticion al server "+ new Date);
    next();
})

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Respondiendo GET');
});

app.post('/', (req, res) => {
    res.send('Respondiendo POST');
});

app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
});