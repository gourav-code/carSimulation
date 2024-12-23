class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 4;
        this.rayLen = 150;
        this.raySpread = Math.PI/2;
        this.rays = [];
        this.reading = [];
    }
    update(roadBorders, traffic){
        this.#rayCasting();
        this.reading = [];
        for (let i=0; i< this.rays.length; ++i){
            this.reading.push(
                this.#getreading(this.rays[i], roadBorders, traffic)
            );
        }

    }
    #getreading(ray, roadBorders, traffic){
        let touches = [];
        for (let i=0; i< roadBorders.length; ++i){
            const touch = getIntersection(
                ray[0], ray[1],
                roadBorders[i][0], roadBorders[i][1]
            );
            if (touch){
                // console.log(touch);
                touches.push(touch);
            }
        }
        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j<poly.length;j++){
                const value=getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
        }

        if (touches.length == 0){
            return null;
        } else{
            // console.log(touches);
            const offset = touches.map(tmp=>tmp.offset);
            const minOffset = Math.min(...offset);
            return touches.find(tmp=> tmp.offset == minOffset);
        }
    }
    #rayCasting(){
        this.rays = [];
        for(let i = 0; i < this.rayCount; ++i){
            const rayAngle = this.raySpread/2 + (this.raySpread)*(i/this.rayCount-1) + this.car.angle;
            const start = {x:this.car.x, y:this.car.y};
            const end = {
                x:this.car.x - this.rayLen*Math.sin(rayAngle),
                y:this.car.y - this.rayLen*Math.cos(rayAngle)
            };
            this.rays.push([start, end]);
        }
    }
    draw(context){
        for(let i=0; i< this.rayCount; ++i){
            let end = this.rays[i][1];
            if(this.reading[i]){
                end = this.reading[i];
                // console.log(end);
            }
            // console.log(end);

            context.lineWidth = 2;
            context.beginPath();
            context.strokeStyle="yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.strokeStyle="black";
            context.moveTo(end.x, end.y);
            context.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            context.stroke();
        }
    }
}