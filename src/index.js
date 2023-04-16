/*const prompt = require("prompt-sync")();
input = prompt("testo?");
console.log("Ciao mondo " + input);*/

const prompt = require("prompt-sync")();

class Macchina{
    #m_targa;
    #m_carburante;
    #m_matricola;
    #m_potenza;
    constructor(targa, carburante, matricola, potenza){
        this.targa = targa;
        this.carburante = carburante;
        this.matricola = matricola;
        this.potenza = potenza;
    }
    set targa(targa){
        this.#m_targa = targa;
    }
    set carburante(carburante){
        this.#m_carburante = carburante;
    }
    set matricola(matricola){
        this.#m_matricola = matricola;
    }
    set potenza(potenza){
        this.#m_potenza = potenza;
    }
    get targa(){
        return this.#m_targa;
    }
    get matricola(){
        return this.#m_matricola;
    }
    get carburante(){
        return this.#m_carburante;
    }
    get potenza(){
        return this.#m_potenza;
    }
    toString(){
        return "Targa : " + this.targa + "\nCarburante : " + this.carburante + "\nMatricola : " + this.matricola + "\nPotenza : " + this.potenza;
    }
}

targa = prompt("Targa?");
carburante = prompt("Carburante?");
matricola = prompt("Matricola?");
potenza = prompt("Potenza?");

let macchina = new Macchina(targa, carburante, matricola, potenza);

console.log(macchina.toString());
