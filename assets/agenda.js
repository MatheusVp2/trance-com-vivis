/* FUNÇÕES NECESSARIAS */

function DateFormatSql(date_sql) {
    [ano, mes, dia] = date_sql.split('-')
    return `${dia}/${mes}/${ano}`
}

function GetDateNowSql() {
    var now = new Date();
    [dia, mes, ano] = [now.getDate(), now.getMonth() + 1, now.getFullYear()]
    dia = dia <= 9 ? `0${dia}` : dia
    mes = mes <= 9 ? `0${mes}` : mes
    return `${ano}-${mes}-${dia}`
}

function ResetInput(elemento) {
    var tipo = elemento === 'cad' ? '\_cad' : '_edit'
    document.querySelector(`#nome${tipo}`).value = null
    document.querySelector(`#telefone${tipo}`).value = null
    document.querySelector(`#servico${tipo}`).value = null
    document.querySelector(`#valor${tipo}`).value = null
    document.querySelector(`#data${tipo}`).value = null
    document.querySelector(`#hora${tipo}`).value = null
}

function AddMaskInput(elemento) {
    var tipo = elemento === 'cad' ? '\_cad' : '_edit'
    $(`#telefone${tipo}`).inputmask({
        mask: "(99) 99999-9999",
        autoGroup: true,
        autoUnmask: true,
    });

    $(`#valor${tipo}`).inputmask('numeric', {
        autoUnmask: true,
        radixPoint: ",",
        groupSeparator: ".",
        allowMinus: true,
        prefix: 'R$ ',
        digits: 2,
        digitsOptional: false,
        rightAlign: true,
        unmaskAsNumber: true
    });

}

function GetBaseAgenda(agenda) {
    var aux = "\n"
    aux += "<tr>\n"
    aux += `<td class='align-middle text-center'>${agenda.NOME}</td>\n`
    aux += `<td class='align-middle text-center'>${agenda.TELEFONE}</td>\n`
    aux += `<td class='align-middle text-center'>${agenda.SERVICO}</td>\n`
    aux += `<td class='align-middle text-center'>R$ ${agenda.VALOR.replace('.', ',')}</td>\n`
    aux += `<td class='align-middle text-center'>${DateFormatSql(agenda.DATA)}</td>\n`
    aux += `<td class='align-middle text-center'>${agenda.HORA}</td>\n`
    aux += "<td class='align-middle text-center'>\n"
    aux += `<button value="${agenda.ID_AGENDA}" onclick="EditarModalAgenda(this)" class="btn btn-primary"><i class="far fa-edit"></i></button>\n`
    aux += `<button value="${agenda.ID_AGENDA}" onclick="ApagarAgenda(this)" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>\n`
    aux += "</td>\n"
    aux += "</tr>\n"
    return aux;
}

function GetBaseAgendaVazia() {
    var aux = "\n"
    aux += "<tr>"
    aux += '<td colspan="7" class="text-center p-5"><h1>Não Existe Agendamento</h1></td>'
    aux += "</tr>"
    return aux
}

async function AtualizaTabelaAgendamento() {
    console.log('[LOG] => ATUALIZANDO TABELA');
    var result = await BuscarAgendas(dataDeBusca)
    agendamentos = result.data
    var aux = ""
    if (agendamentos.length === 0) {
        aux += GetBaseAgendaVazia()
    } else {
        agendamentos.forEach(element => {
            aux += GetBaseAgenda(element)
        })
    }
    document.getElementById('TabelaAgendamentos').innerHTML = aux
}

function EditarModalAgenda(elemento) {
    var ID_AGENDA = elemento.value
    var INDEX = agendamentos.findIndex(x => x.ID_AGENDA === ID_AGENDA)
    var AGENDA = agendamentos[INDEX]

    $('#id_agenda_edit').val(AGENDA.ID_AGENDA)
    $('#nome_edit').val(AGENDA.NOME)
    $('#telefone_edit').val(AGENDA.TELEFONE)
    $('#servico_edit').val(AGENDA.SERVICO)
    $('#valor_edit').val(AGENDA.VALOR.replace('.', ','))
    $('#data_edit').val(AGENDA.DATA)
    $('#hora_edit').val(AGENDA.HORA)

    modal_edit.show()
}

function BuscaPorData() {
    console.log('[LOG] => BUSCANDO POR DATA');
    dataDeBusca = input_data_buscar_agenda.value
    AtualizaTabelaAgendamento()
}

/* FUNÇÔES DOS BOTES */

