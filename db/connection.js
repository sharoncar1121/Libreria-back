const {Sequelize} = require('sequelize');

const sequelize= new Sequelize(
'biblioteca',
'root',
'Test123&24/',
    {
        host: process.env.DB_HOST,
        port:  process.env.DB_PORT,
        dialect: 'mysql'
    }
)

sequelize.authenticate()
    .then(() => console.log("Conexion se realizo exitosamente"))
    .catch(err => console.log("Ocurrio un error con la conexion" + err))

module.exports=sequelize