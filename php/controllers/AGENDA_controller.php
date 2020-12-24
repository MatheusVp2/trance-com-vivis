<?php

    /* Busca Agenda Data */

    function BuscarAgenda( $link, $data ){
        $busca = MODEL_BuscarAgenda( $link, $data );
        if( $busca ){
            $data = array(
                "status" => true,
                "data" => $busca
            );
            return $data ;
        }else{
            $data = array(
                "status" => true,
                "data" => $busca
            );
            return $data ;
        }
    }

    /* Cadastrar Agenda */
    function CadastrarAgenda( $link, $nome, $telefone, $servico, $valor, $data, $hora  ){
        if( $nome == "" || $telefone == "" || $servico == "" || $valor == "" || $data == "" || $hora == "" ){
            $data = array(
                "status" => false,
                "msg" => "Não permitido campo Vazio !"
            );
            return $data ;
        }
        $salvar = MODEL_CadastrarAgenda( $link, $nome, $telefone, $servico, $valor, $data, $hora );
        if( $salvar ){
            $data = array(
                "status" => true,
                "msg" => "Agendamento Cadastrado com Sucesso !"
            );
            return $data ;
        }else{
            $data = array(
                "status" => false,
                "msg" => "Erro ao Cadastrar Agendamento !"
            );
            return $data ;
        }
    }

    /* Editar Agenda */
    function EditarAgenda( $link, $id_agenda, $nome, $telefone, $servico, $valor, $data, $hora ){
        if( $nome == "" || $telefone == "" || $servico == "" || $valor == "" || $data == "" || $hora == "" ){
            $data = array(
                "status" => false,
                "msg" => "Não permitido campo Vazio !"
            );
            return $data ;
        }
        $editar = MODEL_EditarAgenda( $link, $id_agenda, $nome, $telefone, $servico, $valor, $data, $hora );
        if( $editar ){
            $data = array(
                "status" => true,
                "msg" => "Agendamento Atualizado com Sucesso !"
            );
            return $data ;
        }else{
            $data = array(
                "status" => false,
                "msg" => "Erro ao Atualizar Agendamento !"
            );
            return $data ;
        }
    }

    /* Deletar Agenda */
    function DeletarAgenda( $link, $id_agenda ){
        $deletar = MODEL_DeletarAgenda( $link, $id_agenda );
        if( $deletar ){
            $data = array(
                "status" => true,
                "msg" => "Agendamento Deletado com Sucesso !"
            );
            return $data ;
        }else{
            $data = array(
                "status" => false,
                "msg" => "Erro ao Deletar Agendamento !"
            );
            return $data ;
        }
    }

?>