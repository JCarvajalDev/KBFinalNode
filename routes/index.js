var express = require('express');
var session = require('express-session');
var router = express.Router();
var futbolistas=[];
var sql="select top 5 * from Person.person";

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session.token);
  if (typeof req.query.texto=='string'){
      sql="select top 5 * from Person.person where firstname like '%"+req.query.texto+"%' or lastname like '%"+req.query.texto+"%'";
  } 
  console.log(sql);
  //console.log(typeof req.query.texto);
    //res.send("Hay parámetros");
  if (typeof req.session.token==='undefined') res.send("Debe autenticarse");
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
connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    executeStatement()    
  }
})

function executeStatement () {
  request = new Request(sql, (err, rowCount) => {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { title: 'Usuarios', datos: tabla });    
    }
    connection.close()
  })

  var tabla=[];
  request.on('row', (columns) => {
     tabla.push({id:columns[0].value,
                nombre:columns[4].value,
                apellido:columns [6].value})
  })

 
  connection.execSql(request)
}

  
 
});

module.exports = router;
