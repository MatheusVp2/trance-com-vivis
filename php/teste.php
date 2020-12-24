<?php

    // header("Content-type: application/json; charset=utf-8");

    include("./conexao.php");
    include('./controller.php');
    

    $link = GetConexao();

    echo $_SERVER['REQUEST_METHOD'];

    $nome      = $_REQUEST['nome'];
    $telefone  = $_REQUEST['telefone'];
    $servico   = $_REQUEST['servico'];
    $valor     = $_REQUEST['valor'];
    $data      = $_REQUEST['data'];
    $hora      = $_REQUEST['hora'];
    echo json_encode( CadastrarAgenda( $link, $nome, $telefone, $servico, $valor, $data, $hora ) ) ;
    
    /* Fecha a Conexão */
    mysqli_close( $link );
    unset( $link );

?>