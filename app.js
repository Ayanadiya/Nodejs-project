const http = require('http');


const server = http.createServer((req, res) => {
    console.log("Ayana");
});

server.listen(4000);