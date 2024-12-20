const express = require('express')
const Libros = require('./Modelo/Libros.js')

const cors = require('cors');
const Alquiler = require('./Modelo/Alquiler.js');
const Espera = require('./Modelo/Espera.js');
const app = express()

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())

function filtrarLibros(palabra, libros) {
    let LibrosFiltrados = [];
    libros.forEach((libro) => {
      const nombreLBD = libro.Nombre_libro.toLowerCase();
      const contiene = nombreLBD.includes(palabra.toLowerCase());
      if (contiene) {
        LibrosFiltrados = [...LibrosFiltrados, libro];
      }
    });
    return LibrosFiltrados;
  }


app.get('/libros', async (req, res) =>{
    try {

        const libro= await Libros.findAll()

        res.status(200).json(libro);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})

app.get('/libros/:Nombre_Libro', async (req, res) => {
    try {
    
      const libros = await Libros.findAll();
  
      const arregloBusqueda = req.params.Nombre_Libro.split(' ');
  
      
      let resultado = libros;
      arregloBusqueda.forEach((palabra) => {
        resultado = filtrarLibros(palabra, resultado);
      });
  
     
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error: ' + error });
    }
  });
  

app.post('/libros-post', async (req, res) =>{
    try {

       const libro = await Libros.create(req.body)

        res.status(200).json(libro);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})

//servicio para alquilar 
app.put('/libro/:id', async (req, res) =>{
    try {

        const estado = req.body.estado;
        const [update] = await Libros.update(
            { Estado: estado}, 
            { where: { Id_libro: req.params.id } }
        );
       
       if (update) {
        res.status(200).json({mensaje: 'Se actualizo el libro'}); 

       }
       else {
        res.status(400).json({mensaje: 'No se pudo actualizar el Libro'}); 

       }
    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});

    }
})

//servicio para habilitar espera del libro
app.put('/libro-espera/:id', async (req, res) =>{
    try {

        const espera = req.body.espera;
        const [update] = await Libros.update(
            { Espera: espera}, 
            { where: { Id_libro: req.params.id } }
        );
       
       if (update) {
        res.status(200).json({mensaje: 'Se actualizo el libro a modo espera'}); 

       }
       else {
        res.status(400).json({mensaje: 'No se pudo poner el libro en modo espera'}); 

       }

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});

    }
})

//servicio para obtener datos de la tabla alquiler
app.get('/alquiler', async (req, res) =>{
    try {

        const alquileres= await Alquiler.findAll()

        res.status(200).json(alquileres);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})

//servicio para postear datos en la tabla de Alquiler

app.post('/alquiler-post', async (req, res) =>{
    try {

       const alquiler = await Alquiler.create(req.body)

        res.status(200).json(alquiler);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})
//Api que trae los datos de la tabla espera
app.get('/espera', async (req, res) =>{
    try {

        const esperas= await Espera.findAll()

        res.status(200).json(esperas);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})

//servicio para postear datos en la tabla de Espera

app.post('/espera-post', async (req, res) =>{
    try {

       const espera = await Espera.create(req.body)

        res.status(200).json(espera);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})


app.delete('/libro/:id', async (req, res) =>{
        try {
    
            
           const deleted = await Libros.destroy({
            where: {Id_libro: req.params.id},
    
           });
           
           if (deleted) {
            res.status(200).send();

           }
           else {
            res.status(404).json({error: 'Libro no encontrado'}); 
    
           }   
    
        }catch (error) {
            res.status(500).json({error: 'Ocurrio un error al eliminar el libro'});
    
        }

});

app.listen(5000,() => {
   console.log('Aplicacion ejecutando en el puerto 5000') 
})