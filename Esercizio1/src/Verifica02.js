const prompt = require('prompt-sync')();
const fs = require('fs');

class Libro {
    m_titolo;
    m_autore;
    m_prezzo;
  constructor(m_titolo, m_autore, m_prezzo) {
    this.m_titolo = m_titolo;
    this.m_autore = m_autore;
    this.m_prezzo = m_prezzo;
  }
  toString() {
    return 'Titolo : ' + this.titolo + '\nAutore : ' + this.autore + '\nPrezzo : ' + this.prezzo
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome;
    this.libri = [];
  }
  aggiungiLibro(libro) {
    this.libri.push(libro);
  }
}
  
  // Importazione da formato JSON
  function importa() {
    const jsonImport = fs.readFileSync("./src/biblioteca.json", 'utf8');
    const importedListaData = JSON.parse(jsonImport);
    importedListaData.m_Libro.forEach(function(libroData) {
      const importedLibro = new Libro(libroData.m_titolo, libroData.m_autore, libroData.m_prezzo);
      biblioteca.aggiungiLibro(importedLibro);
    });
    console.log(biblioteca);
  }
  
  let biblioteca;
  
  while (true) {
    console.log("Seleziona un'opzione:");
    console.log("1. Crea una biblioteca");
    console.log("2. Aggiungi la lista libri a biblioteca esistente");
    console.log("0. Esci");
    const choice = prompt("Scelta: ");
    switch (choice) {
      case "1":
        let nomeBiblioteca = prompt("Inserisci il nome che vuoi dare alla biblioteca : ");
        biblioteca = new Biblioteca(nomeBiblioteca);
        console.log('Biblioteca "' + biblioteca.nome + '" creata.');
        break;
      case "2":
        let nomeBibliotecaDaAggiungere = prompt("Inserisci il nome della biblioteca a cui aggiungere i libri: ");
        if (nomeBibliotecaDaAggiungere == biblioteca.nome) {
          //let lista = prompt("Percorso file dei libri : ");
          importa();
        } else {
          console.log('Nessuna biblioteca trovata con il nome "' + nomeBibliotecaDaAggiungere + '".');
        }
        break;
      case "0":
        console.log("Programma terminato.");
        process.exit(0);
      default:
        console.log("Scelta non valida.");
    }
  }