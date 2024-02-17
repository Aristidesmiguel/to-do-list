import dataBase from "./baseDeBado.js";

let TAREFAS = dataBase.buscarTarefas("lists");
const INPUT_TAREFA = document.getElementById("input_tarefa");
const INPUT_ADICIONAR = document.getElementById("adicionar");
const INPUT_EDITAR = document.getElementById("editar");
const CONTAINER_TAREFAS = document.getElementById("container_tarefa");

for (let i = 0; i < TAREFAS.length; i++) {
  const data = new Date(TAREFAS[i].data);
  criarElementoTarefa(TAREFAS[i]);
}
function executarSistema() {
  if (INPUT_TAREFA.value === "") {
    alert("Informe o nome da tarefa!");
  } else {
    dataBase.salvarTarefa(objectTarefa(), "lists");
    criarElementoTarefa(objectTarefa());
    TAREFAS.push(objectTarefa());
  }
}
function criarElementoTarefa(Tarefa) {
  const ITEM = document.createElement("div");
  const BOTAO_DELETE = document.createElement("button");
  const BOTAO_EDIT = document.createElement("button");
  const SECTION_BOTOES = document.createElement("span");
  const heading_create = document.createElement("h4");
  const heading_edit = document.createElement("h4");
  heading_create.textContent = "Create: " + Tarefa.data;
  heading_edit.textContent = "Edit: " + Tarefa.dataEdit;

  const NOME_DA_TAREFA = Tarefa.nome;
  const container_input_value = document.createElement("span");
  container_input_value.append(NOME_DA_TAREFA);
  SECTION_BOTOES.append(BOTAO_DELETE, BOTAO_EDIT, heading_create, heading_edit);
  ITEM.append(container_input_value, SECTION_BOTOES);
  setTarefa(ITEM);
  criarBotoesDaTarefa(
    BOTAO_DELETE,
    BOTAO_EDIT,
    ITEM,
    NOME_DA_TAREFA,
    container_input_value,
    Tarefa.id,
    Tarefa,
    heading_edit
  );
  return ITEM;
}

function objectTarefa() {
  const TAREFA = {
    id: TAREFAS.length,
    nome: INPUT_TAREFA.value,
    data: new Date().toLocaleTimeString(),
    dataEdit: new Date().toLocaleTimeString(),
  };
  return TAREFA;
}

function limparInputTarefa() {
  INPUT_TAREFA.value = "";
  INPUT_TAREFA.focus();
}

function criarBotoesDaTarefa(
  botaoDeEliminar,
  botaoDeEditar,
  itemTarefa,
  valorDoInput,
  container_input_value,
  id,
  Tarefa,
  heading_edit
) {
  const EDITAR = document.createTextNode("Editar");
  const ELIMINAR = document.createTextNode("Delete");
  botaoDeEditar.append(EDITAR);
  botaoDeEliminar.append(ELIMINAR);
  eliminarTarefa(botaoDeEliminar, itemTarefa, valorDoInput, id);
  setBotaoEditar(
    botaoDeEditar,
    valorDoInput,
    container_input_value,
    Tarefa,
    heading_edit
  );
}
//eleiminar tarefas
function eliminarTarefa(eliminar, item, value, id) {
  eliminar.addEventListener("click", () => {
    if (confirm(`Deseja realmente apagar a lista: ${value}`) === true) {
      item.remove();
    }
    dataBase.removeTarefa("lists", id);
  });
}

function setBotaoEditar(
  editar,
  inputValor,
  container_input_value,
  Tarefa,
  heading_edit
) {
  editar.addEventListener("click", () => {
    INPUT_ADICIONAR.style.display = "none";
    INPUT_EDITAR.style.display = "block";
    INPUT_TAREFA.value = container_input_value.textContent;
    INPUT_EDITAR.onclick = () => {
      editarTarefa(inputValor, container_input_value, Tarefa, heading_edit);
    };
  });
}

function editarTarefa(inputValor, container_input_value, Tarefa, heading_edit) {
  INPUT_EDITAR.addEventListener("click", () => {
    const valorDaTarefa = INPUT_TAREFA.value;
    container_input_value.textContent = valorDaTarefa;
    INPUT_ADICIONAR.style.display = "block";
    INPUT_EDITAR.style.display = "none";
    
    if (valorDaTarefa) {
      const NOVA_TAREFA = { ...Tarefa, nome: valorDaTarefa,  dataEdit: new Date().toLocaleTimeString()};
      dataBase.editarTarefa("lists", NOVA_TAREFA);
      heading_edit.textContent = "Edit: " + NOVA_TAREFA.dataEdit;
    }
  });
}

function setTarefa(item) {
  return CONTAINER_TAREFAS.append(item);
}

INPUT_ADICIONAR.addEventListener("click", () => {
  executarSistema();
  limparInputTarefa();
});
