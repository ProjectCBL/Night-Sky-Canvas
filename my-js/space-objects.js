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
            this.radius
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

class Star{

    radius = 10;
    twinkleBright = false;
    defaultColor = {
        r: 246,
        g: 214,
        b: 189,
        a: 255
    };

    constructor(x, y){
        [this.x, this.y] = [x,y];
        this.defaultColor.a = getRandomIntFrom(255);
    }
    
    draw(){
        this.twinkle();
        this.drawStar();
    }

    drawStar(){
        noStroke();
        fill(
            this.defaultColor.r,
            this.defaultColor.g,
            this.defaultColor.b,
            this.defaultColor.a
        );
        ellipse(this.x, this.y, this.radius);
    }

    twinkle(){
        this.twinkleBright = (this.defaultColor.a > 255) ? false : 
        (this.defaultColor.a < 100) ? true : this.twinkleBright;
        this.defaultColor.a += (this.twinkleBright) ? 0.5 : -0.5;
    }

}