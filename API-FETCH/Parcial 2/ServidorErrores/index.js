const express = require('express');
const app = express()

app.get('/maestros', (req, res,next) => {
  if(true){
    res.send("respondiendo verdadero");
  }
  else{
    res.send("respondiendo falso");
  }
  })
  

app.get('/alumnos', (req, res,next) => {
try {
throw new Error("No funciona")
}
catch(e){
  next(e)
  }
  res.send('Respondiendo servidor')
})


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
app.use( (req, res,next) => {
  res.status(404).send('Recurso no encontrado')
})
app.use((err, req, res, next) => {
  res.status(500).send( err.message);
});