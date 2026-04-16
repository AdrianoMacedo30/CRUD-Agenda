import {Contato} from '../model/Contato.mjs'

const KEY = 'contatos';

export class AgendaService {
    getContatos() {
        const dados = localStorage.getItem(KEY);
        return dados ? JSON.parse(dados) : [];
    }

    saveContato(contato) {
        const lista = this.getContatos();
        lista.push(contato);
        localStorage.setItem(KEY, JSON.stringify(lista));
        return contato;
    }

    deleteContato(id) {
        const lista = this.getContatos().filter(c => c.id !== id);
        localStorage.setItem(KEY, JSON.stringify(lista));
    }
}