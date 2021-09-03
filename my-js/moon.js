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

    resetMoonTo(x, radius){
        /* Resets the moon position to the center
        and resizes the moon to fit the screen */
        this.x = x;
        this.radius = limit(
            radius,
            200,
            19280/2
        );
    }

}