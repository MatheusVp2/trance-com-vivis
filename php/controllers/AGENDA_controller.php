<?php

/* Busca Agenda Data */

function BuscarAgenda($link, $data)
{
    $busca = MODEL_BuscarAgenda($link, $data);
    if ($busca) {
        $data = array(
            "status" => true,
            "data" => $busca
        );
        return $data;
    } else {
        $data = array(
            "status" => true,
            "data" => $busca
        );
        return $data;
    }
}

/* Cadastrar Agenda */
function CadastrarAgenda($link, $nome, $telefone, $servico, $valor, $data, $hora)
{
    if ($nome == "" || $telefone == "" || $servico == "" || $valor == "" || $data == "" || $hora == "") {
        $data = array(
            "status" => false,
            "msg" => "Não permitido campo Vazio !"
        );
        return $data;
    }
    $salvar = MODEL_CadastrarAgenda($link, $nome, $telefone, $servico, $valor, $data, $hora);
    if ($salvar) {
        $data = array(
            "status" => true,
            "msg" => "Agendamento Cadastrado com Sucesso !"
        );
        return $data;
    } else {
        $data = array(
            "status" => false,
            "msg" => "Erro ao Cadastrar Agendamento !"
        );
        return $data;
    }
}

/* Editar Agenda */
function EditarAgenda($link, $id_agenda, $nome, $telefone, $servico, $valor, $data, $hora)
{
    if ($nome == "" || $telefone == "" || $servico == "" || $valor == "" || $data == "" || $hora == "") {
        $data = array(
            "status" => false,
            "msg" => "Não permitido campo Vazio !"
        );
        return $data;
    }
    $editar = MODEL_EditarAgenda($link, $id_agenda, $nome, $telefone, $servico, $valor, $data, $hora);
    if ($editar) {
        $data = array(
            "status" => true,
            "msg" => "Agendamento Atualizado com Sucesso !"
        );
        return $data;
    } else {
        $data = array(
            "status" => false,
            "msg" => "Erro ao Atualizar Agendamento !"
        );
        return $data;
    }
}

/* Deletar Agenda */
function DeletarAgenda($link, $id_agenda)
{
    $deletar = MODEL_DeletarAgenda($link, $id_agenda);
    if ($deletar) {
        $data = array(
            "status" => true,
            "msg" => "Agendamento Deletado com Sucesso !"
        );
        return $data;
    } else {
        $data = array(
            "status" => false,
            "msg" => "Erro ao Deletar Agendamento !"
        );
        return $data;
    }
}



/* Relatorio MES_ANO */
function Relatorio_MES_ANO($link, $ano)
{
    $baseMes   = [
        ["01", "JANEIRO"],
        ["02", "FEVEREIRO"],
        ["03", "MARÇO"],
        ["04", "ABRIL"],
        ["05", "MAIO"],
        ["06", "JUNHO"],
        ["07", "JULHO"],
        ["08", "AGOSTO"],
        ["09", "SETEMBRO"],
        ["10", "OUTUBRO"],
        ["11", "NOVEMBRO"],
        ["12", "DEZEMBRO"]
    ];

    $relatorio = array();

    foreach ($baseMes as $arrMes) {
        $mes     = $arrMes[0];
        $mes_ano = "$ano-$mes";
        $result  = MODEL_SomaTotal_MES_ANO($link, $mes_ano);
        $valor   = $result[0]['SOMA_TOTAL'];
        if ($valor != 0) {
            $newBase = $arrMes;
            array_push($newBase, $result[0]['AGENDAS']);
            array_push($newBase, $result[0]['SOMA_TOTAL']);
            array_push($relatorio, $newBase);
        }
    }

    $data = array(
        "status" => true,
        "data" => $relatorio
    );
    
    return $data;

}
