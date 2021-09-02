class Moon{
    
    defaultColor = "#f6d6bd";

    constructor(x, y, radius){
        [this.x, this.y] = [x, y];
        this.radius = radius;
    }

    draw(){
        noStroke();
        fill(this.defaultColor);
        ellipse(
            this.x, 
            this.y, 
            this.radius,
        );
    }

}