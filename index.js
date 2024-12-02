const express = require('express')
const Libros = require('./Modelo/Libros')

const cors = require('cors')
const app = express()

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())

app.get('/libros', async (req, res) =>{
    try {

        const libro= await Libros.findAll()

        res.status(200).json(libro);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})

app.post('/libros-post', async (req, res) =>{
    try {

       const libro = await Libros.create(req.body)

        res.status(200).json(libro);

    }catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});

    }
})

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