const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const Agendamentos = require("./models/post"); 

app.engine("handlebars", engine({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", async (req, res) => {
  res.render("primeira_pagina");
});

app.get("/consulta", async (req, res) => {
  try {
    const posts = await Agendamentos.findAll();
    res.render("consulta", { posts });
  } catch (erro) {
    res.send("Erro ao listar os registros: " + erro);
  }
});

app.post("/cadastrar", async (req, res) => {
  try {
    await Agendamentos.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      origem: req.body.origem,
      data_contato: req.body.data_contato,
      observacao: req.body.observacao,
    });
    res.redirect("/");
  } catch (erro) {
    res.send("Erro: Dados não enviados! " + erro);
  }
});

app.get("/atualiza/:id", async (req, res) => {
  try {
    const agendamento = await Agendamentos.findByPk(req.params.id);
    if (!agendamento) {
      return res.send("Agendamento não encontrado!");
    }
    res.render("atualiza", { agendamento: agendamento.toJSON() });
  } catch (erro) {
    res.send("Erro ao buscar agendamento: " + erro);
  }
});

app.post("/editar/:id", async (req, res) => {
  try {
    await Agendamentos.update(
      {
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
      },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  } catch (erro) {
    res.send("Erro ao atualizar o agendamento: " + erro);
  }
});

app.get("/excluir/:id", async (req, res) => {
  try {
    await Agendamentos.destroy({ where: { id: req.params.id } });
    res.redirect("/consulta");
  } catch (erro) {
    res.send("Erro ao excluir o registro: " + erro);
  }
});

app.listen(8081, () => {
  console.log("Servidor rodando na url http://localhost:8081");
});
