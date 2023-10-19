(async () => {
    const database = require('./back-sequelize');
    const Modelo_Login = require('./modelo_login');
    const Modelo_Publi = require('./modelo_publi');
    await database.sync();


    //const novologin = Modelo_Login.create({
    //    Nome: "Enrico",
    //    Senha: "Senha",
    //})

    const novaPubli = Modelo_Publi.create({
        Titulo: "Primeira Publicação!",
        Texto: "Texto da Primeira publicação!",
        Escritor: "Enrico",
        Imagem : "Caminho_Para_Imagem",
        Tipo_De_Publi : "Noticias",
        Data_da_Publi : "19/10/2023"
    })

    //const logins = await Modelo_Login.findAll({
    //    where : {
    //        Nome: "Teste"
    //    }
    //});

    //const login = await Modelo_Login.findByPk(1);
    //await Modelo_Login.destroy({where: {
    //    Nome: "Teste1",
    //}})

    //login.Senha = "Senha Alterada";
    //login.save();

})();