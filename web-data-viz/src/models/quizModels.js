var database = require("../database/config");

function listar(){
    var instrucao = `SELECT * FROM quiz;`
    return database.executar(instrucao)
}

module.exports={
    listar
}