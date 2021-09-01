const roofTypeList = [
    "No_Edge_Triangle",
    "Left_Edge_Triangle",
    "Right_Edge_Triangle",
    "Trapezoid",
    "Left_Trapezoid_Antenna",
    "Multi_Layer",
    "Multi_Layer_Antenna",
    "Multi_Layer_Triangle",
    "Roof_Access",
    "Fancy_Architecture",
    "None"
];

class Roof{
    defaultColor = color(15,15,15);
    heightAdjustment = 0.9;     //Some shapes produce unwanted spacing
                                //with the stacking method.  This multiplier
                                //applied to the starting y positions eliminates
                                //the spacing.

    constructor(center, dimensions, blueprint=null) {
        this.setBuildingDimensions(center, dimensions);
        this.blueprint = (blueprint == null) ? this.getARandomNewBlueprint() : blueprint;
    }

    setBuildingDimensions(center, dimensions){
        this.center = center;
        this.dimensions = dimensions;
        this.buildingTopCorners = this.setBuildingTopCorners();
    }

    setBuildingTopCorners(){
        return {
            topLeft: createVector(
                this.center.x - this.dimensions.x / 2,
                this.center.y - this.dimensions.y / 2
            ),
            topRight: createVector(
                this.center.x + this.dimensions.x / 2,
                this.center.y - this.dimensions.y / 2
            )
        }
    }

    getARandomNewBlueprint(){
        return roofTypeList[getRandomIntFrom(roofTypeList.length)];
    }

    draw(){
        rectMode(CORNER);
        this.buildRoofFromBlueprint()
    }

    buildRoofFromBlueprint(){
        switch (this.blueprint){
            case ("No_Edge_Triangle"):
                this._layNoEdgeTriangleRoofing();
                break;
            case ("Left_Edge_Triangle"):
                this._layLeftEdgeTriangleRoofing();
                break;
            case ("Right_Edge_Triangle"):
                this._layRightEdgeTriangleRoofing();
                break;
            case ("Trapezoid"):
                this._layTrapezoidRoofing();
                break;
            case ("Left_Trapezoid_Antenna"):
                this._layLeftTrapezoidAntennaRoofing();
                break;
            case ("Multi_Layer"):
                this._layMultiLayerRoofing(3);
                break;
            case ("Multi_Layer_Antenna"):
                this._layMultiLayerAntennaRoofing();
                break;
            case ("Multi_Layer_Triangle"):
                this._layMultiLayerTriangle();
                break;
            case ("Roof_Access"):
                this._layRoofAccessRoofing();
                break;
            case ("Fancy_Architecture"):
                this._layFancyArchitectureRoofing();
                break;
            default:
                break;
        }
    }

    _layNoEdgeTriangleRoofing(){
        let edgeSpacing = this.dimensions.x * 0.075;
        let maxRoofHeight = this.buildingTopCorners.topRight.y - 30;
        noStroke();
        triangle(
            this.buildingTopCorners.topLeft.x + edgeSpacing,
            this.buildingTopCorners.topLeft.y,
            this.center.x,
            maxRoofHeight,
            this.buildingTopCorners.topRight.x - edgeSpacing,
            this.buildingTopCorners.topRight.y
        );
    }

    _layLeftEdgeTriangleRoofing(){
        let edgeXLocation = this.buildingTopCorners.topLeft.x;
        let maxRoofHeight = this.buildingTopCorners.topRight.y - 35;
        noStroke();
        triangle(
            this.buildingTopCorners.topLeft.x,
            this.buildingTopCorners.topLeft.y,
            edgeXLocation,
            maxRoofHeight,
            this.buildingTopCorners.topRight.x,
            this.buildingTopCorners.topRight.y
        );
    }

    _layRightEdgeTriangleRoofing(){
        let edgeXLocation = this.buildingTopCorners.topRight.x;
        let maxRoofHeight = this.buildingTopCorners.topRight.y - 35;
        noStroke();
        triangle(
            this.buildingTopCorners.topLeft.x,
            this.buildingTopCorners.topLeft.y,
            edgeXLocation,
            maxRoofHeight,
            this.buildingTopCorners.topRight.x,
            this.buildingTopCorners.topRight.y
        );
    }

    _layTrapezoidRoofing(){
        let edgeSpacing = this.dimensions.x * 0.15;
        let maxRoofHeight = this.buildingTopCorners.topRight.y - 20;
        noStroke();
        beginShape();
        vertex(this.buildingTopCorners.topLeft.x, this.buildingTopCorners.topLeft.y);
        vertex(this.buildingTopCorners.topLeft.x + edgeSpacing, maxRoofHeight);
        vertex(this.buildingTopCorners.topRight.x - edgeSpacing, maxRoofHeight);
        vertex(this.buildingTopCorners.topRight.x, this.buildingTopCorners.topRight.y);
        endShape();
    }

    _layLeftTrapezoidAntennaRoofing(){
        let antennaHeight = this.buildingTopCorners.topLeft.y - 50;
        let leftMidpointX = (this.center.x -this.buildingTopCorners.topLeft.x)/2
            + this.buildingTopCorners.topLeft.x;
        this._layTrapezoidRoofing();
        stroke(this.defaultColor);
        strokeWeight(1);
        line(
            leftMidpointX,
            this.buildingTopCorners.topLeft.y,
            leftMidpointX,
            antennaHeight
        );
    }

