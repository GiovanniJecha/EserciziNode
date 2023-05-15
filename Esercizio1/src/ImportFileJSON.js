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

let gFs = new GestioneFileSynk("./src/Persona.js");

function importJsonFile() {
    const fileName = prompt("Nome del file JSON da importare: ");
    let gFsImport = new GestioneFileSynk(fileName);
    let data = JSON.parse(gFsImport.ReadFile()); // usa JSON.parse per convertire il testo JSON in un oggetto JavaScript
    gFs.WriteFile(data);
    console.log(`File JSON ${fileName} importato con successo.`);
    console.log(data);
  }
  
  function exportJsonFile() {
    const fileName = prompt("Nome del file JSON da esportare: ");
    let data = gFs.ReadFile();
    let json = JSON.stringify(data); // usa JSON.stringify per convertire l'oggetto JavaScript in una stringa JSON
    let gFsExport = new GestioneFileSynk(fileName);
    gFsExport.WriteFile(json);
    console.log(`File JSON esportato con successo nel file ${fileName}.`);
  }
  
  function countOccurrences() {
    const word = prompt("Parola da cercare: ");
    let data = gFs.ReadFile();
    // data è un oggetto JavaScript con le proprietà nome, cognome e data_di_nascita
    let count = 0;
    for (let key in data) { // usa un ciclo for...in per iterare sulle proprietà dell'oggetto
      if (data[key] == word) { // controlla se il valore della proprietà corrisponde alla parola cercata
        count++;
      }
    }
    console.log(`La parola "${word}" compare ${count} volte nel file JSON.`);
  }

while (true) {
  console.log("Seleziona un'opzione:");
  console.log("1. Importa un file JSON");
  console.log("2. Esporta un file JSON");
  console.log("3. Conta le occorrenze di una parola nel file JSON");
  console.log("0. Esci");
  const choice = prompt("Scelta: ");
  switch (choice) {
    case "1":
      importJsonFile();
      break;
    case "2":
      exportJsonFile();
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