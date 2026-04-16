import { AgendaService } from '../service/AgendaService.mjs';
import { Contato } from '../model/Contato.mjs';

const svc = new AgendaService();

export function renderTabela() {
  const tbody = document.getElementById('tbl-contatos');
  const lista = svc.getContatos();

  tbody.innerHTML = lista.length === 0
    ? `<tr><td colspan="4" class="empty-row">Nenhum contato cadastrado.</td></tr>`
    : lista.map(c => `
      <tr>
        <td data-label="Nome">${c.nome}</td>
        <td data-label="Telefone">${c.telefone}</td>
        <td data-label="E-mail">${c.email || '—'}</td>
        <td data-label="Ações" class="actions-cell">
          <button class="btn-delete" onclick="deleteContato('${c.id}')">Excluir</button>
        </td>
      </tr>`
    ).join('');
}

export function saveContato(form) {
  const dados = Object.fromEntries(new FormData(form));
  const erros = Contato.validar(dados);
  if (erros.length) { mostrarAlerta(erros.join(' | '), 'danger'); return; }

  try {
    const editId = form.dataset.editId;
    if (editId) {
      // Edição: remove o antigo e salva o atualizado com o mesmo id
      svc.deleteContato(editId);
      svc.saveContato(new Contato({ ...dados, id: editId }));
      delete form.dataset.editId;
      document.getElementById('btn-submit').textContent = 'Salvar Contato';
    } else {
      svc.saveContato(new Contato(dados));
    }
    form.reset();
    renderTabela();
    mostrarAlerta('Contato salvo com sucesso!', 'success');
  } catch (e) {
    mostrarAlerta(e.message, 'danger');
  }
}

export function deleteContato(id) {
  if (!confirm('Confirma a exclusão deste contato?')) return;
  svc.deleteContato(id);
  renderTabela();
  mostrarAlerta('Contato removido.', 'info');
}

function mostrarAlerta(msg, tipo) {
  const div = document.getElementById('alerta');
  div.className = `alerta alerta-${tipo}`;
  div.textContent = msg;
  div.classList.remove('d-none');
  setTimeout(() => div.classList.add('d-none'), 3000);
}