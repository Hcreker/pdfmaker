const express = require('express'); 
const bodyParser = require('body-parser'); 
const userController = require('./controllers/relatorioController'); 
const app = express(); // Cria uma instância do aplicativo Express.

// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs'); 

// Middleware para parsing do body
app.use(bodyParser.urlencoded({ extended: false })); 

// Rota para o arquivo relatorio.ejs
app.get('/', userController.getAllUsers);

// Rota para o gerador de PDF
app.get('/relatorio/pdf', userController.generatePDF);

// Iniciar o servidor
app.listen(2000, () => { 
    console.log('Servidor rodando na porta 2000'); 
});