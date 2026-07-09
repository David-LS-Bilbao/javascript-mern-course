// Propiedades y metodos privados

class Rectangulo {

    // Las propiedades privadas se declaran con #.
    // Solo se pueden leer o modificar dentro de la clase donde fueron declaradas.
    #area = 0;
    #perimetro = 0;

    constructor(base = 0, altura = 0) {
        // base y altura son propiedades publicas.
        // Se pueden leer desde fuera de la clase: rectangulo.base
        this.base = base;
        this.altura = altura;

        // #area y #perimetro son propiedades privadas.
        // Solo la clase Rectangulo puede acceder a ellas.
        this.#area = this.#calcularArea();
        this.#perimetro = this.#calcularPerimetro();
    }

    // Este es un metodo privado.
    // Solo puede ser llamado desde dentro de la clase Rectangulo.
    #calcularArea() {
        return this.base * this.altura;
    }

    // Otro metodo privado.
    // Se usa internamente para calcular el perimetro.
    #calcularPerimetro() {
        return this.base * 2 + this.altura * 2;
    }

    // Los getters publicos permiten consultar valores privados de forma controlada.
    get area() {
        return this.#area;
    }

    get perimetro() {
        return this.#perimetro;
    }

    // Metodo publico: se puede llamar desde fuera de la clase.
    mostrarInfo() {
        console.log(`Rectangulo de ${this.base} x ${this.altura}`);
        console.log(`Area: ${this.#area}`);
        console.log(`Perimetro: ${this.#perimetro}`);
    }
}

const rectangulo = new Rectangulo(10, 20);
console.log(rectangulo);

// Las propiedades publicas se pueden leer directamente.
console.log(rectangulo.base); // 10
console.log(rectangulo.altura); // 20

// Las propiedades privadas se consultan mediante getters publicos.
console.log(rectangulo.area); // 200
console.log(rectangulo.perimetro); // 60

rectangulo.mostrarInfo();

const rec2 = new Rectangulo(15, 23);
console.log(rec2);
console.log(rec2.area); // 345

// Esto no se puede hacer porque #area es privada.
// Si se descomenta, JavaScript dara error de sintaxis.
// console.log(rectangulo.#area);

// Esto tampoco se puede hacer porque #calcularArea es un metodo privado.
// rectangulo.#calcularArea();

