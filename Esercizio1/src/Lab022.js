const prompt = require('prompt-sync')();
const fs = require('fs');

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
const data_nascita = prompt('Inserisci la data di nascita: ');
const persona = new Persona(nome, cognome, data_nascita);
console.log(persona.toString());

// Esportazione in formato CSV
const csvContent = `nome,cognome,data_nascita\n${persona.nome},${persona.cognome},${persona.data_nascita}`;
fs.writeFileSync('persona.csv', csvContent);

// Importazione da formato CSV
const csvImport = fs.readFileSync('persona.csv', 'utf8');
const [header, data] = csvImport.split('\n');
const [importedNome, importedCognome, importedDataNascita] = data.split(',');
const importedPersona = new Persona(importedNome, importedCognome, importedDataNascita);
console.log(importedPersona.toString());