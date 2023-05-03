const prompt = require("prompt-sync")();
const os = require('os');


//https://it.wikiversity.org/wiki/File_Binari_%28superiori%29
//https://www.mrw.it/javascript/node-js-buffer-cosa-come-usarli_12438.html

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
  // WriteFile(msg) {
  //   try {
  //     this.fs.writeFileSync(this.nomeFile, msg + " \r\n", { flag: 'a+' });
  //     // file written successfully
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // AppendFile(msg) {
  //   try {
  //     this.fs.appendFileSync(this.nomeFile, msg + " \r\n"); // aggiunge il messaggio e un carattere di nuova linea al file
  //     // file aggiornato con successo
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
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

console.log("........ReadFile..........");
let data = gFs.ReadFile();
console.log("File content:1", data);
//console.log("........WriteFile..........");
//input = prompt("Testo? ");
//gFs.AppendFile(input);
//console.log("........ReadFile..........");
//let data1 = gFs.ReadFile();
//console.log("File content:2", data1);

//const lines = data1.split(os.EOL);  // or: text.split(/\r?\n/)
const lines = data.split(os.EOL);
let p1 = lines[1].split(os.EOL);
//console.log(persona);
let persona = p1[0].split(",");
console.log("Array della persona -- " + persona);
//console.log(lines);  // ['line 1', 'line 2']
let nome = persona[0];
let cognome = persona[1];
let data_nascita = persona[2];
let persona1 = new Persona(nome, cognome, data_nascita);
console.log(persona1.toString());
//let gFs1 = new GestioneFileSynk("./prova1.txt");
//gFs1.WriteFile("cccc");
