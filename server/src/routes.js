// bibliotecas
const express = require('express');
const routes  = express.Router();
const valUser = require('connect-ensure-login')

// controllers
const UsuarioController    = require('./controllers/UsuarioController');
const VendedorController   = require('./controllers/VendedorController');
const ClienteController    = require('./controllers/ClienteController');
const FornecedorController = require('./controllers/FornecedorController');
const ProdutoController    = require('./controllers/ProdutoController');
const ProdutoEmFalta       = require('./controllers/ProdutoEmFaltaController');

// Rotas

// Cadastro de usuário
routes.post('/usuario'       , (req,res) => UsuarioController.create(req,res) );
routes.get('/usuario'        , (req,res) => UsuarioController.store(req,res)  );
routes.get('/usuario/:id'    , valUser.ensureLoggedIn(), (req,res) => UsuarioController.read(req,res)   );
routes.put('/usuario/:id'    , valUser.ensureLoggedIn(), (req,res) => UsuarioController.update(req,res) );
routes.delete('/usuario/:id' , valUser.ensureLoggedIn(), (req,res) => UsuarioController.delete(req,res) );

// Cadastro de vendedores
routes.post('/vendedor'       , valUser.ensureLoggedIn(), (req,res) => VendedorController.create(req,res) );
routes.get('/vendedor'        , valUser.ensureLoggedIn(), (req,res) => VendedorController.store(req,res)  );
routes.get('/vendedor/:id'    , valUser.ensureLoggedIn(), (req,res) => VendedorController.read(req,res)   );
routes.put('/vendedor/:id'    , valUser.ensureLoggedIn(), (req,res) => VendedorController.update(req,res) );
routes.delete('/vendedor/:id' , valUser.ensureLoggedIn(), (req,res) => VendedorController.delete(req,res) );

// Cadastro de clientes
routes.post('/cliente'       , valUser.ensureLoggedIn(), (req,res) => ClienteController.create(req,res) );
routes.get('/cliente'        , valUser.ensureLoggedIn(), (req,res) => ClienteController.store(req,res)  );
routes.get('/cliente/:id'    , valUser.ensureLoggedIn(), (req,res) => ClienteController.read(req,res)   );
routes.put('/cliente/:id'    , valUser.ensureLoggedIn(), (req,res) => ClienteController.update(req,res) );
routes.delete('/cliente/:id' , valUser.ensureLoggedIn(), (req,res) => ClienteController.delete(req,res) );

// Cadastro de fornecedores
routes.post('/fornecedor'       , valUser.ensureLoggedIn(), (req,res) => FornecedorController.create(req,res) );
routes.get('/fornecedor'        , valUser.ensureLoggedIn(), (req,res) => FornecedorController.store(req,res)  );
routes.get('/fornecedor/:id'    , valUser.ensureLoggedIn(), (req,res) => FornecedorController.read(req,res)   );
routes.put('/fornecedor/:id'    , valUser.ensureLoggedIn(), (req,res) => FornecedorController.update(req,res) );
routes.delete('/fornecedor/:id' , valUser.ensureLoggedIn(), (req,res) => FornecedorController.delete(req,res) );

// Cadastro de produtos
routes.post('/produto'       , valUser.ensureLoggedIn() , (req,res) => ProdutoController.create(req,res) );
routes.get('/produto'        , (req,res) => ProdutoController.store(req,res)  );
routes.get('/produto/:id'    , valUser.ensureLoggedIn() , (req,res) => ProdutoController.read(req,res)   );
routes.put('/produto/:id'    , valUser.ensureLoggedIn() , (req,res) => ProdutoController.update(req,res) );
routes.delete('/produto/:id' , valUser.ensureLoggedIn() , (req,res) => ProdutoController.delete(req,res) );

// Cadastro de produtos em falta
routes.post('/produtoFalta'       , valUser.ensureLoggedIn(), (req,res) => ProdutoEmFalta.create(req,res) );
routes.get('/produtoFalta'        , valUser.ensureLoggedIn(), (req,res) => ProdutoEmFalta.store(req,res)  );
routes.get('/produtoFalta/:id'    , valUser.ensureLoggedIn(), (req,res) => ProdutoEmFalta.read(req,res)   );
routes.put('/produtoFalta/:id'    , valUser.ensureLoggedIn(), (req,res) => ProdutoEmFalta.update(req,res) );
routes.delete('/produtoFalta/:id' , valUser.ensureLoggedIn(), (req,res) => ProdutoEmFalta.delete(req,res) );

routes.get('/login', (req, res)=>{
    return res.status(401).json('unauthorized')
})

routes.get('/logout', (req, res)=>{
    req.logout()
    return res.status(200).json('logout authorized')
})

module.exports = routes;