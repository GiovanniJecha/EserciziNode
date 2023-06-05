const prompt = require('prompt-sync')();
const fs = require('fs');
 class Persona {
  constructor(nome, cognome, data_nascita) {
    this.nome = nome;
    this.cognome = cognome;
    this.data_nascita = data_nascita;
  }
   toString() {
    return 'Nome : ' + this.nome + '\nCognome : ' + this.cognome + '\nData nascita : ' + this.data_nascita;
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
 class Gestionale {
  constructor(nome) {
    this.nome = nome;
    this.istituzioni = [];
  }
   registraIstituzione(nome_istituzione) {
    let verifica_istituzioni = this.istituzioni;
    if (verifica_istituzioni.length == 0) {
      let nuova_istituzione = new Istituzione(nome_istituzione);
      this.istituzioni.push(nuova_istituzione);
      console.log("Istituzione " + nome_istituzione + " registrata");
    } else {
      let verifica_nome = verifica_istituzioni.find(function (i) { return i.nome === nome_istituzione });
      if (verifica_nome) {
        console.log("Istituzione già presente");
      } else {
        let nuova_istituzione = new Istituzione(nome_istituzione);
        this.istituzioni.push(nuova_istituzione);
        console.log("Istituzione " + nome_istituzione + " registrata");
      }
    }
    console.log(this.istituzioni);
  }
   aggiungiPersona(nome_istituzione) {
    let verifica_istituzioni = this.istituzioni;
    if (verifica_istituzioni.length > 0) {
      let verifica_nome = verifica_istituzioni.find(function (i) { return i.nome === nome_istituzione });
      if (verifica_nome) {
        let index = verifica_istituzioni.findIndex(object => {
          return object.nome === nome_istituzione;
        });
        let nome = prompt("Inserisci il nome della persona: ");
        let cognome = prompt("Inserisci il cognome della persona: ");
        let data_nascita = prompt("Inserisci la data di nascita della persona: ");
        let persona = new Persona(nome, cognome, data_nascita);
        this.istituzioni[index].aggiungiPersona(persona);
        console.log(this.istituzioni);
      } else {
        console.log("Istituzione non registrata con questo nome: " + nome_istituzione);
      }
    } else {
      console.log("Registra prima l'istituzione...");
    }
  }
   esportaIstituzione(nome_istituzione) {
    let verifica_istituzioni = this.istituzioni;
    let verifica_nome = verifica_istituzioni.find(function (i) { return i.nome === nome_istituzione });
    if (verifica_nome) {
      let index = verifica_istituzioni.findIndex(object => {
        return object.nome === nome_istituzione;
      });
      let jsonContent = JSON.stringify(verifica_istituzioni[index]);
      fs.writeFileSync(verifica_istituzioni[index].nome + '.json', jsonContent);
    } else {
      console.log("Istituzione non trovata...");
      console.log(this.istituzioni);
    }
  }
   importaIstituzione(nome_istituzione) {
    try {
      let jsonContent = fs.readFileSync(nome_istituzione + '.json', 'utf8');
      let importedIstituzione = JSON.parse(jsonContent);
      let verifica_nome = this.istituzioni.find(function (i) { return i.nome === nome_istituzione });
      if (verifica_nome) {
        console.log("Istituzione già presente.");
      } else {
        let nuova_istituzione = new Istituzione(importedIstituzione.nome);
        nuova_istituzione.personale = [];
        for (let i = 0; i < importedIstituzione.personale.length; i++) {
          let persona = importedIstituzione.personale[i];
          let nuova_persona = new Persona(persona.nome, persona.cognome, persona.data_nascita);
          nuova_istituzione.personale.push(nuova_persona);
        }
        this.istituzioni.push(nuova_istituzione);
        console.log("Istituzione " + nome_istituzione + " importata con successo.");
      }
    } catch (error) {
      console.log("Errore durante l'importazione dell'istituzione: " + error.message);
    }
  }
   visualizzaPersonale(nome_istituzione) {
    let verifica_istituzioni = this.istituzioni;
    if (verifica_istituzioni.length > 0) {
      let verifica_nome = verifica_istituzioni.find(function (i) { return i.nome === nome_istituzione });
      if (verifica_nome) {
        let index = verifica_istituzioni.findIndex(object => {
          return object.nome === nome_istituzione;
        });
        let personale = this.istituzioni[index].personale;
        console.log(personale);
      } else {
        console.log("Istituzione non registrata con questo nome: " + nome_istituzione);
      }
    } else {
      console.log("Registra prima l'istituzione...");
    }
  }
}
 let gestionale = new Gestionale("Gestionale");
 while (true) {
  console.log("Seleziona un'opzione:");
  console.log("1. Registra un'istituzione");
  console.log("2. Aggiungi una persona a un'istituzione");
  console.log("3. Esporta un'istituzione in formato JSON");
  console.log("4. Importa un'istituzione da formato JSON");
  console.log("5. Visualizza l'elenco del personale di un'istituzione");
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
      let nome_istituzione_esportare = prompt("Inserisci il nome dell'istituzione da esportare in formato JSON: ");
      gestionale.esportaIstituzione(nome_istituzione_esportare);
      break;
    case "4":
      let nome_istituzione_importare = prompt("Inserisci il nome dell'istituzione da importare da formato JSON: ");
      gestionale.importaIstituzione(nome_istituzione_importare);
      break;
    case "5":
      let nome_istituzione_personale = prompt("Inserisci il nome dell'istituzione: ");
      gestionale.visualizzaPersonale(nome_istituzione_personale);
      break;
    case "0":
      console.log("Programma terminato.");
      process.exit(0);
    default:
      console.log("Scelta non valida.");
  }
}