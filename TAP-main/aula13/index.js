console.log('Mensagem a ser exibida')

var n1 = 10
var n2 = 15
var multi = n1 * n2
var subtracao = n1 - n2
var soma = n1 + n2
var divisao = n1 / n2
var resto = n1 % n2

console.log('Resultado: ', multi, subtracao, soma, divisao, resto)

var total = n1 + n2

if(total <= 10){
    console.log('O total é menor que 10')
}else{
    console.log('O total é maior que 10')
}

var sm = require('./expor-mold.js')
 console.log(sm(10, 23))