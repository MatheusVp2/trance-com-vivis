function GetAnoAtual() {
    return new Date().getFullYear();
}

function AddMaskBuscaAno(){

}
$(`#ano_filtro`).inputmask({
    mask: "9999",
    autoGroup: true,
    autoUnmask: true,
});

function GetBaseRelatorio(relatorio) {
    var aux = "\n"
    aux += "<tr>\n"
    aux += `<td class='align-middle text-center'>${relatorio[1]}</td>\n`
    aux += `<td class='align-middle text-center'>${relatorio[2]}</td>\n`
    aux += `<td class='align-middle text-center'>R$ ${relatorio[3].replace('.', ',')}</td>\n`
    aux += "</tr>\n"
    return aux;
}

function GetBaseRelatorioVazio() {
    var aux = "\n"
    aux += "<tr>"
    aux += '<td colspan="3" class="text-center p-5"><h1>Não Existe Relatorio para esse ano !</h1></td>'
    aux += "</tr>"
    return aux
}

function GetBaseRealtorioFinal(soma){
    var aux = "\n"
    aux += "<tr>\n"
    aux += `<td colspan="2" class='align-middle text-center'>Ano de Busca: ${anoBusca}</td>\n`
    aux += `<td class='align-middle text-center'>Total: R$ ${soma.toString().replace('.', ',')} </td>\n`
    aux += "</tr>\n"
    return aux
}

async function BuscarRelatorio(anoBusca) {
    var url = './php/api.php';
    var formData = new FormData();
    formData.append('funcao', 'relatorio');
    formData.append('ano', anoBusca);

    var result = await fetch(url, { method: 'POST', body: formData })
    var resJson = await result.json()
    return resJson
}

async function AtualizaTabelaRelatorio() {
    console.log('[LOG] => ATUALIZANDO TABELA');
    var result = await BuscarRelatorio(anoBusca)
    relatorio = result.data
    var aux = ""
    if (relatorio.length === 0) {
        aux += GetBaseRelatorioVazio()
    } else {
        var soma = 0;
        relatorio.forEach(element => {
            aux += GetBaseRelatorio(element)
            soma += Number( element[3] )
        })
        aux += GetBaseRealtorioFinal(soma)
    }
    document.getElementById('TabelaRelatorio').innerHTML = aux
}


function BuscarFiltro() {
    anoBusca = $("#ano_filtro").val()
    AtualizaTabelaRelatorio()
    $("#ano_filtro").val(null)
    modal_filtro.hide()
}

/* Botões de Ação dentro do Modal */
const btn_modal_filtro_buscar = document.getElementById('btn_modal_filtro_buscar')
const btn_modal_filtro_sair = document.getElementById('btn_modal_filtro_sair')

btn_modal_filtro_buscar.addEventListener('click', BuscarFiltro)


/* Modal de Cadastro */
const dom_modal_filtro = document.getElementById('modal_filtro')
const modal_filtro = new bootstrap.Modal(dom_modal_filtro)