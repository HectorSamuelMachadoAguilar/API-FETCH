function promise1() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("promesa 1 si resolvió");
        }, 2000);
        // reject("error");
    })
}
function promise2() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("promesa 2 si resolvió");
            reject("promesa 2 no resolvió");
        }, 1000);
        // reject("error");
    })
}
function promise3() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("promesa 3 si resolvió");
        }, 3000);
        // reject("error");
    })
}

//Arreglo de la consulta
Promise.all([promise1(), promise2(), promise3()])
    .then(resultado=>console.log(resultado))
    .catch(error=>console.log(error));

//Arreglo del objeto 
Promise.allSettled([promise1(), promise2(), promise3()])
    .then(resultado=>console.log(resultado))
    .catch(error=>console.log(error));

//El valor de la promesa que termina primero (con su resolve y reject)
Promise.any([promise1(), promise2(), promise3()])
    .then(resultado=>console.log(resultado))
    .catch(error=>console.log(error));
    
// El valor de la primera que es aceptada termina(Solo el resultado)
Promise.race([promise1(), promise2(), promise3()])
    .then(resultado=>console.log(resultado))
    .catch(error=>console.log(error));