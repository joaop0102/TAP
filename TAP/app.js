const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const Agendamentos = require("./models/post"); // Corrigido para o nome correto

// Configuração do Handlebars
app.engine("handlebars", engine({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set("view engine", "handlebars");

// Configuração do Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota inicial - Lista todos os registros
app.get("/", async (req, res) => {
  try {
    const posts = await Agendamentos.findAll();
    res.render("consulta", { posts });
  } catch (erro) {
    res.send("Erro ao listar os registros: " + erro);
  }
});

// Rota para exibir o formulário de cadastro
app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

// Rota para cadastrar um novo registro
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

// Rota para exibir a página de atualização com os dados carregados
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

// Rota para atualizar um agendamento
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

// Rota para excluir um registro
app.get("/excluir/:id", async (req, res) => {
  try {
    await Agendamentos.destroy({ where: { id: req.params.id } });
    res.redirect("/");
  } catch (erro) {
    res.send("Erro ao excluir o registro: " + erro);
  }
});

// Servidor rodando na porta 8081
app.listen(8081, () => {
  console.log("Servidor rodando na url http://localhost:8081");
});
