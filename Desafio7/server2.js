const { optionsMySQL } = require('./options/mysql.js')
const knex = require("knex")(optionsMySQL)

const productos = []

knex.from("productos").select("*")
.then((rows) => {
    for (const row of rows) {
        const producto = {
            id: row['id'],
            title: row ['title'],
            price: row['price'],
            thumbnail: row['thumbnail']
        }
        productos.push(producto)
        
        //console.log(`${row[ "id" ]} ${row[ "title" ]} ${row[ "price" ]}`)
    }
    }).catch((err) => { console.log(err); throw err })
    .finally(() => {
        console.log(productos)
        knex.destroy()
    })