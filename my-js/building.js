class Building{
    x;
    y;
    width;
    height;
    defaultColor = "black";

    constructor(x, y, width, height) {
        [this.x, this.y] = [x, y];
        [this.width, this.height] = [width, height];
        this.foundation = new Foundation(x, y, width, height);
        this.roof = new Roof(createVector(x,y), createVector(width, height));
    }

    draw(){
        smooth();               //Anti-Aliasing
        fill(this.defaultColor);
        this.roof.draw();
        this.foundation.draw();
    }

}

class Foundation{

    topCorners = {
        topLeft: null,
        topRight: null,
    }

    constructor(x, y, width, height) {
        this.center = createVector(x, y);
        [this.width, this.height] = [width, height];
        this.setTopCorners();
    }

    setTopCorners(){
        this.topCorners.topLeft = createVector(
            this.center.x-this.width/2,
            this.center.y-this.height/2
        );
        this.topCorners.topRight = createVector(
            this.center.x+this.width/2,
            this.center.y-this.height/2
        );
    }

    draw(){
        rectMode(CENTER);
        this.drawRectangle();
    }

    drawRectangle(){
        noStroke();
        rect(
            this.center.x,
            this.center.y,
            this.width,
            this.height
        );
    }

}