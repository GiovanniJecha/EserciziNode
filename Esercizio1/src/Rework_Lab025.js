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

class Istituzione {
  constructor(nome) {
    this.nome = nome;
    this.personale = [];
  }
  aggiungiPersona(persona) {
    this.personale.push(persona);
  }
}

class Gestionale{
  constructor(nome){
    this.nome = nome;
    this.istituzioni = [];
  }
  registraIstituzione(nome_istituzione){
    let verifica_istituzioni = this.istituzioni;
    if (verifica_istituzioni.length == 0){
      let nuova_istituzione = new Istituzione(nome_istituzione);
      this.istituzioni.push(nuova_istituzione);
      console.log("Istituzione " + nome_istituzione + " registrata");
    } else {
      let verifica_nome = verifica_istituzioni.find(function(i) { return i.nome === nome_istituzione });
      if (verifica_nome) {
        console.log("Istituzione gia presente");
      } else {
        let nuova_istituzione = new Istituzione(nome_istituzione);
        this.istituzioni.push(nuova_istituzione);
        console.log("Istituzione " + nome_istituzione + " registrata");
      }
    }
    console.log(this.istituzioni);
  }
  aggiungiPersona(nome_istituzione){
    let verifica_istituzioni = this.istituzioni;
    if (verifica_istituzioni.length > 0){
      let verifica_nome = verifica_istituzioni.find(function(i) { return i.nome === nome_istituzione });
      if (verifica_nome){
        let index = verifica_istituzioni.findIndex(object => {
          return object.nome === nome_istituzione;
        });
        let nome = prompt("Inserisci il nome della persona : ");
        let cognome = prompt("Inserisci il cognome della persona : ");
        let data_nascita = prompt("Inserisci la data di nascita della persona : ");
        let persona = new Persona(nome, cognome, data_nascita);
        this.istituzioni[index].aggiungiPersona(persona);
        console.log(this.istituzioni);
      } else {
        console.log("Istituzione non registrata con questo nome : " + nome_istituzione);
      }
    } else {
      console.log("Registra prima l'istituzione...");
    }
  }
}

let gestionale = new Gestionale("Gestionale");

// Esportazione in formato JSON
function esporta(istituzione) {
  const jsonContent = JSON.stringify(istituzione);
  fs.writeFileSync(istituzione.nome + '.json', jsonContent);
}

// Importazione da formato JSON
function importa(nomeIstituzione) {
  const jsonImport = fs.readFileSync(nomeIstituzione + '.json', 'utf8');
  const importedIstituzioneData = JSON.parse(jsonImport);
  const importedIstituzione = new Istituzione(importedIstituzioneData.nome);
  importedIstituzioneData.personale.forEach(function(personaData) {
    const importedPersona = new Persona(personaData.nome, personaData.cognome, personaData.data_nascita);
    importedIstituzione.aggiungiPersona(importedPersona);
  });
  return importedIstituzione;
}

while (true) {
  console.log("Seleziona un'opzione:");
  console.log("1. Registra un'istituzione");
  console.log("2. Aggiungi una persona a un'istituzione");
  console.log("3. Esporta un'istituzione in formato JSON");
  console.log("4. Importa un'istituzione da formato JSON");
  console.log("0. Esci");
  const choice = prompt("Scelta: ");
  switch (choice) {
    case "1":
      let nome_istituzione = prompt("Inserisci il nome dell'istituzione: ");
      gestionale.registraIstituzione(nome_istituzione);
      break;
    case "2":
      let nome_istituzione_persona = prompt("Inserisci il nome dell'istituzione: ");
      gestionale.aggiungiPersona(nome_istituzione_persona);
      console.log("Persona aggiunta al personale dell'istituzione " + nome_istituzione_persona);
      break;
    case "3":
      const nomeIstituzionedaEsportare = prompt("Inserisci il nome dell'istituzioneda esportare in formato JSON: ");
      const istituzionedaEsportare = istituzioni.find(function(i) { return i.nome === nomeIstituzionedaEsportare });
      if (istituzionedaEsportare) {
        esporta(istituzionedaEsportare);
        console.log('Istituzione "' + nomeIstituzionedaEsportare + '" esportata in formato JSON.');
      } else {
        console.log('Nessuna istituzione trovata con il nome "' + nomeIstituzionedaEsportare + '".');
      }
      break;
    case "4":
      const nomeIstituzionedaImportare = prompt("Inserisci il nome dell'istituzioneda importare da formato JSON: ");
      try {
        const istituzionedaImportare = importa(nomeIstituzionedaImportare);
        istituzioni.push(istituzionedaImportare);
        console.log('Istituzione "' + nomeIstituzionedaImportare + '" importata da formato JSON.');
      } catch (error) {
        console.log('Errore durante l\'importazione dell\'istituzione "' + nomeIstituzionedaImportare + '" da formato JSON.');
      }
      break;
    case "0":
      console.log("Programma terminato.");
      process.exit(0);
    default:
      console.log("Scelta non valida.");
  }
}