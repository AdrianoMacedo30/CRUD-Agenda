import {
  renderTabela,
  saveContato,
  deleteContato
} from './controller/AgendaController.mjs';

// Expõe funções globalmente (necessário pois HTML usa onclick="...")
Object.assign(window, {
  renderTabela,
  saveContato,
  deleteContato
});

// Inicializa a tabela ao carregar
document.addEventListener('DOMContentLoaded', renderTabela);
