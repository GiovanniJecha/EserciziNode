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

let nome = prompt('Inserisci il nome: ');
let cognome = prompt('Inserisci il cognome: ');
let data_nascita = prompt('Inserisci la data di nascita: ');
let persona = new Persona(nome, cognome, data_nascita);
console.log(persona.toString());