create database site;

use site;

create table usuario(
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(60),
senha varchar(45),
fkQuiz int
);

create table quiz(
idQuiz int primary key auto_increment,
pergunta varchar(300),
categoriaInvestidor varchar(45),
pontuacao int
);

insert into quiz(pergunta, categoriaInvestidor, pontuacao) values
('Você prefere investimentos que não tenham risco de perda?', 'Muito conservador', 1),
('Você se sente confortável investindo uma parte menor em ações ?', 'Conservador', 2),
('Você considera investir em fundos?', 'Moderado',3),
('Você está disposto a assumir altos riscos em busca de grandes retorno ?', 'Arrojado',4);