async function click_btn_modal_cad_salvar() {
    var result = await CadastrarAgenda()
    if (result.status) {
        Swal.fire(
            result.msg,
            'OK para FECHAR',
            'success'
        )
        ResetInput('cad')
        modal_cad.hide()
        AtualizaTabelaAgendamento()
    } else {
        Swal.fire({
            icon: 'error',
            title: result.msg,
            text: 'OK para FECHAR',
        })
    }
}

function click_btn_modal_cad_sair() {
    ResetInput('cad')
}

async function click_btn_modal_edit_salvar() {
    var result = await EditarAgenda()
    if (result.status) {
        Swal.fire(
            result.msg,
            'OK para FECHAR',
            'success'
        )
        ResetInput('edit')
        modal_edit.hide()
        AtualizaTabelaAgendamento()
    } else {
        Swal.fire({
            icon: 'error',
            title: result.msg,
            text: 'OK para FECHAR',
        })
    }
}

function click_btn_modal_edit_sair() {
    ResetInput('edit')
}

/* FUNÇÕES ASSINCRONAS */

async function BuscarAgendas(data) {
    var url = './php/api.php';
    var formData = new FormData();
    formData.append('funcao', 'get');
    formData.append('data', data);

    var result = await fetch(url, { method: 'POST', body: formData })
    var resJson = await result.json()
    return resJson
}

async function CadastrarAgenda() {
    var url = './php/api.php';

    var formData = new FormData()
    formData.append('funcao', 'post');
    formData.append('nome', $('#nome_cad').val())
    formData.append('telefone', $('#telefone_cad').val())
    formData.append('servico', $('#servico_cad').val())
    formData.append('valor', $('#valor_cad').val())
    formData.append('data', $('#data_cad').val())
    formData.append('hora', $('#hora_cad').val())

    var result = await fetch(url, { method: 'POST', body: formData })
    var resJson = await result.json()
    return resJson
}

async function EditarAgenda() {
    var url = './php/api.php';

    var formData = new FormData()
    formData.append('funcao', 'update');
    formData.append('nome', $('#nome_edit').val())
    formData.append('telefone', $('#telefone_edit').val())
    formData.append('servico', $('#servico_edit').val())
    formData.append('valor', $('#valor_edit').val())
    formData.append('data', $('#data_edit').val())
    formData.append('hora', $('#hora_edit').val())
    formData.append('id_agenda', $('#id_agenda_edit').val())

    var result = await fetch(url, { method: 'POST', body: formData })
    var resJson = await result.json()
    return resJson
}

async function DeletarAgenda(id_agenda) {
    var url = './php/api.php';

    var formData = new FormData()
    formData.append('funcao', 'delete');
    formData.append('id_agenda', id_agenda)

    var result = await fetch(url, { method: 'POST', body: formData })
    var resJson = await result.json()
    return resJson
}

async function ApagarAgenda(elemento) {
    var ID_AGENDA = elemento.value
    var result = await DeletarAgenda(ID_AGENDA)
    if (result.status) {
        Swal.fire(
            result.msg,
            'OK para FECHAR',
            'success'
        )
        AtualizaTabelaAgendamento()
    } else {
        Swal.fire({
            icon: 'error',
            title: result.msg,
            text: 'OK para FECHAR',
        })
    }
}

/* DECLARAÇÕES DE VARIAVEIS DOM */

/* Adiciona maskara para os Modais */
AddMaskInput('cad')
AddMaskInput('edit')

/* Modal de Cadastro */
const dom_modal_cad = document.getElementById('modal_cad')
const modal_cad = new bootstrap.Modal(dom_modal_cad)

/* Botões do Modal de Cadastro */
const btn_modal_cad_salvar = document.getElementById('btn_modal_cad_salvar')
const btn_modal_cad_sair = document.getElementById('btn_modal_cad_sair')

btn_modal_cad_salvar.addEventListener('click', click_btn_modal_cad_salvar)
btn_modal_cad_sair.addEventListener('click', click_btn_modal_cad_sair)


/* Modal de Edição */
const dom_modal_edit = document.getElementById('modal_edit')
const modal_edit = new bootstrap.Modal(dom_modal_edit)

/* Botões do Modal de Edição */
const btn_modal_edit_salvar = document.getElementById('btn_modal_edit_salvar')
const btn_modal_edit_sair = document.getElementById('btn_modal_edit_sair')

btn_modal_edit_salvar.addEventListener('click', click_btn_modal_edit_salvar)
btn_modal_edit_sair.addEventListener('click', click_btn_modal_edit_sair)

/* Botão de Busca por Data de Agendamento */

const btn_buscar_data_agenda = document.getElementById('btn_buscar_data_agenda')
const input_data_buscar_agenda = document.getElementById('input_data_buscar_agenda')

btn_buscar_data_agenda.addEventListener('click', BuscaPorData)