
// alert ----------------------------------------------------------------
//  es un metodo que nos permite mostrar un mensaje en pantalla, 
// es una ventana emergente que bloquea la interacción con la página hasta 
// que el usuario cierre la alerta.

alert('hola mundo');

// prompt ----------------------------------------------------------------
// es un metodo que nos permite mostrar un mensaje en pantalla 
// y solicitar al usuario que ingrese un valor, es una ventana emergente 
// que bloquea la interacción con la página hasta que el usuario cierre la alerta.

let nombre= prompt('Ingrese su nombre: ', 'Sin nombre');

console.log({nombre});


// confirm --------------------------------------------------------------------------
// es un metodo que nos permite mostrar un mensaje en pantalla
// y solicitar al usuario que confirme o cancele una acción, es una ventana emergente
// que bloquea la interacción con la página hasta que el usuario cierre la alerta.

const confirmar = confirm('Estas seguro de que quieres salir?');

console.log({confirmar});


/*
estos metodos son bloqueantes, es decir, que detienen la ejecución del código hasta 
que el usuario interactúe con la alerta, prompt o confirm.

no se pueden usar en el backend, ya que no hay una interfaz de usuario para 
interactuar con el usuario.
*/