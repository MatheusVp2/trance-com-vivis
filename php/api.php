<?php

    header("Content-type: application/json; charset=utf-8");

    include("./conexao.php");
    include("./controller.php");

    if( isset( $_REQUEST['funcao'] ) ){

        $funcao = $_REQUEST['funcao'];

        /* Abre a Conexão */
        $link = GetConexao();

        switch( $funcao ){

            case "get";
                $data = $_REQUEST['data'];
                echo json_encode( BuscarAgenda($link, $data) );
            break;

            case "post";
                $nome      = $_REQUEST['nome'];
                $telefone  = $_REQUEST['telefone'];
                $servico   = $_REQUEST['servico'];
                $valor     = $_REQUEST['valor'];
                $data      = $_REQUEST['data'];
                $hora      = $_REQUEST['hora'];
                echo json_encode( CadastrarAgenda( $link, $nome, $telefone, $servico, $valor, $data, $hora ) ) ;
            break;

            case "update";
            $nome      = $_REQUEST['nome'];
            $telefone  = $_REQUEST['telefone'];
            $servico   = $_REQUEST['servico'];
            $valor     = $_REQUEST['valor'];
            $data      = $_REQUEST['data'];
            $hora      = $_REQUEST['hora'];
            $id_agenda = $_REQUEST['id_agenda'];
            echo json_encode( EditarAgenda( $link, $id_agenda, $nome, $telefone, $servico, $valor, $data, $hora ) ) ;
            break;

            case "delete";
                $id_agenda = $_REQUEST['id_agenda'];
                echo json_encode( DeletarAgenda( $link, $id_agenda ) );
            break;

            case "relatorio";
                $ano = $_REQUEST['ano'];
                echo json_encode( Relatorio_MES_ANO( $link, $ano ) );
            break;

            default;
                $data = array(
                    "status" => false,
                    "msg" => "Função não encontrada !"
                );
                echo json_encode( $data );
            break;
        }

        /* Fecha a Conexão */
        mysqli_close( $link );
        unset( $link );

    }else{
        $data = array(
            "status" => false,
			"msg" => "Parametro de função não encontrado!"
        );
        
        echo json_encode( $data );
    }


?>