const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

// Increase the limit to 50mb for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

/// CONFIGURACION DE LA BASE DE DATOS

const db = mysql.createConnection({
    host: '104.198.183.67',
    user: 'admin',
    password: '12345',
    database: 'PM2Examen2Grupo5'
});

db.connect((err) => {
    if (err) {
        console.log('Error no esta conectado a la base de datos ', err);
        return;
    }

    console.log('Conectado a la base de datos');
});

// Method Create
app.post('/api/sitios', (req, res) => {

    const { descripcion, latitud, longitud, firmaDigital, audioFile } = req.body;
    const consulta = 'INSERT INTO Sitios (Descripcion, Latitud, Longitud, FirmaDigital, AudioFile) VALUES (?, ?, ?, ?,?)';

    db.query(consulta, [descripcion, latitud, longitud, firmaDigital, audioFile], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(result);
    });

});

// Read
app.get('/api/sitios', (req, res) => {

    const consulta = "SELECT Id, Descripcion, Latitud, Longitud, CAST(FirmaDigital  AS CHAR) 'FirmaDigitalStr', CAST(AudioFile  AS CHAR) 'AudioFileStr' FROM Sitios";
    db.query(consulta, (err, result) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send(result);
    });

});


//filtro get
app.get('/api/sitios-busqueda', (req, res) => {

    const { busqueda } = req.body;
    const { filtro } = req.query;

    const consulta = `SELECT Id, Descripcion, Latitud, Longitud FROM Sitios WHERE Descripcion LIKE '%${busqueda}%'`;
    db.query(consulta, [busqueda], (err, result) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send(result);
    });

});

// Update
app.put('/api/sitios', (req, res) => {

    const { descripcion, latitud, longitud, firmaDigital, audioFile, id } = req.body;

    const consulta = 'UPDATE Sitios SET Descripcion=?, Latitud=?, Longitud=?, FirmaDigital=?, AudioFile=? WHERE id=?';
    db.query(consulta, [descripcion, latitud, longitud, firmaDigital, audioFile, id], (err, result) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send();
    });
});

// Delete
app.delete('/api/sitios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Sitios WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send();
    })
});

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});