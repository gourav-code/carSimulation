class Road{
    constructor(x, y, outerR = 250, innerR = 150, lane = 2){
        this.centerX = x;
        this.centerY = y;
        this.outerRadius = outerR; // Outer radius of the road
        this.innerRadius = innerR; // Inner radius of the road
        this.width = this.outerRadius - this.innerRadius;
        this.laneCount = lane;
        this.laneDivider = this.width/2 + this.innerRadius;
        this.border = [
            [this.centerX, this.centerY, this.outerRadius] , 
            [this.centerX, this.centerY, this.innerRadius]
        ];
    }

    getLaneCenter(index, theta){
        const laneWidth = this.width/this.laneCount;
        const laneCenterRadius = this.innerRadius + laneWidth/2 + (index%2)* laneWidth;

        return {y: this.centerY - laneCenterRadius*Math.cos(theta*Math.PI/100), x: this.centerX - laneCenterRadius*Math.sin(theta*Math.PI/100)}
    }

    draw(ctx){
      ctx.lineWidth = 2;
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