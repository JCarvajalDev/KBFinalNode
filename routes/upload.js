var express = require('express');
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "D:\\KB Curso Node\\Modulo3\\uploads\\" });
var fs = require('fs');

console.log(__dirname+"\\uploads\\");

router.post('/', upload.single('archivo'), function(req, res) {
  var title = "archivo";
  var file = req.file;

  console.log(title);
  console.log(file);
  fs.renameSync(req.file.path,req.file.destination+req.file.originalname);
  res.sendStatus(200);
});

router.get('/', function(req, res, next) {
  res.render('uploadfile', { title: 'Usuarios del Sistema'});
});

module.exports = router;
