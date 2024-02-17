 function salvarTarefa(valorDoItem , nomeDaChave) {
  const valorAntigo = buscarTarefas(nomeDaChave);
  const valorAtual = [...valorAntigo, valorDoItem];
  localStorage.setItem(nomeDaChave, JSON.stringify(valorAtual));
}

function editarTarefa(nomeDaChave, tarefaEditado) {
  const elementos = buscarTarefas(nomeDaChave);
  const elementoEditado = elementos.map(item => {
    return item.id === tarefaEditado.id ? tarefaEditado : item;
  });
  localStorage.setItem(nomeDaChave, JSON.stringify(elementoEditado));
}

function removeTarefa(nomeDaChave, id) {
  const elemento = buscarTarefas(nomeDaChave);
  const elementoFiltrado = elemento.filter(item => 
    item.id !== id
    );
  localStorage.setItem(nomeDaChave , JSON.stringify(elementoFiltrado));
}

function buscarTarefas(nomeDaChave){
  let valorAntigo = JSON.parse(localStorage.getItem(nomeDaChave));
  return valorAntigo ? valorAntigo : [];
}

 const dataBase = {
   salvarTarefa,
   editarTarefa,
   removeTarefa,
   buscarTarefas,
}
export default dataBase;