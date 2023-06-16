const express = require('express');

const app = express();
const port = 3000;

app.use(express.json())

// Utilizaremos un arreglo denominado libros, para almacenar la información
const libros = require('./libros.json')
console.log(libros)
/**
 * {
 *  id: number,
 *  autor: string,
 *  edicion: number,
 *  nombre: string
 * }
 */

/**
 * CRUD - LIBROS
 */

//1. Creación
app.post('/libros', (req, res) => {
    const libroNuevo = req.body
    libros.push(libroNuevo)
    res.status(201).send({
        mensaje: 'Libro creado exitosamente'
    })
})

//2. Leer
    // 2.1 Leer un unico registro
    app.get('/libros/:id', (req, res) => {
        const id = req.params.id
        const libro = libros.find(libro => libro.id == id)

        if (libro) {
            res.status(200).send(libro)
        } else {
            res.status(404).send({
                mensaje: "Libro no encontrado"
            })
        }
    })

    app.get('/libros', (req, res) => {
        res.status(200).send(libros)
    })

// 3. Actualización
app.put('/libros', (req, res) => {
    const libro = req.body
    const idLibro = libro.id

    const posicion = libros.findIndex(libro => libro.id == idLibro)
    /**
     * findIndex entrega 2 tipos de respuesta
     * numero diferente a -1: este indica la posicion del objeto en el arreglo
     * -1: Esto indica que el objeto no existe en el arreglo
     */

    if (posicion !== -1){
        libros[posicion] = libro;
        res.status(200).send({
            mensaje: 'Libro actualizado'
        })
    } else {
        res.status(404).send({
            mensaje: 'Libro no encontrado'
        })
    }
})


app.delete('/libros/:id', (req, res) => {
    const id = req.params.id
    libros = libros.filter(libro => libro.id != id)
    res.status(200).send(libros)
})

app.listen(port, () => {
    console.log('Servidor corriendo')
})