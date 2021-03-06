function blockCollision(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x1 < x2 && y1 < y1) {
        if ((x1 + w1) >= x2 && x1 <= (x2 + w2) && (y1 + h1) >= y2 && y1 <= (y2 + h2)) {
            return true;
        }
    } else {

        if ((x2 + w2) >= x1 && x2 <= (x1 + w1) && (y2 + h2) >= y1 && y2 <= (y1 + h1)) {
            return true;
        }
    }
    return false;
}



function mouseangle(l1, l2) {
    let cateto = -(l1 - (windowHeight / 2))
    let cateto2 = l2 - (windowWidth / 2)
    let degree;
    if (cateto >= 0) {      //quadrante I ou II
        if (cateto2 >= 0) {   //quadrante I
            degree = Math.atan(cateto / cateto2) * (180 / Math.PI);
        } else {      //quadrante II
            degree = (Math.atan(cateto / cateto2) * (180 / Math.PI)) + 180;
        }
    } else {              // quadrante III ou IV
        if (cateto2 >= 0) {   //quadrante IV
            degree = (Math.atan(cateto / cateto2) * (180 / Math.PI)) + 360;
        } else {      //quadrante III
            degree = (Math.atan(cateto / cateto2) * (180 / Math.PI)) + 180;
        }
    }
    return degree;
}

function polarToCart(dist, teta) {
    let x = dist * Math.cos(teta * (Math.PI / 180));
    let y = dist * Math.sin(teta * (Math.PI / 180));

    return {
        x: x,
        y: y
    }
}

function mouseXToRealX(mousex) {
    return x = player.x + (mousex - (windowWidth / 2));
}


function mouseYToRealY(mousey) {
    return y = player.y + (mousey - (windowHeight / 2));
}


function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;

    // which edge is closest?
    if (cx < rx) {
        testX = rx;      // test left edge
    } else if (cx > rx + rw) {
        testX = rx + rw;   // right edge
    }
    if (cy < ry) {
        testY = ry;      // top edge
    }
    else if (cy > ry + rh) {
        testY = ry + rh;   // bottom edge
    }


    // get distance from closest edges
    let distX = cx - testX;
    let distY = cy - testY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
        return true;
    }
    return false;
}



// LINE/RECTANGLE
function lineRect( x1,  y1,  x2,  y2,  rx,  ry,  rw,  rh) {

    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    let left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    let right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    let top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
  
    // if ANY of the above are true, the line
    // has hit the rectangle
    if (left || right || top || bottom) {
      return true;
    }
    return false;
  }


function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the direction of the lines
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

        // optionally, draw a circle where the lines meet
        let intersectionX = x1 + (uA * (x2 - x1));
        let intersectionY = y1 + (uA * (y2 - y1));
        fill(255, 0, 0);
        noStroke();
        ellipse(intersectionX, intersectionY, 20, 20);

        return true;
    }
    return false;
}