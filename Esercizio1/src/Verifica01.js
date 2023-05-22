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

let gFs = new GestioneFileSynk("./src/File1.txt");
let gFs1 = new GestioneFileSynk("./src/File2.txt");

console.log("........ReadFile..........");
let data = gFs.ReadFile();
let data1 = gFs1.ReadFile();
console.log("File content : 1", data);
console.log("File content : 2", data1);
console.log("........WriteFile..........");
let nuovo_file = new GestioneFileSynk("./src/prova1.txt");
nuovo_file.WriteFile(data + data1);