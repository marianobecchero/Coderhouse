class Usuario {
    
    constructor (nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return `El nombre completo es ${this.apellido} ${this.nombre}`;
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        let nuevoLibro = {};
        nuevoLibro.nombre = nombre;
        nuevoLibro.autor = autor;
        this.libros.push(nuevoLibro);
    }

    getBookNames(){
        let listaLibros = [];
        for (let i=0; i < this.libros.length; i++){
            listaLibros.push(this.libros[i].nombre);
        }
        return listaLibros;
    }

}

const usuario = new Usuario("Mariano", "Becchero");

    console.log(usuario.getFullName());
    
    usuario.addMascota("Grisa");
    usuario.addMascota("Nina");
    usuario.addMascota("Juli");
    console.log(usuario.mascotas);
    console.log(usuario.countMascotas());

    usuario.addBook("Jobs", "Steve");
    usuario.addBook("Padre rico, padre pobre", "Robert Kiyosaki");
    console.log(usuario.libros);
    console.log(usuario.getBookNames());