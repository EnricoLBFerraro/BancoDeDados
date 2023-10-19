const express = require('express');
const sequelize = require('./back-sequelize');
const Modelo_Login = require('./modelo_login');
const Modelo_Publi = require('./modelo_publi')
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json());
sequelize.sync()
    .then(() =>{
        console.log("Banco de dados sincronizado!");
    })
    .catch((error) =>{
        console.log("Erro ao conectar banco de dados: "+ error);
    });

app.get("/dadosLoginSequelize", async(req, res) =>{
    try{
        const logins = await Modelo_Login.findAll();
        res.json(logins);
    } catch(error){
        console.log("Erro na consulta: "+ error);
        res.status(500).send('Erro na consulta');
    }
});

app.get("/dadosPubliSequelize", async(req, res) =>{
    try{
        const publis = await Modelo_Publi.findAll();
        res.json(publis);
    } catch(error){
        console.log("Erro na consulta: "+ error);
        res.status(500).send('Erro na consulta');
    }
});


app.post("/adicionarPubli", async(req, res)=>{
    try{
        const {Titulo, Texto, Escritor, Imagem, Tipo_De_Publi, Data_da_Publi } = req.body;
        const novaPubli = Modelo_Publi.create({Titulo, Texto, Escritor, Imagem, Tipo_De_Publi, Data_da_Publi});
        res.json(novaPubli);
    } catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro ao adicionar publicação!")
    }
});

app.post('/adicionarlogin', (req,res) =>{
    try{
        const { Nome,Senha,Tipo_De_Login } = req.body;
        const novoLogin = Modelo_Login.create({Nome,Senha,Tipo_De_Login});
        res.json(novoLogin);
    } catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro ao adicionar usuário!")
    }
});


//VERIFICAÇÃO DE LOGIN
app.post('/login', async (req, res) =>{
    const {Nome, Senha} = req.body;
    try{
        const user = await Modelo_Login.findOne({where: {Nome}});
        if(!user){
            res.status(401).json({message: "Nome de usuário invalido!"})
            return;
        }

        if(Senha != user.Senha ){
            res.status(401).json({message: "Senha incorreta!"});
            return;
        }

        const token = jwt.sign({ userId: user.id }, 'Chave Secreta');
        console.log("Usuário autenticado, Toke: ", token)

    } catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro na verificação de Login")
    }
})

app.listen(3003,()=>{
    console.log('Servidor Express rodando na porta 3003');
})

//Para executar o código, algumas bibliotecas são necessarias: sequelize, mysql2, express, jsonwebtoken