var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  //req.session.token="";
  res.render("usuariologin",{title:"Login",datos:""})
});

/* GET users listing. */
router.post('/', function(req, res, next) {

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
connection.connect((err) => {
  if (err) {
   console.log(err)
  } else {
    executeStatement()    
 }
})

function executeStatement () {
  let s="Select * from usuarios where username='"+req.body.username+"';"
  request = new Request(s, (err, rowCount) => {
    if (err) {
      res.send(err);
    } else {
    
      if (tabla.length>0)
    
        bcrypt.compare(req.body.password,tabla[0].password,function(error,result){
            if (result) {
              var token = jwt.sign({
                name: req.body.username
              }, "xyz")
              req.session.token=token;
              //res.send(token)
              res.render("menu");
            }
            else       
             res.send("Clave Inválido", req.body.password, tabla[0].password);   
            });
        else{
          res.send("Usuario NO encontrado");
          res.render("usuariologin");
        }
   
    }
    connection.close()
  })

  var tabla=[];
  request.on('row', (columns) => {
       tabla.push({username:columns[0].value,password:columns[1].value})
  
  })
  

  connection.execSql(request)
}


});

module.exports = router;
