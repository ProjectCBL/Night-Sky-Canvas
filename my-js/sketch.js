let backgroundColor = "#08141e";
let buildingLayers = {
    firstLayer:{
        buildings:[],
        color: '#0f2a3f'
    },
    secondLayer: {
        buildings:[],
        color: '#20394f',
    },
}
let screen = {
    width: window.innerWidth - (window.innerWidth * 0.1),
    height: 500
}
let defaultBuildingDimensions = {
    width: 60,
    height: 100
};
let coord = {
    start: {x: 0, y: screen.height},
    end: {x: screen.width, y: screen.height},
};
const multipliers = {
    height: [2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0],
    width: [1.0, 1.1, 1.2, 1.3]
};
const buildingSpace = 30;

function setup() {

    let canvas = createCanvas(screen.width, screen.height);
    canvas.id("myCanvas");
    generateBuildingsCollection(buildingLayers, 0.4);

}

function draw() {
    background(backgroundColor);
    drawAllBuildings();
    drawBottomFade();
}

function windowResized(){
    resizeCanvas(
        window.innerWidth - (window.innerWidth*0.1), 
        500
    );
    screen.width = window.innerWidth - (window.innerWidth * 0.1);
    generateBuildingsCollection(buildingLayers, 0.4, true);
}

function drawAllBuildings(){
    for(let i = 0; i < buildingLayers.secondLayer.buildings.length; i++){
        buildingLayers.secondLayer.buildings[i].draw();
    }
    for(let i = 0; i < buildingLayers.firstLayer.buildings.length; i++){
        buildingLayers.firstLayer.buildings[i].draw();
    }
}

function generateBuildingsCollection(layers, heightAdjustment, generateMore=false){

    let loop  = 0;
    for(let layer in layers){

        let buildingColor = buildingLayers[layer].color;

        if (generateMore){
            let buildingX = buildingLayers[layer]
            .buildings[buildingLayers[layer].buildings.length-1]
            .x;

            let buildingWidth = buildingLayers[layer]
            .buildings[buildingLayers[layer].buildings.length-1]
            .width;

            coord.start.x = buildingX;
            coord.end.x = screen.width;
        }

        while(true){
            let newStructure = getNewBuildingStructure();
            newStructure.height *= 1.0 + (heightAdjustment * loop);
    
            if (coord.start.x == 0){
                const cutoffRanges = [0.3, 0.35, 0.4, 0.45];
                const cutoffIndex = getRandomIntFrom(cutoffRanges.length);
                coord.start.x -= newStructure.width/2 * cutoffRanges[cutoffIndex];
            }
            else if(coord.start.x > coord.end.x){
                break;
            }
            else{
                const endIndex = buildingLayers[layer].buildings.length-1;
                coord.start.x += 
                (buildingLayers[layer].buildings[endIndex].width/1.5) 
                + buildingSpace;
            }
    
            buildingLayers[layer].buildings.push(
                new Building(
                    coord.start.x, 
                    coord.start.y, 
                    newStructure.width, 
                    newStructure.height,
                    (layer == "firstLayer") ? true : false
                )
            );
            
            let lastIndex = buildingLayers[layer].buildings.length-1;
            buildingLayers[layer].buildings[lastIndex].defaultColor = color(buildingColor);
            buildingLayers[layer].buildings[lastIndex].roof.defaultColor = color(buildingColor);
        }

        loop++;
        coord.start.x = 0;

    }

}

function drawBottomFade(){
    const fadeHeight = screen.height-30;
    const bgColor = color(backgroundColor);
    const endColor = color(buildingLayers.firstLayer.color);

    rectMode(CORNERS);
    for(let x = 0, h = screen.height; h > fadeHeight; h--, x++){
        noFill();
        let n = map(h, screen.height, fadeHeight, 0, 1);
        let newColor = lerpColor(bgColor, endColor, n);
        stroke(newColor);
        line(0, h, width, h);
        //rect(x, h, width-x, x);   //Add this line to create a faded border all around
    }
}

function getNewBuildingStructure() {
    let indexWidth = getRandomIntFrom(multipliers.width.length);
    let indexHeight = getRandomIntFrom(multipliers.height.length);
    let newBuildingStructure = {
        width: defaultBuildingDimensions.width * multipliers.width[indexWidth],
        height: defaultBuildingDimensions.height * multipliers.height[indexHeight]
    };
    return newBuildingStructure;
}