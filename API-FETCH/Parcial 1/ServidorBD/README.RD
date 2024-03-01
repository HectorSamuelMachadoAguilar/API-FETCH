# Gestor de Empleados

Este módulo proporciona una API para gestionar empleados en una base de datos.

## Instalación

Para instalar el módulo, puedes ejecutar el siguiente comando en tu terminal:

```
npm install gestor-empleados
```

## Uso

Primero, debes importar el módulo en tu aplicación:

```javascript
const gestorEmpleados = require('gestor-empleados');
```

### Agregar un nuevo empleado

```javascript
const nuevoEmpleado = {
  nombre: 'Juan',
  apellido: 'Pérez',
  edad: 30,
  cargo: 'Desarrollador'
};

gestorEmpleados.agregarEmpleado(nuevoEmpleado)
  .then(() => {
    console.log('Empleado agregado correctamente');
  })
  .catch((error) => {
    console.error('Error al agregar empleado:', error);
  });
```

### Obtener todos los empleados

```javascript
gestorEmpleados.obtenerEmpleados()
  .then((empleados) => {
    console.log('Lista de empleados:', empleados);
  })
  .catch((error) => {
    console.error('Error al obtener empleados:', error);
  });
```

### Actualizar un empleado

```javascript
const empleadoActualizado = {
  id: 1,
  nombre: 'Nuevo nombre',
  apellido: 'Nuevo apellido',
  edad: 35,
  cargo: 'Analista'
};

gestorEmpleados.actualizarEmpleado(empleadoActualizado)
  .then(() => {
    console.log('Empleado actualizado correctamente');
  })
  .catch((error) => {
    console.error('Error al actualizar empleado:', error);
  });
```

### Eliminar un empleado

```javascript
const idEmpleado = 1;

gestorEmpleados.eliminarEmpleado(idEmpleado)
  .then(() => {
    console.log('Empleado eliminado correctamente');
  })
  .catch((error) => {
    console.error('Error al eliminar empleado:', error);
  });
```

## Contribuyendo

¡Si encuentras algún problema o tienes alguna idea para mejorar este módulo, no dudes en abrir un issue o enviar un pull request!

--- 

Este README proporciona a los usuarios una descripción general del módulo, instrucciones sobre cómo instalarlo y cómo usarlo con ejemplos de código. También invita a los usuarios a contribuir al proyecto si lo desean. Por supuesto, puedes personalizarlo según las necesidades específicas de tu módulo.