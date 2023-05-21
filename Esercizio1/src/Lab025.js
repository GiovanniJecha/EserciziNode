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

let istituzioni = [];

while (true) {
  console.log("Seleziona un'opzione:");
  console.log("1. Crea un'istituzione");
  console.log("2. Aggiungi una persona a un'istituzione");
  console.log("3. Esporta un'istituzione in formato JSON");
  console.log("4. Importa un'istituzione da formato JSON");
  console.log("0. Esci");
  const choice = prompt("Scelta: ");
  switch (choice) {
    case "1":
      const nomeIstituzione = prompt("Inserisci il nome dell'istituzione: ");
      const nuovaIstituzione = new Istituzione(nomeIstituzione);
      istituzioni.push(nuovaIstituzione);
      console.log('Istituzione "' + nomeIstituzione + '" creata.');
      break;
    case "2":
      const nomeIstituzioneDaAggiungere = prompt("Inserisci il nome dell'istituzione a cui aggiungere una persona: ");
      const istituzioneDaAggiungere = istituzioni.find(function(i) { return i.nome === nomeIstituzioneDaAggiungere });
      if (istituzioneDaAggiungere) {
        const nomePersona = prompt('Inserisci il nome della persona: ');
        const cognomePersona = prompt('Inserisci il cognome della persona: ');
        const dataNascitaPersona = prompt('Inserisci la data di nascita della persona: ');
        const nuovaPersona = new Persona(nomePersona, cognomePersona, dataNascitaPersona);
        istituzioneDaAggiungere.aggiungiPersona(nuovaPersona);
        console.log('Persona "' + nomePersona + ' ' + cognomePersona + '" aggiunta all\'istituzione "' + nomeIstituzioneDaAggiungere + '".');
      } else {
        console.log('Nessuna istituzione trovata con il nome "' + nomeIstituzioneDaAggiungere + '".');
      }
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