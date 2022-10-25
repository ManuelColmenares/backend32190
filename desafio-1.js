class Usuario {
    constructor(nombre, apellido,) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

        getFullName(){ // Retorna nombre completo del Usuario.
            return `Nombre Completo: ${this.nombre} ${this.apellido}`;
        }
        addMascotas(mascota){ // Agrega una mascota al arr mascotas.
            this.mascotas.push(mascota);
            
        }
        countMascotas() { // Retorna cuantas mascotas hay en el arr segun la longitud del mismo. 
            return (`Mascotas: ${this.mascotas.length}`);
        }
        addBook(title, autor) { //Agrega un nuevo objeto al arr libros.
            const book = {titulo: title, autor: autor,}
            this.libros.push(book);
        }
        getBookNames() { // Retorna el nombre de los libros existentes en el arr libros.
            return this.libros.map((libros) => libros.titulo);
        }
}

//  Se crea un Usuario llamado persona
let persona = new Usuario("Carlos", "Santana"); 

console.log(persona.getFullName()); // Nombre Completo: Carlos Santana

// Agregamos las mascotas de la persona 
persona.addMascotas('Gato');
persona.addMascotas('Perro');
persona.addMascotas('Loro')

console.log(persona.countMascotas()); // Delvulve la cantidad de mascotas que tiene persona (3)

// Agregamos un libro a persona
persona.addBook('Eloquent JavaScript', 'Marijn Haverbeke');

console.log(persona.getBookNames()); //Devuelve ['Eloquent JavaScript']

// Se crea un segundo Usuario llamado persona2
let persona2 = new Usuario("María", "Rodriguez");

console.log(persona2.getFullName()); // Nombre Completo: María Rodriguez

// Agregamos las mascotas de la persona 2
persona2.addMascotas('Pez')
persona2.addMascotas('Mono')

// Agregamos dos libro a la persona 2
persona2.addBook('Padre Rico Padre Pobre', 'Robert Kiyosaki');
persona2.addBook('Sálvese Quien Pueda', 'Andrés Oppenheimer');


console.log(persona2.countMascotas());// Delvulve la cantidad de mascotas que tiene persona2 (2)

console.log(persona2.getBookNames());   //Devuelve  ['Padre Rico Padre Pobre', 'Sálvese Quien Pueda']
