const glassWindowPatterns = [
    "Fritted",
    "Individual Segments",
    "Zig Zag",
    "Two Columns"
];

class WindowPattern{
    pattern;
    windows = [];

    constructor(center, width, height, pattern=null){
        this.setBuildingDimensions(center, width, height);
        this.createCornerBoundary();
        this.pattern = (pattern != null) ? pattern : this.getRandomPattern();
        this.createPattern();
    }

    getRandomPattern(){
        let index = Math.floor(Math.random() * glassWindowPatterns.length);
        return glassWindowPatterns[index];
    }

    createCornerBoundary(){
        this.topLeft = createVector(
            this.center.x - this.width/2 + (this.width/2 * 0.25),
            this.center.y - this.height/2 + (this.height/2 * 0.1)
        )
        this.topRight = createVector(
            this.center.x + this.width/2 - (this.width/2 * 0.25),
            this.center.y - this.height/2 + (this.height/2 * 0.1)
        )
        this.bottomLeft = createVector(
            this.center.x - this.width/2 + (this.width/2 * 0.25),
            this.center.y + this.height/2 - (this.height/2 * 0.1)
        )
        this.bottomRight = createVector(
            this.center.x + this.width/2 - (this.width/2 * 0.25),
            this.center.y + this.height/2 - (this.height/2 * 0.1)
        )
    }

    setBuildingDimensions(center, width, height){
        this.center = center;
        this.width = width;
        this.height = height;
    }

    createPattern(){
        switch (this.pattern){
            case ("Fritted"):
                this._attachFrittedPattern();
                break;
            case ("Individual Segments"):
                this._attachIndividualSegPattern();
                console.log("Something Baka");
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
        let windowDimensions = createVector(
            this.width * 0.1,
            this.height * 0.05
        );
        let spacingX = windowDimensions.x;
        let spacingY = windowDimensions.y;
        for(let h = 0; h < 12; h++){
            //Left Outer Windows
            for (let i = 0; i < 2; i++){
                this.windows.push(
                    new BuildingWindow(
                        createVector(
                            this.bottomLeft.x 
                            + (i*(spacingX+(spacingX/2))) 
                            + windowDimensions.x/2 
                            - windowDimensions.x/4,
                            this.bottomLeft.y - (h*(spacingY+(spacingY/2)))
                        ),
                        windowDimensions
                    )
                );
            }
            //Center Windows
            this.windows.push(
                new BuildingWindow(
                    createVector(
                        this.center.x - windowDimensions.x/2,
                        this.bottomLeft.y - (h*(spacingY+(spacingY/2)))
                    ),
                    windowDimensions
                )
            );
            //Right Outer Windows
            for (let i = 0; i < 2; i++){
                this.windows.push(
                    new BuildingWindow(
                        createVector(
                            this.bottomRight.x 
                            - spacingX 
                            - (i*(spacingX+(spacingX/2))) 
                            - windowDimensions.x/2
                            + windowDimensions.x/4,
                            this.bottomRight.y - (h*(spacingY+(spacingY/2)))
                        ),
                        windowDimensions
                    )
                );
            }
        }
    }

    _attachIndividualSegPattern(){
        let windowDimensions = createVector(
            this.width * 0.1,
            this.height * 0.05
        );
        let spacingX = windowDimensions.x;
        let spacingY = windowDimensions.y;
        for(let h = 0; h < 12; h++){
            for (let i = 0; i < 2; i++){
                this.windows.push(
                    new BuildingWindow(
                        createVector(
                            this.bottomLeft.x + (i*(spacingX*2)),
                            this.bottomLeft.y - (h*(spacingY+(spacingY/2)))
                        ),
                        windowDimensions
                    )
                );
            }   
            for (let i = 0; i < 2; i++){
                this.windows.push(
                    new BuildingWindow(
                        createVector(
                            this.bottomRight.x - spacingX - (i*(spacingX*2)),
                            this.bottomRight.y - (h*(spacingY+(spacingY/2)))
                        ),
                        windowDimensions
                    )
                );
            }
        }
    }

    _attachZigZagPattern(){
        let windowDimensions = createVector(
            -1 * this.width * 0.3,
            this.height * 0.05
        );
        let spacingY = windowDimensions.y + windowDimensions.y/2;

        for(let h = 0; h < 12; h++){
            windowDimensions.x *= -1;
            this.windows.push(
                new BuildingWindow(
                    createVector(
                        (h % 2 == 0) ? this.bottomLeft.x : this.bottomRight.x, 
                        this.bottomLeft.y - (spacingY * h)
                    ),
                    windowDimensions
                )
            );
        }
    }

    _attachTwoColunPattern(){
        let windowDimensions = createVector(
            -1 * this.width * 0.3,
            this.height * 0.05
        );
        let spacingY = windowDimensions.y * 2 ;

        for(let h = 0; h < 9; h++){
            windowDimensions.x *= -1;
            this.windows.push(
                new BuildingWindow(
                    createVector(
                        this.bottomLeft.x, 
                        this.bottomLeft.y - (spacingY * h)
                    ),
                    windowDimensions
                )
            );
            windowDimensions.x *= -1;
            this.windows.push(
                new BuildingWindow(
                    createVector(
                        this.bottomRight.x, 
                        this.bottomLeft.y - (spacingY * h)
                    ),
                    windowDimensions
                )
            );
        }
    }

}

class BuildingWindow{

    isFlashing = false;
    isFlashingUp = false;
    isPartyTime = false;
    color = { 
        red: 255, 
        green: 255,  
        blue: 255,  
        alpha: 200 
    }

    constructor(corner, dimensions) {
        this.x = corner.x, this.y = corner.y;
        this.width = dimensions.x, this.height = dimensions.y;
        this.setLights();
    }

    setLights(){
        this.isFlashing = (getRandomIntFrom(100) < 30) ? true : false;
        this.isPartyTime = (getRandomIntFrom(100) < 10) ? true : false;
        this.color.red = (this.isPartyTime) ? 255 * ((getRandomIntFrom(100)+1)/100) : 255;
    }

    draw(){
        this.flashLights();
        this.flashPartyLights();
        fill(
            this.color.red,
            this.color.green,
            this.color.blue,
            this.color.alpha
        );
        rectMode(CORNERS);
        rect(
            this.x, 
            this.y,
            this.x+this.width, 
            this.y-this.height
        );
    }

    flashLights(){
        if (this.isFlashing){
            this.color.alpha += (this.isFlashingUp) ?  1.5 : -1.5;
            if(this.color.alpha >= 255){
                this.isFlashingUp = false;
            }
            else if(this.color.alpha <= 125){
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

