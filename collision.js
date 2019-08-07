const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


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

function Circle(x, y, radius, color ,id) {
    this.id = id;
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
    };
};

function chase(){
    if(mouse.x > circle1.x){
        circle1.x = circle1.x+1;
    }
    if(mouse.y > circle1.y){
        circle1.y = circle1.y+1;
    }
    if(mouse.x < circle1.x){
        circle1.x = circle1.x-1;
    }
    if(mouse.y < circle1.y){
        circle1.y = circle1.y-1;
    }
}

// function chaseX(_x){
//     if(mouse.x > circle1.x){
//      var _x = circle1.x+1;
//     }
//     if(mouse.x < circle1.x){
//      var _x = circle1.x-1;
//     }
//     return _x;
// }


let circle1;
let MainCircle;
function init() {
    circle1 = new Circle(30, 30, 10, 'black','111');
    // circle1.id = '111';
    MainCircle = new Circle(10, 10, 30, 'red','222');
    // circle2.id = '222';

}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circle1.update();

    MainCircle.x = mouse.x;
    MainCircle.y = mouse.y;
    MainCircle.update();

    if (getDistance(circle1.x, circle1.y, MainCircle.x, MainCircle.y) < circle1.radius + MainCircle.radius) {
        circle1.color = '#2185C5';
        // circle1.x = addEventListener("mousemove",chaseX);

        // if(mouse.x > circle1.x){
        //     circle1.x = circle1.x+1;
        // }
        // if(mouse.y > circle1.y){
        //     circle1.y = circle1.y+1;
        // }
        // if(mouse.x < circle1.x){
        //     circle1.x = circle1.x-1;
        // }
        // if(mouse.y < circle1.y){
        //     circle1.y = circle1.y-1;
        // }

        chase();
    }else{
        circle1.color = 'black';
        // chase();

    }
    // if(mouse.x > circle1.x){
    //     circle1.x = circle1.x+1;
    // }
    // if(mouse.y > circle1.y){
    //     circle1.y = circle1.y+1;
    // }
    // if(mouse.x < circle1.x){
    //     circle1.x = circle1.x-1;
    // }
    // if(mouse.y < circle1.y){
    //     circle1.y = circle1.y-1;
    // }

    // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y))
}

init();
animate();