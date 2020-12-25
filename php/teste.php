<?php

header("Content-type: application/json; charset=utf-8");

include("./conexao.php");
include('./controller.php');


$link = GetConexao();

// echo '<meta charset="UTF-8">';

// echo $_SERVER['REQUEST_METHOD'];
// echo "<br><br>";


$ano = '2020';

echo json_encode( Relatorio_MES_ANO( $link, $ano ) );

/* Fecha a Conexão */
mysqli_close($link);
unset($link);
