const Sequelize = require('sequelize')
const sequelize = new Sequelize('exemplo','root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso')
}).catch(function(erro){
    console.log('Erro ao conectar: '+erro)
})

const Agendamentos = sequelize.define('agendamentos', {
    nome: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING
    },

    telefone: {
        type: Sequelize.STRING
    },

    cpf: {
        type: Sequelize.STRING
    },

    data: {
        type: Sequelize.STRING
    },

    hora: {
        type: Sequelize.STRING
    }
})

Agendamentos.create({
    nome: 'João Pedro',
    email: 'joao123@gmail.com',
    telefone: '123456789',
    cpf: '987654321',
    data: '2025-02-27',
    hora: '12:00'
})