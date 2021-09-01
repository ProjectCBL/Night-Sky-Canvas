let buildings = [];
let backgroundColor = "#08141e";
let screen = {
    width: window.innerWidth-5,
    height: 500
}
let defaultBuildingDimensions = {
    width: 60,
    height: 100
};

function setup() {

    let startCoord = {
        x: 0,
        y: screen.height
    }
    const endCoord = {
        x: screen.width, 
        y: screen.height
    }
    const heightMultipliers = [
        1.0, 1.1, 1.2, 1.3, 1.4, 1.5
    ];
    const widthMultipliers = [
        0.8, 0.9, 1.0, 1.1
    ];
    const buildingSpace = 30;

    createCanvas(screen.width, screen.height);

    function getNewBuildingStructure() {
        let indexWidth = getRandomIntFrom(widthMultipliers.length);
        let indexHeight = getRandomIntFrom(heightMultipliers.length);
        let newBuildingStructure = {
            width: defaultBuildingDimensions.width * widthMultipliers[indexWidth],
            height: defaultBuildingDimensions.height * heightMultipliers[indexHeight]
        };
        return newBuildingStructure;
    }

    while(true){
        let newStructure = getNewBuildingStructure();

        if (startCoord.x == 0){
            const cutoffRanges = [0.30, 0.35, 0.40];
            const cutoffIndex = getRandomIntFrom(cutoffRanges.length);
            startCoord.x -= newStructure.width * cutoffRanges[cutoffIndex];
        }
        else if(startCoord.x > endCoord.x){
            break;
        }
        else{
            startCoord.x += 
            (buildings[buildings.length-1].width/1.5) 
            + buildingSpace;
        }

        buildings.push(
            new Building(
                startCoord.x, 
                startCoord.y, 
                newStructure.width, 
                newStructure.height
            )
        );
    }

}

function draw() {
    background(backgroundColor);
    drawAllBuildings();
}

function drawAllBuildings(){
    for (let i = 0; i < buildings.length; i++){
        buildings[i].draw();
    }
}