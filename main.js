const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 600;
const context = canvas.getContext("2d");
const road = new Road(canvas.width/2, 350);
let initialCarPosition = road.getLaneCenter(0 , 45);
// const car = new Car( ...initialCarPosition, 30, 50, 3, "KEY", canvas.width/2, 350);
const n = 100;
const cars = testingCars(n);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")){
    
    cars[0].brain = JSON.parse(localStorage.getItem("bestBrain"));
    for (let i=1; i< cars.length;++i){
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        NeuralNetwork.mutate(cars[0].brain, 0.3);
    }
}

function savingbestCar(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}
function deleteCar(){
    localStorage.removeItem("bestBrain");
}

const traffic = [
    new Car( ...road.getLaneCenter(1 , 45), 30, 50, 2,"DUMMY" , canvas.width/2, 350),
    new Car( ...road.getLaneCenter(0 , 35), 30, 50, 2,"DUMMY" , canvas.width/2, 350)
];


function testingCars(n=1){
    const arr = [];
    if(n<1){
        n = 1;
    }
    for (let i = 0; i<n; i++){
        arr.push(new Car( ...initialCarPosition, 30, 50, 3, "KEY", canvas.width/2, 350));
    }
    return arr;
}

function animate(){
    for(let i=0; i< traffic.length; ++i){
        traffic[i].update(road.border, []);
    }
    
    bestCar = cars.find( 
        tmp=>tmp.carDistance == Math.max(...cars.map(c=>c.carDistance))
    );
    // console.log( Math.max(...cars.map(c=>-1*c.y)));
    // car.update(road.border, traffic);
    canvas.height = window.innerHeight;
    for(let i=0; i< cars.length; ++i){
        cars[i].update(road.border, traffic);
    }
    
    context.save();
    context.translate(-bestCar.x+canvas.width*0.2, -bestCar.y+canvas.height*0.7);
    road.draw(context);
    context.globalAlpha = 0.2;
    // car.draw(context, "red", true);
    for(let i=0; i< cars.length; ++i){
        cars[i].draw(context, "red");
    }
    context.globalAlpha = 1;
    bestCar.draw(context,"red",true);
    for(let i=0; i<traffic.length; ++i){
        traffic[i].draw(context, "green");
    }
    context.restore();
    requestAnimationFrame(animate);

}

animate();