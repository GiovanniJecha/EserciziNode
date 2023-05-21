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

// Esportazione in formato CSV
function esporta(){
    const nome = prompt('Inserisci il nome: ');
    const cognome = prompt('Inserisci il cognome: ');
    const data_nascita = prompt('Inserisci la data di nascita: ');
    const persona = new Persona(nome, cognome, data_nascita);
    console.log(persona.toString());
    const csvContent = `nome,cognome,data_nascita\n${persona.nome},${persona.cognome},${persona.data_nascita}`;
    fs.writeFileSync('persona.csv', csvContent);
}


// Importazione da formato CSV
function importa(){
    const csvImport = fs.readFileSync('persona.csv', 'utf8');
    const [header, data] = csvImport.split('\n');
    const [importedNome, importedCognome, importedDataNascita] = data.split(',');
    const importedPersona = new Persona(importedNome, importedCognome, importedDataNascita);
    console.log(importedPersona.toString());
}

while (true) {
    console.log("Seleziona un'opzione:");
    console.log("1. Importa un file CSV");
    console.log("2. Esporta un file CSV");
    console.log("0. Esci");
    const choice = prompt("Scelta: ");
    switch (choice) {
      case "1":
        importa();
        break;
      case "2":
        esporta();
        break;
      case "0":
        console.log("Programma terminato.");
        process.exit(0);
      default:
        console.log("Scelta non valida.");
    }
  }