const express = require('express');
const morgan = require('morgan');
const app = express();

//app.use((req,res,next)=>{
//    console.log("Peticion al server "+ new Date);
//    next();
//})

app.use(morgan('tiny'));
app.use(express.json());

app.get('/alumnos', (req, res,next) => {
    console.log(req.query);
    res.send('Respondiendo GET alumnos');
});

app.get('/maestros/:carrera', (req, res,next) => {
    console.log(req.params.carrera)
    res.send('Respondiendo GET maestros');
});

app.get("/administrativos", (req,res,next)=>{
    console.log(req.body)
    res.send("Contestando a get administrativos");

    for( const cargo in req.body){
        console.log(req.body(cargo));
    }
})

app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
});