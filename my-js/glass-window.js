let glassWindowPatterns = [
    "Fritted",
    "Individual Segments",
    "Zig Zag",
    "Two Column"
];

class WindowPattern{
    pattern;
    windows = [];

    constructor(center, width, height) {
        this.setBuildingDimensions(center, width, height);
        this.createCornerBoundary();
    }

    createCornerBoundary(){
        this.topLeft = createVector(
            this.center.x - this.width/2 + (this.width/2 * 0.1),
            this.center.y - this.height/2 + (this.height/2 * 0.1)
        )
        this.topRight = createVector(
            this.center.x + this.width/2 - (this.width/2 * 0.1),
            this.center.y - this.height/2 + (this.height/2 * 0.1)
        )
        this.bottomLeft = createVector(
            this.center.x - this.width/2 + (this.width/2 * 0.1),
            this.center.y + this.height/2 - (this.height/2 * 0.1)
        )
        this.bottomRight = createVector(
            this.center.x + this.width/2 - (this.width/2 * 0.1),
            this.center.y + this.height/2 - (this.height/2 * 0.1)
        )
    }

    setBuildingDimensions(center, width, height){
        this.center = center;
        this.width = width;
        this.height = height;
    }

    draw(){
        this.drawPattern();
    }

    drawPattern(){
        switch (this.pattern){
            case ("Fritted"):
                this._attachFrittedPattern();
                break;
            case ("Individual Segments"):
                this._attachIndividualSegPattern();
                break;
            case ("Zig Zag"):
                this._attachZigZagPattern();
                break;
            case ("Two Columns"):
                this._attachTwoColunPattern();
                break
            default:
                break;
        }
    }

    _attachFrittedPattern(){

    }

    _attachIndividualSegPattern(){
        let i = 0;
        let windowDimensions = createVector(
            this.width * 0.1,
            this.height * 0.1
        );
        let spacingX = windowDimensions.x;

        /*while(this.windows[i].){

        }*/

    }

    _attachZigZagPattern(){

    }

    _attachTwoColunPattern(){

    }

}

class BuildingWindow{

    isFlashing = false;
    isFlashingUp = false;
    isPartyTime = false;
    color = color(0,0,0,255);

    constructor(corner, dimensions) {
        this.x = corner.x, this.y = corner.y;
        this.width = dimensions.x, this.height = dimensions.y;
    }

    draw(){
        this.flashLights();
        this.flashPartyLights();
        fill(this.color);
        rectMode(CORNERS);
        rect(
            this.x, 
            this.y,
            this.x+this.width, 
            this.y+this.height
        );
    }

    flashLights(){
        if (this.isFlashing){
            this.color.alpha += (this.isFlashingUp) ?  1 : -1;
            if(this.color.alpha >= 255){
                this.isFlashingUp = false;
            }
            else if(this.color.alpha <= 200){
                this.isFlashingUp = true;
            }
        }
    }

    flashPartyLights(){
        if(this.isPartyTime){
            
        }
    }

}

