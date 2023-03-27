
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
/* GET productos listing. */
router.get('/', function(req, res, next) {   
    res.render('user-add', { title: 'Usuarios del Sistema', respuesta: ''});
});


router.post('/', function (req, res, next) {
    
    var encriptado="";
    var Connection = require('tedious').Connection
    var Request = require('tedious').Request
    // Configurar la conexión
    const config = {
        server: '10.7.0.13',
        authentication: {
            type: 'default',
            options: {
                userName: 'usr_prueba',
                password: 'Pf123456'
            }
        },
        options: {
            database: 'AdventureWorks2017',
            encrypt: false, // Utilizar SSL
            trustServerCertificate: true, // Aceptar certificados no confiables
            port: 64573 // Especificar el puerto aquí
        }
    };

    var connection = new Connection(config)

    bcrypt.genSalt(10)
          .then(salt=>{
            console.log('Salt:', 10);
            return bcrypt.hash(req.body.clave, 10)
          })
          .then ( hash =>{
            encriptado = hash;
          })
          .catch(err=>console.log(err.message))

    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            executeSQL();
        }
    })

    function executeSQL() {
        let sql = "insert into usuarios (username,clave) values (";
        sql = sql + " '" + req.body.username + "','" + encriptado + "');"
        request = new Request(sql, (err, rowCount) => {
            if (err) {
                res.send(err);
            } else {
                //res.send("Usuario agregado correctamente")


               // setTimeout(function() {
                    res.render('user-add', { title: 'Usuarios del Sistema',  respuesta: 'Usuario agregado correctamente'});
                 // }, 3000); // 2000 milisegundos = 2 segundos de retardo
            }
            connection.close()
        })
        connection.execSql(request)
    } 
});




module.exports = router;

