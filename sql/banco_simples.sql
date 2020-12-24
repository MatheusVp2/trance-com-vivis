drop database trance_com_vivis;
create database trance_com_vivis;
use trance_com_vivis;

create table AGENDA(
	ID_AGENDA int auto_increment,
    NOME varchar(255) not null,
    TELEFONE varchar(20) not null,
    SERVICO varchar(255) not null,
    VALOR decimal(10,2) not null,
    DATA varchar(20) not null,
    HORA varchar(20) not null,
    primary key( ID_AGENDA )
)
engine = INNODB
default charset = utf8;


insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Matheus Oliveira', '27999407698', 'Trança Completa', '50.00', '2020-12-23', '16:30' );
insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Matheus Oliveira', '27999407698', 'Trança Completa', '50.00', '2020-12-23', '14:30' );
insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Breno Brabo', '27999407698', 'Trança Completa', '50.00', '2020-11-23', '22:30' );
insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Matheus Oliveira', '27999407698', 'Trança Completa', '50.00', '2020-11-23', '13:30' );
insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Matheus Oliveira', '27999407698', 'Trança Completa', '50.00', '2020-11-23', '17:30' );
insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Matheus Oliveira', '27999407698', 'Trança Completa', '50.00', '2020-11-23', '15:30' );
insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( 'Matheus Oliveira', '27999407698', 'Trança Completa', '50.00', '2020-12-23', '18:30' );


-- select sum( VALOR ) as TOTAL from AGENDA where DATA = '2020-12-23';

-- select * from AGENDA where DATA like '2020-12%';

-- select * from AGENDA where DATA = '2020-12-23' order by HORA;

-- select * from AGENDA;

-- update AGENDA set NOME = '$nome', TELEFONE = '%telefone', SERVICO = '$servico', VALOR = '$valor', DATA = '$data', HORA = '$hora' where ID_AGENDA = '$id_agenda';



