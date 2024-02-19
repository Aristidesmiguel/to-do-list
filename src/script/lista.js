//fAZENDO A IMPORTAÇÃO DA BASE DE DADOS;
import dataBase from "./baseDeBado.js";

// criando a chave da base de dados;
let TAREFAS = dataBase.buscarTarefas("lists");

//buscando os elementos HTML a partir do DOM;
const INPUT_TAREFA = document.getElementById("input_tarefa");
const INPUT_ADICIONAR = document.getElementById("adicionar");
const INPUT_EDITAR = document.getElementById("editar");
const CONTAINER_TAREFAS = document.getElementById("container_tarefa");
//let inputCover = String(INPUT_TAREFA.value);

for (let i = 0; i < TAREFAS.length; i++) {
    //const data = new Date(TAREFAS[i].data);
    createElementList(TAREFAS[i]);
}

/*esta parte, é responsável pela execução do sistema, a função executarSistema, so executa sé o input estiver preenchido*/
function executarSistema() {
    if (INPUT_TAREFA.value === "") {
      alert("Informe o nome da tarefa!");
    } else {
      dataBase.salvarTarefa(objectTarefa(), "lists");
      createElementList(objectTarefa());
      TAREFAS.push(objectTarefa());
    }
}
//função responsável pela criação do item list » "div"
function createElementList(tarefa){
    const item = document.createElement("div");
    item.append(sectionThecontainer(tarefa.nome, tarefa.data, tarefa.dataEdit), sectionTheButton(item, tarefa.nome, tarefa.id, tarefa));
    setTarefa(item)
    return item
}
//essa função é respnsável por organizar os conteudos da lista ex: o seu valor(fazer compras), data de criação e edição(01/03/2024 - 02/01/2025)
function sectionThecontainer(nomeDaTarefa, create, edit){
    const container = document.createElement("span");
    let dataDeCriacao = document.createElement("h4");
    let dataDeEdicao = document.createElement("h4");
    dataDeCriacao.textContent = "criação: " + create;
    dataDeEdicao.textContent = "edição: " + edit;
    const nome_da_tarefa = nomeDaTarefa;
    container.append(nome_da_tarefa)
    return container;
}
//essa função é respnsável por organizar os botões do item;
function sectionTheButton(item, nomeDaTarefa, idList, tarefa){
    const container = document.createElement("span");
    //createButtonEdit();
    //createButtonDelete(item, nomeDaTarefa, idList);
    container.append(createButtonEdit(tarefa, nomeDaTarefa), createButtonDelete(item, nomeDaTarefa, idList)); 
    return container;
}
//essa função é respnsável por criar BOTAO EDITAR;
function createButtonEdit(tarefa, nomeDaTarefa){
    const edit = document.createElement("button");
    edit.textContent = "Editar";
    openInputEdit(edit, tarefa, nomeDaTarefa);
    return edit;
}
//essa função é respnsável por criar BOTAO DELETE;
function createButtonDelete(item, nomeDaTarefa, idList){
   const eliminate = document.createElement("button");
    eliminate.textContent = "Delete";
    deleteItem(eliminate, item, nomeDaTarefa, idList);
    return eliminate;
}
//essa função é respnsável por estruturar o item Ex: nome, id, dataDeCriação e Midificação, entre outras propriedades;
function objectTarefa() {
    const TAREFA = {
      id: TAREFAS.length,
      nome: INPUT_TAREFA.value,
      data: new Date().toLocaleTimeString(),
      dataEdit: new Date().toLocaleTimeString(),
    };
    return TAREFA;
}
//Eliminar lista item;
function deleteItem(button, item, nomeDaLista, idList){
    button.addEventListener("click", () => {
        if (confirm(`Deseja realmente apagar a lista: ${nomeDaLista}`) === true){
            item.remove();
        }
        dataBase.removeTarefa("lists", idList);
    });
}
function ft_swap(){
    INPUT_ADICIONAR.style.display = "none";
    INPUT_EDITAR.style.display = "block";
}
function ft_swap_reverse(){
    INPUT_ADICIONAR.style.display = "block";
    INPUT_EDITAR.style.display = "none";
}
function openInputEdit(editar, tarefa, nomeDaTarefa){
    editar.addEventListener("click", () => {
    INPUT_TAREFA.value = nomeDaTarefa;
    ft_swap();
    INPUT_EDITAR.onclick = () => {
     editItem(tarefa);
    };
    });
}
function editItem(tarefa){
    INPUT_EDITAR.addEventListener("click", () => {
        const valorDaTarefa = INPUT_TAREFA.value;
        sectionThecontainer().textContent = valorDaTarefa;
        ft_swap_reverse();
        if (valorDaTarefa){
            const nova = {...tarefa, nome: valorDaTarefa, dataEdit: new Date().toLocaleTimeString()};
            dataBase.editarTarefa("lists", nova);
        }
    })
}
//Limpar o elemento html input do type = "text";
function limparInputTarefa() {
    INPUT_TAREFA.value = "";
    //inputCover.focus();
}
function setTarefa(item) {
    return CONTAINER_TAREFAS.append(item);
}
INPUT_ADICIONAR.addEventListener("click", () => {
    executarSistema();
    limparInputTarefa();
  });
