class Road{
    constructor(x, width, laneCount = 3){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.leftBoundary = this.x-width/2;
        this.rightBoundary = this.x+width/2;

        const infinity = 1000000;
        this.topBoundary = -infinity;
        this.bottomBoundary = infinity;

        const topLeft = {x:this.leftBoundary, y:this.topBoundary};
        const topRight = {x:this.rightBoundary, y:this.topBoundary};
        const bottomLeft = {x:this.leftBoundary, y:this.bottomBoundary};
        const bottomRight = {x:this.rightBoundary, y:this.bottomBoundary};

        this.border = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];

    }
    getLaneCenter(index){
        const laneWidth = this.width/this.laneCount;
        return this.leftBoundary + laneWidth/2 + laneWidth*index;
    }

    draw(context){
        context.lineWidth = 5;
        context.strokeStyle = "white";

        for(let i = 1; i<= this.laneCount-1; ++i){
            const tmp = this.leftBoundary + (this.rightBoundary-this.leftBoundary)*(i/this.laneCount);  //lerp Function
            context.setLineDash([20, 20]);    //[pixel, pixel], [line, gap]
            context.beginPath();
            context.moveTo(tmp, this.topBoundary);
            context.lineTo(tmp, this.bottomBoundary);
            context.stroke();
        }

        context.setLineDash([]);

        this.border.forEach(border => {
            context.beginPath();
            context.moveTo(border[0].x, border[0].y);
            context.lineTo(border[1].x, border[1].y);
            context.stroke();
        });

    }

}