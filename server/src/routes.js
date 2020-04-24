// bibliotecas
const express        = require('express');
const routes         = express.Router();
//const valUser        = require('connect-ensure-login');
const authMiddleware = require('./middlewares/auth');


// controllers
const Authenticate         = require('./controllers/Authenticate');
const UsuarioController    = require('./controllers/UsuarioController');
const VendedorController   = require('./controllers/VendedorController');
const ClienteController    = require('./controllers/ClienteController');
const FornecedorController = require('./controllers/FornecedorController');
const ProdutoController    = require('./controllers/ProdutoController');
const ProdutoEmFalta       = require('./controllers/ProdutoEmFaltaController');

// Rotas

// Authenticate
routes.post('/authenticate', Authenticate.logar);
routes.use(authMiddleware);

// Cadastro de usuário
routes.post('/usuario'       , (req,res) => UsuarioController.create(req,res) );
routes.get('/usuario'        , (req,res) => UsuarioController.store(req,res)  );
routes.get('/usuario/:id'    , (req,res) => UsuarioController.read(req,res)   );
routes.put('/usuario/:id'    , (req,res) => UsuarioController.update(req,res) );
routes.delete('/usuario/:id' , (req,res) => UsuarioController.delete(req,res) );

// Cadastro de vendedores
routes.post('/vendedor'       , (req,res) => VendedorController.create(req,res) );
routes.get('/vendedor'        , (req,res) => VendedorController.store(req,res)  );
routes.get('/vendedor/:id'    , (req,res) => VendedorController.read(req,res)   );
routes.put('/vendedor/:id'    , (req,res) => VendedorController.update(req,res) );
routes.delete('/vendedor/:id' , (req,res) => VendedorController.delete(req,res) );

// Cadastro de clientes
routes.post('/cliente'       , (req,res) => ClienteController.create(req,res) );
routes.get('/cliente'        , (req,res) => ClienteController.store(req,res)  );
routes.get('/cliente/:id'    , (req,res) => ClienteController.read(req,res)   );
routes.put('/cliente/:id'    , (req,res) => ClienteController.update(req,res) );
routes.delete('/cliente/:id' , (req,res) => ClienteController.delete(req,res) );

// Cadastro de fornecedores
routes.post('/fornecedor'       , (req,res) => FornecedorController.create(req,res) );
routes.get('/fornecedor'        , (req,res) => FornecedorController.store(req,res)  );
routes.get('/fornecedor/:id'    , (req,res) => FornecedorController.read(req,res)   );
routes.put('/fornecedor/:id'    , (req,res) => FornecedorController.update(req,res) );
routes.delete('/fornecedor/:id' , (req,res) => FornecedorController.delete(req,res) );

// Cadastro de produtos
routes.post('/produto'       , (req,res) => ProdutoController.create(req,res) );
routes.get('/produto'        , (req,res) => ProdutoController.store(req,res)  );
routes.get('/produto/:id'    , (req,res) => ProdutoController.read(req,res)   );
routes.put('/produto/:id'    , (req,res) => ProdutoController.update(req,res) );
routes.delete('/produto/:id' , (req,res) => ProdutoController.delete(req,res) );

routes.delete('/produto/search' , (req,res) => ProdutoController.delete(req,res) );

// Cadastro de produtos em falta
routes.post('/produtoFalta'       , (req,res) => ProdutoEmFalta.create(req,res) );
routes.get('/produtoFalta'        , (req,res) => ProdutoEmFalta.store(req,res)  );
routes.get('/produtoFalta/:id'    , (req,res) => ProdutoEmFalta.read(req,res)   );
routes.put('/produtoFalta/:id'    , (req,res) => ProdutoEmFalta.update(req,res) );
routes.delete('/produtoFalta/:id' , (req,res) => ProdutoEmFalta.delete(req,res) );

module.exports = routes;