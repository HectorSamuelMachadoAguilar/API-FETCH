let Alumno = {
    "Ncontrol": "19100208",
    "Nombre": "Hector",
    "Apellido": "Machado",
    "Carrera" : "ING. Sistemas",
    "Especialidad": "Desarrollo de software"
}

let sentenciaSQL = 'update table set '

for (const [propiedad, valor] of Object.entries(Alumno)) {
    if (propiedad !== 'Ncontrol') {
      sentenciaSQL += `${propiedad} = '${valor}', `;
    }
}

sentenciaSQL = sentenciaSQL.slice(0, -2);
sentenciaSQL += ` WHERE id = ${Alumni.Ncontrol};`;
console.log(sentenciaSQL);