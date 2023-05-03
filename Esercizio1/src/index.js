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
console.log("Contenuto File\n" + data);
//console.log("........WriteFile..........");
//input = prompt("Testo? ");
//gFs.AppendFile(input);
//console.log("........ReadFile..........");
//let data1 = gFs.ReadFile();
//console.log("File content:2", data1);
//const lines = data1.split(os.EOL);  // or: text.split(/\r?\n/)
const lines = data.split(os.EOL);
let p1 = lines[1].split(os.EOL);
let p2 = lines[2].split(os.EOL);
let p3 = lines[3].split(os.EOL);
//console.log(p3);
let persona = p1[0].split(",");
let persona1 = p2[0].split(",");
let persona2 = p3[0].split(",");
//console.log(persona2);
let persone = [persona, persona1, persona2];
console.log("Array delle persone -- " + persone[1]); //Alessandro,Verdi,15/03/2002
//console.log(lines);  // ['line 1', 'line 2']
let nuovaPersona = new Persona(persone[0][0], persone[0][1], persone[0][2]);
let nuovaPersona1 = new Persona(persone[1][0], persone[1][1], persone[1][2]);
let nuovaPersona2 = new Persona(persone[2][0], persone[2][1], persone[2][2]);
let oggetti = [nuovaPersona, nuovaPersona1, nuovaPersona2];
for (i = 0; i < oggetti.length; i++) {
  console.log(oggetti[i].toString());  
}
//let gFs1 = new GestioneFileSynk("./prova1.txt");
//gFs1.WriteFile("cccc");