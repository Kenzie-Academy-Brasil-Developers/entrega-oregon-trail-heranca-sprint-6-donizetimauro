class Traveler{
    constructor(name, food, isHealthy){
        this.name = name;
        this.food = 1;
        this.isHealthy = true;
    }
    hunt(){
        this.food = this.food + 2;
        return this.food;
    }
    eat(){
        if(this.food > 0){
            this.food = this.food - 1;
            return this.food;
        }else{
            this.isHealthy = false;
            return this.isHealthy
        }
    }
}
class Wagon{
    constructor(capacity, passageiros){
        this.capacity = capacity;
        this.passageiros = [];
    }
    getAvailableSeatCount(){
        let available = this.capacity - this.passageiros.length;
        return available;
    }
    join(traveler){
        if(this.getAvailableSeatCount() > 0){
        this.passageiros.push(traveler)
        }
        return this.passageiros;
    }
    shouldQuarantine(){
        for(let i=0; i<this.passageiros.length; i++){
            if(this.passageiros[i].isHealthy == false){
                return true;
            }
        }
        return false;
    }
    totalFood(){
        let comida = 0;
        for(let i=0; i<this.passageiros.length; i++){
            comida = comida + this.passageiros[i].food;
        }
        return comida;
    }
}
class Hunter extends Traveler{
    constructor(name, food, isHealthy){
        super(name, food, isHealthy)
        this.food = 2;
    }
    hunt(){
        this.food = this.food + 5;
        return this.food;
    }
    eat(){
        if(this.food > 1){
            this.food = this.food - 2;
            return this.food;
        }else{
            this.isHealthy = false;
            this.food = 0
            return this.isHealthy;
        }
    }
    giveFood(traveler, numOfFoodUnits){
        if(numOfFoodUnits < this.food){
            traveler.food = + numOfFoodUnits;
            this.food = this.food - numOfFoodUnits;
        }
    }
}

class Doctor extends Traveler{
    constructor(name, food, isHealthy){
        super(name, food, isHealthy)
    }
    heal(traveler){
        traveler.isHealthy = true;
        return true;
    }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);