// bibliotecas
const express  = require('express');
const app      = express();
const cors     = require('cors');

// internas
const routes   = require('./routes');
const UsuarioController = require('./controllers/UsuarioController');

const passport = require('passport')
const Strategy = require('passport-local').Strategy

passport.use(new Strategy(
    function(username, password, cb) {
        UsuarioController.findByUsername(username, (err, user) => {
            if (err) { return cb(err) }
            if (!user) { return cb(null, false) }
            if (user.senha != password) { return cb(null, false) }
            return cb(null, user)
        })
}))

passport.serializeUser( (user, cb) => {
    cb(null, user.id)
})
  
passport.deserializeUser((id, cb) => {
    UsuarioController.findById(id, (err, user) => {
        if (err) { return cb(err) }
        cb(null, user)
    })
})

app.use(cors());
app.use(express.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.post('/logon', passport.authenticate('local', {failureRedirect: '/logout' }), (req,res)=>{
    //authorized
    const id = req.user.id;
    const nome = req.user.nome;
    const nomeUsuario = req.user.nomeUsuario
    return res.status(200).json({id, nome, nomeUsuario});
})

module.exports = app;