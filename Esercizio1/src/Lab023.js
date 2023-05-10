const prompt = require("prompt-sync")();
const os = require('os');

class GestioneFileSynk {
  fs = require('fs');
  
  constructor(nomeFile) {
    this.nomeFile = nomeFile;
  
  }
  ReadFile() {
    try {
      const data = this.fs.readFileSync(this.nomeFile,"utf8");
      return data;
    } catch (err) {
      console.error(err);
    }
  }; 
  WriteFile(msg) {
    try {
      this.fs.writeFileSync(this.nomeFile, msg + " \r\n", { flag: 'a+' });
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  };
}

class Persona{
  #p_nome;
  #p_cognome;
  #p_data_nascita;
  constructor(nome, cognome, data_nascita){
      this.nome = nome;
      this.cognome = cognome;
      this.data_nascita = data_nascita;
  }
  set nome(name){
      this.#p_nome = name;
  }
  set cognome(surname){
      this.#p_cognome = surname;
  }
  set data_nascita(date){
      this.#p_data_nascita = date;
  }
  get nome(){
      return this.#p_nome
  }
  get cognome(){
      return this.#p_cognome
  }
  get data_nascita(){
      return this.#p_data_nascita
  }
  toString(){
      return "Nome : " + this.nome + "\nCognome : " + this.cognome + "\nData nascita : " + this.data_nascita;
  }
}

let gFs = new GestioneFileSynk("./src/Persona.csv");

function importCsvFile() {
  const fileName = prompt("Nome del file CSV da importare: ");
  let gFsImport = new GestioneFileSynk(fileName);
  let data = gFsImport.ReadFile();
  gFs.WriteFile(data);
  console.log(`File CSV ${fileName} importato con successo.`);
}

function exportCsvFile() {
  const fileName = prompt("Nome del file CSV da esportare: ");
  let data = gFs.ReadFile();
  let gFsExport = new GestioneFileSynk(fileName);
  gFsExport.WriteFile(data);
  console.log(`File CSV esportato con successo nel file ${fileName}.`);
}

function countOccurrences() {
  const word = prompt("Parola da cercare: ");
  let data = gFs.ReadFile();
  const lines = data.split(os.EOL);
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes(word)) {
      count++;
    }
  }
  console.log(`La parola "${word}" compare ${count} volte nel file CSV.`);
}

while (true) {
  console.log("Seleziona un'opzione:");
  console.log("1. Importa un file CSV");
  console.log("2. Esporta un file CSV");
  console.log("3. Conta le occorrenze di una parola nel file CSV");
  console.log("0. Esci");
  const choice = prompt("Scelta: ");
  switch (choice) {
    case "1":
      importCsvFile();
      break;
    case "2":
      exportCsvFile();
      break;
    case "3":
      countOccurrences();
      break;
    case "0":
      console.log("Programma terminato.");
      process.exit(0);
    default:
      console.log("Scelta non valida.");
  }
}