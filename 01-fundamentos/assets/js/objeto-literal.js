
// Objeto literal, es una forma de crear un objeto en javascript
// Un objeto es una colección de propiedades, cada propiedad tiene un nombre y un valor
// se crea con let o const , const es preferible ya que no se puede reasignar el objeto, 
// pero si se pueden cambiar sus propiedades

let personaje={
    nombre: 'Tony Stark',
    codeName: 'Ironman',
    vivo: false,
    edad: 40,
    coords: {
        lat: 34.034,
        lng: -118.70
    },
    trajes: ['Mark I', 'Mark V', 'Hulkbuster'],
    'ultima-pelicula': 'Infinity War'   
    }

console.log(personaje);

console.log('Coordenadas: ', personaje.coords);
console.log('Latitud: ', personaje.coords.lat);
console.log(`Longitud: ${personaje.coords.lng} `);

console.log('Última película: ', personaje['ultima-pelicula']);


//añadir propiedades a un objeto literal
personaje.casado = true;
console.log('Casado: ', personaje.casado);      


//eliminar propiedades a un objeto literal
delete personaje.casado;
console.log('Casado: ', personaje.casado);

//cambiar propiedades a un objeto literal
personaje.edad = 45;
console.log('Edad: ', personaje.edad);


//si no queremos que se puedan añadir, eliminar o cambiar propiedades a un objeto literal, podemos usar Object.freeze()
Object.freeze(personaje);
personaje.edad = 50;
console.log('Edad: ', personaje.edad);
