let width = window.innerWidth-5;
let height = 500;
let building1;
let building2;
let building3;

function setup() {
    createCanvas(width, height);
    building1 = new Building(
        width/2,
        height/2,
        75,
        150
    );
    building2 = new Building(
        width/2-200,
        height/2,
        60,
        100
    );
    building3 = new Building(
        width/2+200,
        height/2,
        60,
        100
    );
    let red = color([255,0,0,255]);
    console.log(red.__getRed());
}

function draw() {
    background("#08141e");
    building1.draw();
    building2.draw();
    building3.draw();
}