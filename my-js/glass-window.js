let glassWindowPatterns = [
    "Fritted",
    "Individual Segments",
    "Zig Zag",
    "Two Column"
];

class WindowPattern{
    pattern;
    windows = [];

    constructor(center, width, height, pattern=null){
        this.setBuildingDimensions(center, width, height);
        this.createCornerBoundary();
        this.patter = (pattern != null) ? pattern : this.getRandomPattern();
        this.createWindowPattern();
    }

    getRandomPattern(){
        let index = Math.floor(Math.random() * glassWindowPatterns.length);
        return glassWindowPatterns[index];
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

    createWindowPattern(){
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

    draw(){
        this.drawPattern();
    }

    drawPattern(){
        for(let i = 0; i < this.windows.length; i++){
            this.windows[i].draw();
        }
    }

    _attachFrittedPattern(){
        //@TODO: implement fritted pattern design
    }

    _attachIndividualSegPattern(){
        let h = 0;
        let windowDimensions = createVector(
            this.width * 0.1,
            this.height * 0.1
        );
        let spacingX = windowDimensions.x;
        let spacingY = windowDimensions.y;

        while(h < 6){
            for (let i = 0; i < 2; i++){
                this.windows.push(
                    this.BuildingWindow(
                        createVector(
                            this.bottomLeft.x + (i*(spacingX*2)),
                            this.bottomLeft.y + (h*(spacingY+(spacingY/2)))
                        ),
                        windowDimensions
                    )
                );
            }   
            for (let i = 0; i < 2; i++){
                this.windows.push(
                    this.BuildingWindow(
                        createVector(
                            this.bottomRight.x - spacingX - (i*(spacingX*2)),
                            this.bottomRight.y + (h*(spacingY+(spacingY/2)))
                        ),
                        windowDimensions
                    )
                );
            }
            h++;
        }
    }

    _attachZigZagPattern(){
        //@TODO: implement zig zag pattern design
    }

    _attachTwoColunPattern(){
        //@TODO: implement two column pattern design
    }

}

class BuildingWindow{

    isFlashing = false;
    isFlashingUp = false;
    isPartyTime = false;
    color = { 
        red: 0, 
        green: 0,  
        blue: 0,  
        alpha: 255 
    }

    constructor(corner, dimensions) {
        this.x = corner.x, this.y = corner.y;
        this.width = dimensions.x, this.height = dimensions.y;
    }

    setLights(){

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
            this.color.red = (this.color.red <= 0) ? 255 : this.color.red - 1;
            this.color.green = 255 * (mouseX/width);
            this.color.blue = 255 * (mouseY/height); 
        }
        else{
            this.color.red = this.color.blue = this.color.green = 255
        }
    }

}

