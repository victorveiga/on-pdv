const app = require('./app');

const porta = 3333;
app.listen(porta, function() {
    console.log('Servidor iniciado na porta: ' + porta);
    console.log('Para derrubar o servidor: ctrl + c');
})