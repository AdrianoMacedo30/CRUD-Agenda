export class Contato {
  constructor({ id = null, nome, telefone, email }) {
    this.id = id ?? Date.now().toString();
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.criadoEm = new Date().toISOString();
  }

  static validar(dados) {
    const erros = [];
    if (!dados.nome?.trim()) erros.push('Nome é obrigatório');
    if (!dados.telefone?.trim()) erros.push('Telefone é obrigatório');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email))
      erros.push('E-mail inválido');
    return erros;
  }
}
