const canvas = document.getElementById("circular-road");
const ctx = canvas.getContext("2d");


class Road{
    constructor(x = canvas.width / 2, y = canvas.height / 2, outerR = 290, innerR = 150, lane = 2){
        this.centerX = x;
        this.centerY = y;
        this.outerRadius = outerR; // Outer radius of the road
        this.innerRadius = innerR; // Inner radius of the road
        this.width = this.outerRadius - this.innerRadius;
        this.laneCount = lane;
        this.laneDivider = this.width/2 + this.innerRadius;
    }

    getLaneCenter(index){
        const laneWidth = this.width/this.laneCount;
        const laneCenterRadius = this.innerRadius + laneWidth/2 + (index%2)* laneWidth;
        return {y: laneCenterRadius*Math.cos(45*Math.PI/100), x:laneCenterRadius*Math.sin(45*Math.PI/100)}
    }

    draw(ctx){
      ctx.lineWidth = 5;
      ctx.strokeStyle = "white";

      
      // Draw the outer circle
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.outerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "pink"; // Road color
      ctx.fill();
      ctx.stroke();
      
      ctx.setLineDash([20, 20]); 
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.laneDivider, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
      // Create the cut-out for the inner circle
      ctx.globalCompositeOperation = "destination-out"; // Cut-out mode
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.innerRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Reset composite operation to default
      ctx.globalCompositeOperation = "source-over";

      
    }
 
}

let road = new Road();
road.draw(ctx);
