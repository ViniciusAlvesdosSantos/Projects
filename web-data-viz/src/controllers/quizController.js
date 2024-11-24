var quizModel= require("../models/quizModels");

function listar(req, res){
    quizModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })

}

function calcularPerfil(respostas){
    var pontuacaoTotal = respostas.reduce((acc,valor) => acc + valor.pontuacao, 0)
    if(pontuacaoTotal <= 5){
        return "Perfil MUITO Conservador"
    } else if(pontuacaoTotal <=10){
        return "Perfil conservador"
    } else if(pontuacaoTotal <= 15){
        return "Perfil moderado"
    } else {
        return "Perfil Arrojado"
    }
}

module.exports={
    listar
}