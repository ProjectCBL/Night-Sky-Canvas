function getRandomIntFrom(upperLimit){
    return Math.floor(Math.random() * upperLimit);
}

function wrapRect(bottomCenterOrigin, dimensions){
    let rectOrigin = createVector(
        bottomCenterOrigin.x - dimensions.x/2,
        bottomCenterOrigin.y
    );
    rect(
        rectOrigin.x, rectOrigin.y,
        dimensions.x, dimensions.y
    );
}