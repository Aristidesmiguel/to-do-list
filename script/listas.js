let tarefas = [];
const INPUT_TAREFA = document.getElementById("input_tarefa");
const INPUT_ADICIONAR = document.getElementById("adicionar");
const INPUT_EDITAR = document.getElementById("editar");
const CONTAINER_TAREFAS = document.getElementById("container_tarefa");

function criarTarefa() {
  const ITEM = document.createElement("div");
  const BOTAO_DELETE = document.createElement("button");
  const BOTAO_EDIT = document.createElement("button");
  const SECTION_BOTOES = document.createElement("span");
  const h4 = document.createElement("h4");
  h4.textContent = registrarDataDeCriacao();
  const value = objectTarefa();
  const VALUE_INPUT = value.nome;
  const container_input_value = document.createElement("span");
  container_input_value.append(VALUE_INPUT);
  SECTION_BOTOES.append(
    BOTAO_DELETE, 
    BOTAO_EDIT, h4
  );
  ITEM.append(
    container_input_value, 
    SECTION_BOTOES
  );
  setTarefa(ITEM);
  criarBotoesDaTarefa(
    BOTAO_DELETE,
    BOTAO_EDIT,
    ITEM,
    VALUE_INPUT,
    container_input_value
  );
  console.log(ITEM);
  return ITEM;
}
function objectTarefa() {
  const TAREFA = {
    Id: tarefas.length,
    nome: String(INPUT_TAREFA.value),
  };
  return TAREFA;
}

function registrarDataDeCriacao() {
  const data = new Date();
  const dia = data.getDay();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  return `${dia} / ${mes} / ${ano}`;
}
console.log(registrarDataDeCriacao());
function limparInputTarefa() {
  INPUT_TAREFA.value = "";
  INPUT_TAREFA.focus();
}

function criarBotoesDaTarefa(
  botaoDeEliminar,
  botaoDeEditar,
  itemTarefa,
  valorDoInput,
  container_input_value
) {
  const EDITAR = document.createTextNode("Editar");
  const ELIMINAR = document.createTextNode("Delete");
  botaoDeEditar.append(EDITAR);
  botaoDeEliminar.append(ELIMINAR);
  eliminarTarefa(botaoDeEliminar, itemTarefa, valorDoInput);
  setBotaoEditar(
    botaoDeEditar,
    itemTarefa,
    valorDoInput,
    container_input_value
  );
}

function eliminarTarefa(eliminar, item, value) {
  eliminar.addEventListener("click", () => {
    if (confirm(`Deseja realmente apagar a lista ${value}`) === true) {
      item.remove();
    }
  });
}
function setBotaoEditar(editar, item, inputValor, container_input_value) {
  editar.addEventListener("click", () => {
    INPUT_ADICIONAR.style.display = "none";
    INPUT_EDITAR.style.display = "block";
    INPUT_TAREFA.value = container_input_value.textContent;
    editarTarefa(item, inputValor, container_input_value);
  });
}
function editarTarefa(item, inputValor, container_input_value) {
  INPUT_EDITAR.addEventListener("click", () => {
    const valorEditado = (inputValor = INPUT_TAREFA.value);
    container_input_value.textContent = valorEditado;
    INPUT_ADICIONAR.style.display = "block";
    INPUT_EDITAR.style.display = "none";
  });
}
function setTarefa(item) {
  return CONTAINER_TAREFAS.append(item);
}

INPUT_ADICIONAR.addEventListener("click", () => {
 criarTarefa();
  limparInputTarefa();
});
