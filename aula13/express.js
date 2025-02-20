const express = require("express") // Importação do módulo
const app = express() // Criando o servidor web com a porta 8081

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/testeHtml/index.html")
})

app.get("/contato", function(req, res) {
    res.end("Rota contato")
})

app.get("/produtos/:item/:num", function(req, res) {
    res.end("Rota: " + req.params.item + req.params.num)
})

app.listen(8081, function() {
    console.log("Servidor web está rodando na porta 8081")
})