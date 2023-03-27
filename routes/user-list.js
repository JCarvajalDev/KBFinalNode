var express = require("express");
var router = express.Router();
const { Connection, Request } = require("tedious");

// Configurar la conexión
const config = {
    server: "10.7.0.13",
    authentication: {
        type: "default",
        options: {
            userName: "usr_prueba",
            password: "Pf123456",
        },
    },
    options: {
        database: "AdventureWorks2017",
        encrypt: false, // Utilizar SSL
        trustServerCertificate: true, // Aceptar certificados no confiables
        port: 64573, // Especificar el puerto aquí
    },
};

//instancio una conexion segun "x" configuracion
var connection = new Connection(config);

router.get("/", function (req, res, next) {

    function executeStatement() {
        const data = [];

        const SQL = "Select username, clave from usuarios";
        
        const request = new Request(SQL,(err, rowCount, rows) => {
                if (err) {
                    console.error(err.message);
                    res.render("index", {title: "Usuarios del Sistema"});
                } else {
                   // console.log(`${rowCount} filas devueltas`);
                    res.render("user-list", {title: "Usuarios del Sistema",usuarios: data, totalregistro:rowCount });
                }
                connection.close();
            }
        );

        request.on("row", (columns) => {
            const row = {};
            columns.forEach((column) => {
                if (column.value === null) {
                    console.log("NULL");
                } else {
                    //console.log(column.value);
                    row[column.metadata.colName] = column.value;
                }
            });
            data.push(row);
        });

        connection.execSql(request);
    }

    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            executeStatement();
        }
    });
});

module.exports = router;
