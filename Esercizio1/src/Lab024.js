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
function esporta(nomeFile) {
  const nome = prompt('Inserisci il nome: ');
  const cognome = prompt('Inserisci il cognome: ');
  const data_nascita = prompt('Inserisci la data di nascita: ');
  const persona = new Persona(nome, cognome, data_nascita);
  console.log(persona.toString());
  const jsonContent = JSON.stringify(persona);
  fs.writeFileSync(nomeFile + '.json', jsonContent);
}

// Importazione da formato JSON
function importa(nomeFile) {
  const jsonImport = fs.readFileSync(nomeFile + '.json', 'utf8');
  const importedPersonaData = JSON.parse(jsonImport);
  const importedPersona = new Persona(importedPersonaData.nome, importedPersonaData.cognome, importedPersonaData.data_nascita);
  console.log(importedPersona.toString());
}

function contaOccorrenze(fileName, parola) {
  const jsonImport = fs.readFileSync(fileName + '.json', 'utf8');
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
    console.log("1. Importa un file JSON");
    console.log("2. Esporta un file JSON");
    console.log("3. Conta occorrenze in un file JSON");
    console.log("0. Esci");
    const choice = prompt("Scelta: ");
    switch (choice) {
      case "1":
        let nameFile = prompt("Come si chiama il file : ");
        importa(nameFile);
        break;
      case "2":
        let fileName = prompt("Come vuoi chiamare il file : ");
        esporta(fileName);
        break;
      case "3":
        let file_Name = prompt("In quale file vuoi cercare : ");
        const parola = prompt("Inserisci la parola da cercare: ");
        contaOccorrenze(file_Name, parola);
        break;
      case "0":
        console.log("Programma terminato.");
        process.exit(0);
      default:
        console.log("Scelta non valida.");
    }
  }