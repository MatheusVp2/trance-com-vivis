<?php

    /* Buscar Agenda */
    function MODEL_BuscarAgenda( $link, $data ){
        $sql = "select * from AGENDA where DATA = '$data' order by HORA;";
        $result = mysqli_query( $link, $sql);
        if( $result ){
            return mysqli_fetch_all($result, MYSQLI_ASSOC);
        }
    }

    /* Cadastrar Agenda */
    function MODEL_CadastrarAgenda( $link, $nome, $telefone, $servico, $valor, $data, $hora ){
        $sql = "insert into AGENDA( NOME, TELEFONE, SERVICO, VALOR, DATA, HORA ) values ( '$nome', '$telefone', '$servico', '$valor', '$data', '$hora' );";
        $result = mysqli_query( $link, $sql);
        return $result;
    }

    /* Editar Agenda */
    function MODEL_EditarAgenda( $link, $id_agenda, $nome, $telefone, $servico, $valor, $data, $hora ){
        $sql = "update AGENDA set NOME = '$nome', TELEFONE = '$telefone', SERVICO = '$servico', VALOR = '$valor', DATA = '$data', HORA = '$hora' where ID_AGENDA = '$id_agenda';";
        $result = mysqli_query( $link, $sql);
        return $result;
    }

    /* Deletar Agenda */
    function MODEL_DeletarAgenda( $link, $id_agenda ){
        $sql = "delete from AGENDA where ID_AGENDA = '$id_agenda' ;";
        $result = mysqli_query( $link, $sql);
        return $result;
    }

?>