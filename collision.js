
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// wedw

let mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];



addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
 
addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});



function rundomIntFromRange (min, max) {
    return Math.floor(Math.random()*(max-min+1) + min);
};

function rundomColor(colors) {
    return colors [Math.floor(Math.random()*colors.length)];
};

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2-x1;
    let yDistance = y2-y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function(){

        this.draw();
    };

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0,Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

        // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y))
    };
};




let circle1;
let circle2;
function init() {
    circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(10, 10, 30, 'red');
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
        circle1.color = '#2185C5';
    }else{
        circle1.color = 'black';
    }

    // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y))
}

init();
animate();