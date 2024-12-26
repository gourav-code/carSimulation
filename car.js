class Car{
    constructor( x, y, width, height, type, maxSpeed = 3){
        this.x = x;
        this.y = y;     //center point of car
        this.height = height;   //car width (x axis)
        this.width = width;
        this.speed = 0.0;
        this.maxSpeed = maxSpeed;
        this.angle = 0.00;
        this.increaseAngle = 0.02;
        this.acceleration = 0.2;
        // this.polygon = [];
        this.isDamaged = false;
        this.friction = 0.05;
        // this.type = type;
        // this.carDistance = 0.00;
        // if (this.type == "KEY"){  
        //     this.sensor = new Sensor(this);
        //     this.brain = new NeuralNetwork([
        //         this.sensor.rayCount, 6, 4
        //     ]);
        // }
        this.sensor = new Sensor(this);
        this.control = new Control(type);
        this.time = 1;
    }
    update(roadBorder, traffic = []){
        // console.log("hiUpdateCar");
        if(!this.isDamaged){
            this.#move();
            // console.log("hi");
            this.polygon = this.#getCorner();
            this.isDamaged = this.#getDamaged(roadBorder, traffic);
        }        
        //sensor
        if(this.sensor){
            // console.log("hi sensor");
            this.sensor.update(roadBorder, traffic);
            // const offset = this.sensor.reading.map(tmp=> tmp==null?0:1-tmp.offset);
            // const outputs = NeuralNetwork.feedForward(offset, this.brain);

            // this.control.forward = outputs[0];
            // this.control.left = outputs[1];
            // this.control.right = outputs[2];
            // this.control.reverse = outputs[3];

        }
    }
    #getDamaged(roadBorder, traffic = []){
        
        for (let i=0; i< roadBorder.length; ++i){
            if(polyRoadIntersect(this.polygon, roadBorder[i])){
                return true ;
            }
        }
        // for (let j =0;j<traffic.length;++j){
        //     if(polysIntersect(this.polygon, traffic[j].polygon)){
        //         return true ;
        //     }
        // }
        return false;
    }
    
    #getCorner(){
        const points = [];
        const radius = Math.hypot(this.width, this.height)*0.5;
        const alpha = Math.atan2(this.width, this.height);
        // console.log(radius);
        // Top-right corner
        points.push({
            x: this.x + Math.sin( alpha - this.angle) * radius,
            y: this.y - Math.cos( alpha - this.angle) * radius,
        });

        // Top-left corner
        points.push({
            x: this.x + Math.sin(Math.PI - alpha - this.angle) * radius,
            y: this.y - Math.cos(Math.PI - alpha - this.angle) * radius,
        });

        // Bottom-left corner
        points.push({
            x: this.x + Math.sin(Math.PI + alpha - this.angle) * radius,
            y: this.y - Math.cos(Math.PI + alpha - this.angle) * radius,
        });

        // Bottom-right corner
        points.push({
            x: this.x + Math.sin(-alpha - this.angle) * radius,
            y: this.y - Math.cos(-alpha - this.angle) * radius,
        });
        
        
        return points;
    }

    #move(){
        if(this.control.forward){
            this.speed+=this.acceleration;
        }
        if(this.control.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.control.left){
                this.angle+= this.increaseAngle*flip;
            }
            if(this.control.right){
                this.angle-=this.increaseAngle*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(context, color, sensorDraw = false){
        if (this.isDamaged){
            context.fillStyle = "gray";
        } else{
            context.fillStyle = color;
        }
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle);
        context.beginPath();
        // console.log(this.polygon);
        // context.moveTo(this.polygon[0].x, this.polygon[0].y);
        // for (let i=1; i<this.polygon.length; ++i){
        //     context.lineTo(this.polygon[i].x, this.polygon[i].y);
        // }
        context.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )

        context.fill();
        context.restore();
        if (this.sensor && sensorDraw){
            this.sensor.draw(context);
        }
        
    }
}