<?php

    /* Retorna um Link de Conexão com o Banco de Dados em MYSQLi */ 
    function GetConexao(){
        $servidor = "127.0.0.1";
        $port     = "3307";
        $usuario  = "root";
        $senha    = "usbw";
        $dbname   = "trance_com_vivis";

        $conn = mysqli_connect($servidor, $usuario, $senha, $dbname, $port);
        
        mysqli_set_charset( $conn, 'utf8');
        
        if ( !$conn ) {
            echo "Error: Unable to connect to MySQL." . PHP_EOL;
            echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
            exit;
        }else{
            return $conn;
        }  
    }

?>