const prompt = require("prompt-sync")();
const os = require('os');

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

let obj; 

function readFileJson(percorso){
    obj = require(percorso);
    //console.log(obj[0].person);
    for (i = 0; i < obj.length; i++) {
        let persona = new Persona(obj[i].person.name, obj[i].person.surname, obj[i].person.date);
        console.log(persona.toString()); 
    }
}

let percorso = prompt("Percorso : ");
readFileJson(percorso);