const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 1280;
// console.log(canvas);
const context = canvas.getContext("2d");
// console.log(context);
const road = new Road(canvas.width/2, canvas.width*0.9);
const n = 100;
// let initialCarPosition = {x:road.getLaneCenter(1), y:-100};
const cars = testingCars(n);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")){
    
    cars[0].brain = JSON.parse(localStorage.getItem("bestBrain"));
    // console.log(cars[0].brain);
    for (let i=1; i< cars.length;++i){
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        NeuralNetwork.mutate(cars[0].brain, 0.2);
    }
}

function savingbestCar(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}
function deleteCar(){
    localStorage.removeItem("bestBrain");
}

const traffic = [
    new Car( road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];
// console.log(window.innerHeight);

function testingCars(n=1){
    const arr = [];
    if(n<1){
        n = 1;
    }
    for (let i = 0; i<n; i++){
        arr.push(new Car(road.getLaneCenter(1), 100, 30, 50, "KEY"));
    }
    return arr;
}
function animate(){

    for(let i=0; i<traffic.length; ++i){
        traffic[i].update(road.border, []);
    }

    bestCar = cars.find(
        tmp=>-1*tmp.y == Math.max(...cars.map(c=>-1*c.y))
    );
    // console.log( Math.max(...cars.map(c=>-1*c.y)));
    canvas.height = window.innerHeight;
    for(let i=0; i< cars.length; ++i){
        cars[i].update(road.border, traffic);
    }
    
    context.save();
    context.translate(0, -bestCar.y+canvas.height*0.7);
    road.draw(context);
    context.globalAlpha = 0.2;
    for(let i=0; i< cars.length; ++i){
        cars[i].draw(context, "red");
    }
    context.globalAlpha = 1;
    bestCar.draw(context,"red",true);
    for(let i=0; i<traffic.length; ++i){
        traffic[i].draw(context, "blue");
    }
    context.restore();
    requestAnimationFrame(animate);

}

animate();