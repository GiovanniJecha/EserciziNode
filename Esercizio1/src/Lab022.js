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
function esporta(nomeFile){
    const nome = prompt('Inserisci il nome: ');
    const cognome = prompt('Inserisci il cognome: ');
    const data_nascita = prompt('Inserisci la data di nascita: ');
    const persona = new Persona(nome, cognome, data_nascita);
    console.log(persona.toString());
    const csvContent = `nome,cognome,data_nascita\n${persona.nome},${persona.cognome},${persona.data_nascita}`;
    fs.writeFileSync(nomeFile + '.csv', csvContent);
}


// Importazione da formato CSV
function importa(nomeFile){
    const csvImport = fs.readFileSync(nomeFile + '.csv', 'utf8');
    const [header, data] = csvImport.split('\n');
    const [importedNome, importedCognome, importedDataNascita] = data.split(',');
    const importedPersona = new Persona(importedNome, importedCognome, importedDataNascita);
    console.log(importedPersona.toString());
}

function contaOccorrenze(nomeFile, parola) {
  const csvImport = fs.readFileSync(nomeFile + '.csv', 'utf8');
  const righe = csvImport.split('\n');
  let conteggio = 0;
  for (let i = 0; i < righe.length; i++) {
    const parole = righe[i].split(',');
    for (let j = 0; j < parole.length; j++) {
      if (parole[j] === parola) {
        conteggio++;
      }
    }
  }
  console.log('La parola ' + parola + ' compare ' + conteggio + 'volte nel file CSV.');
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