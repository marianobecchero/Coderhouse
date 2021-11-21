const knexLib = require("knex")

class ClienteSql {
    constructor(config, tabla) {
      this.knex = knexLib(config)
      this.tabla = tabla
    }

    crearTablaMensajes(){
      this.knex.schema.hasTable(this.tabla).then(function(exists){
        if (!exists){
          return this.knex.schema.createTable(this.tabla, function(t) {
            t.string('email', 50).notNullable();
            t.string('fecha', 50).notNullable();
            t.string('mensaje', 200).notNullable();
          })
        }
      })
    }

    crearTablaProductos(){
      this.knex.schema.hasTable(this.tabla).then(function(exists){
        if (!exists){
          return this.knex.schema.createTable(this.tabla, function(t) {
            table.increments('id').primary();
            t.string('title', 50).notNullable();
            t.float('price').notNullable();
            t.string('thumbnail', 200).notNullable();
          })
        }
      })
    }
  
    /*crearTabla() {
      return this.knex.schema.dropTableIfExists(this.tabla)
        .finally(() => {
          return this.knex.schema.createTableIfNotExists(this.tabla, table => {
            //table.increments('id').primary();
            table.string('email', 50).notNullable();
            table.string('fecha', 50).notNullable();
            table.string('mensaje', 200).notNullable();
          })
        })
    }*/
  
    insertar(producto) {
      return this.knex(this.tabla).insert(producto)
    }
  
    listarTodos() {
      return this.knex(this.tabla).select('*')
    }

    listarById(id){
        return this.knex.from(this.tabla).select('*').where('id', id)
    }

    /*modificarProductoById(producto){
        return this.knex.from(this.tabla).where('id', producto.id).update({
          title: producto.title,
          price: producto.price,
          thumbnail: producto.thumbnail
        })
    }*/
  
    borrarPorId(id) {
      return this.knex.from(this.tabla).where('id', id).del()
    }
  
    close() {
      this.knex.destroy();
    }
  }
  
  module.exports = {ClienteSql};