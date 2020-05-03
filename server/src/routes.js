// bibliotecas
const express        = require('express');
const routes         = express.Router();
//const valUser        = require('connect-ensure-login');
const authMiddleware = require('./middlewares/auth');


// controllers
const Authenticate           = require('./controllers/Authenticate');
const ProprietarioController = require('./controllers/ProprietarioController');
const UsuarioController      = require('./controllers/UsuarioController');
const VendedorController     = require('./controllers/VendedorController');
const ClienteController      = require('./controllers/ClienteController');
const FornecedorController   = require('./controllers/FornecedorController');
const ProdutoController      = require('./controllers/ProdutoController');
const ProdutoEmFalta         = require('./controllers/ProdutoEmFaltaController');
const VendaController        = require('./controllers/VendaController');
const EmpresaController      = require('./controllers/EmpresaController');
const ResultadoController    = require('./controllers/ResultadoController');

// Rotas

// Authenticate
routes.post('/authenticate'  , Authenticate.logar);
routes.post('/new_user'      , (req,res) => ProprietarioController.create(req,res) );
routes.use(authMiddleware);
routes.get('/test', (req, res) => res.status(200).send('ok'));

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

// Cadastro da empresa
routes.post('/empresa'       , (req,res) => EmpresaController.create(req,res) );
routes.get('/empresa'        , (req,res) => EmpresaController.store(req,res)  );
routes.get('/empresa/:id'    , (req,res) => EmpresaController.read(req,res)   );
routes.put('/empresa/:id'    , (req,res) => EmpresaController.update(req,res) );
routes.delete('/empresa/:id' , (req,res) => EmpresaController.delete(req,res) );

// Orcamento
routes.post('/orcamento' , (req,res) => VendaController.create(req,res) );
routes.get('/orcamento'  , (req,res) => VendaController.store(req,res)  );

routes.post('/venda'    , (req,res) => VendaController.create(req,res) );
routes.get('/venda'     , (req,res) => VendaController.store(req,res)  );
routes.get('/venda/:id' , (req,res) => VendaController.read(req,res)  );

// Resutados
routes.get('/res_comissao_vendedor', (req,res) => ResultadoController.ComissaoPorVendedor(req,res));

module.exports = routes;