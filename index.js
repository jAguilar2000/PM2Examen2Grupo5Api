const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    const htmlResponse = `
        <html>
            <head>
                <title>SitioApi</title>
            </head>
            <body>
                <h1>Sitio-Api Grupo 5 </h1>
            </body>
        </html>
    `;
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`port runing in http://localhost:${port}`);
});