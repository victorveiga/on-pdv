const awt                    = require('jsonwebtoken');
const AuthConfig             = require('../authConfig.json');
const ProprietarioController = require('./ProprietarioController');


class Authenticate {

    async logar(req, res){
        const {username, password} = req.body;
        const user = await ProprietarioController.findByUsername(username);
    
        if (!user) return res.status(400).send({error: 'User not found'});
        if (user.senha != password) return res.status(400).send({error: 'Invalid password'});
        
        const token = awt.sign({id: user.id}, AuthConfig.secret, {expiresIn: 3600});

        return res.status(200).json({nomeUsuario : user.nomeUsuario, nome: user.nome,token});
    }

}

module.exports = new Authenticate();