    _layMultiLayerRoofing(limitOfStacks){
        let defaultStackHeight = this.dimensions.y * 0.15;
        let defaultEdgeSpacing = this.dimensions.x * 0.10;
        for(let i = 1; i<=limitOfStacks; i++){
            this._layStackRoofing(
                defaultStackHeight*i,
                defaultEdgeSpacing*i
            );
        };
    }

    _layStackRoofing(maxHeight, edgeSpacing){
        let defaultStackHeight = this.dimensions.y * 0.15;
        let heightAdjustment = ((maxHeight - defaultStackHeight)/defaultStackHeight)
            * defaultStackHeight;
        let lowerY = this.buildingTopCorners.topLeft.y - heightAdjustment * this.heightAdjustment;
        let higherY = lowerY - maxHeight + heightAdjustment;
        beginShape();
        vertex(this.buildingTopCorners.topLeft.x + edgeSpacing, lowerY);
        vertex(this.buildingTopCorners.topLeft.x + edgeSpacing, higherY);
        vertex(this.buildingTopCorners.topRight.x - edgeSpacing, higherY);
        vertex(this.buildingTopCorners.topRight.x - edgeSpacing, lowerY);
        endShape();
    }

    _layMultiLayerAntennaRoofing(){
        let limitOfStack = 2;
        let edgeSpacing = (this.dimensions.x * 0.15 * limitOfStack) * 1.15;
        let antennaHeight = (this.dimensions.y * 0.15 * limitOfStack) * 0.50;
        this._layMultiLayerRoofing(limitOfStack);
        stroke(this.defaultColor);
        strokeWeight(1);
        line(
            this.buildingTopCorners.topLeft.x + edgeSpacing,
            this.buildingTopCorners.topLeft.y,
            this.buildingTopCorners.topLeft.x + edgeSpacing,
            this.buildingTopCorners.topLeft.y - antennaHeight
        );
        line(
            this.buildingTopCorners.topRight.x - edgeSpacing,
            this.buildingTopCorners.topRight.y,
            this.buildingTopCorners.topRight.x - edgeSpacing,
            this.buildingTopCorners.topRight.y - antennaHeight
        );
    }

    _layMultiLayerTriangle(){
        let limitOfStack = 2;
        let midXPoint = this.dimensions.x/2;
        let edgeSpacing = (this.dimensions.x * 0.15 * limitOfStack);
        let stackHeightSpacing = (this.dimensions.y * 0.15 * limitOfStack)
        let antennaHeightSpacing = stackHeightSpacing * 1.5;
        this._layMultiLayerRoofing(limitOfStack);
        triangle(
            this.buildingTopCorners.topLeft.x + edgeSpacing,
            this.buildingTopCorners.topLeft.y - stackHeightSpacing * this.heightAdjustment,
            this.buildingTopCorners.topLeft.x + midXPoint,
            this.buildingTopCorners.topLeft.y - antennaHeightSpacing,
            this.buildingTopCorners.topRight.x - edgeSpacing,
            this.buildingTopCorners.topLeft.y - stackHeightSpacing * this.heightAdjustment
        );
    }

    _layRoofAccessRoofing(){
        let sideLength = this.dimensions.x * 0.25;
        let defaultStackHeight = sideLength * 0.35;
        let defaultEdgeSpacing = this.dimensions.x * 0.075;
        let triangleXAxisOrigins = this.center.x-sideLength/2+sideLength-0.75;
        rect(
            this.center.x-sideLength/2,
            this.buildingTopCorners.topLeft.y-sideLength,
            sideLength, sideLength
        );
        triangle(
            triangleXAxisOrigins,
            this.buildingTopCorners.topLeft.y,
            triangleXAxisOrigins,
            this.buildingTopCorners.topLeft.y-sideLength,
            triangleXAxisOrigins+sideLength,
            this.buildingTopCorners.topLeft.y
        );
        this._layStackRoofing(defaultStackHeight, defaultEdgeSpacing);
    }

    _layFancyArchitectureRoofing(){
        let dimensionY = this.dimensions.y;
        let topLeftY = this.buildingTopCorners.topLeft.y;
        let stackHeightMultipliers = [0.075, 0.3, 0.070, 0.05];
        let stackWidthMultipliers = [1.15, 0.75, 0.85, 0.3];
        let stackHeights = stackHeightMultipliers.map(
            (x, i) =>
                topLeftY - (topLeftY - ((i == 0) ? 0 : (stackHeightMultipliers[i] * dimensionY)))
        );
        stackHeights = stackHeights.map(
            (x, i) => (i == 0) ? x : stackHeights.slice(0,i).reduce((a,b) => a + b, 0) + x
        );
        for(let i = 0; i < stackHeights.length; i++){
            this._buildFABlock(
                stackHeights[i],
                createVector(stackWidthMultipliers[i], stackHeightMultipliers[i])
            );
        }
        stroke(this.defaultColor);
        strokeWeight(2);
        line(
            this.center.x,
            topLeftY - stackHeights[stackHeights.length-1] * this.heightAdjustment,
            this.center.x,
            topLeftY
            - stackHeights[stackHeights.length-1]
            - (dimensionY * stackHeightMultipliers[stackHeightMultipliers.length-1])
            - (dimensionY*0.25)
        );
    }

    _buildFABlock(stackStartHeight, dimensionMultiplier){
        let bottomCenter = createVector(
            this.center.x,
            this.buildingTopCorners.topLeft.y - stackStartHeight * this.heightAdjustment
        );
        let blockDimensions = createVector(
            this.dimensions.x * dimensionMultiplier.x,
            this.dimensions.y * dimensionMultiplier.y
        );
        wrapRect(bottomCenter, blockDimensions);
    }

}