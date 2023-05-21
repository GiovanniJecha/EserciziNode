const prompt = require('prompt-sync')();

class Persona {
  constructor(nome, cognome, data_nascita) {
    this.nome = nome;
    this.cognome = cognome;
    this.data_nascita = data_nascita;
  }
  toString(){
    return 'Nome : ' + this.nome + '\nCognome : ' + this.cognome + '\nData nascita : ' + this.data_nascita
  }
}

const nome = prompt('Inserisci il nome: ');
const cognome = prompt('Inserisci il cognome: ');
const persona = new Persona(nome, cognome);
console.log(persona.toString());