const prompt = require('prompt-sync')();
const fs = require('fs');

class Persona {
  constructor(nome, cognome, data_nascita) {
    this.nome = nome;
    this.cognome = cognome;
    this.data_nascita = data_nascita;
  }
  toString() {
    return 'Nome : ' + this.nome + '\nCognome : ' + this.cognome + '\nData nascita : ' + this.data_nascita
  }
}

// Esportazione in formato JSON
function esporta() {
  const nome = prompt('Inserisci il nome: ');
  const cognome = prompt('Inserisci il cognome: ');
  const data_nascita = prompt('Inserisci la data di nascita: ');
  const persona = new Persona(nome, cognome, data_nascita);
  console.log(persona.toString());
  const jsonContent = JSON.stringify(persona);
  fs.writeFileSync('persona.json', jsonContent);
}

// Importazione da formato JSON
function importa() {
  const jsonImport = fs.readFileSync('persona.json', 'utf8');
  const importedPersonaData = JSON.parse(jsonImport);
  const importedPersona = new Persona(importedPersonaData.nome, importedPersonaData.cognome, importedPersonaData.data_nascita);
  console.log(importedPersona.toString());
}

function contaOccorrenze(parola) {
  const jsonImport = fs.readFileSync('persona.json', 'utf8');
  const importedPersonaData = JSON.parse(jsonImport);
  let conteggio = 0;
  for (let key in importedPersonaData) {
    if (importedPersonaData[key] === parola) {
      conteggio++;
    }
  }
  console.log('La parola ' + parola + ' compare ' + conteggio + 'volte nel file JSON.');
}

while (true) {
    console.log("Seleziona un'opzione:");
    console.log("1. Importa un file CSV");
    console.log("2. Esporta un file CSV");
    console.log("3. Conta occorrenze in un file CSV");
    console.log("0. Esci");
    const choice = prompt("Scelta: ");
    switch (choice) {
      case "1":
        importa();
        break;
      case "2":
        esporta();
        break;
      case "3":
        const parola = prompt("Inserisci la parola da cercare: ");
        contaOccorrenze(parola);
        break;
      case "0":
        console.log("Programma terminato.");
        process.exit(0);
      default:
        console.log("Scelta non valida.");
    }
  }