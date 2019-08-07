
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


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



function Ball(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function(){
        if (this.y + this.radius > canvas.height) {
            this.dy = - this.dy * 0.9;
        }else{
            this.dy += 1;
        }
        this.y += this.dy/2;
        this.draw();
    };

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0,Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };
};

var ball;
var ballArray = [];
function init() {
    var radius = 15;
    for (i=0; i<200; i++) {
        var x = rundomIntFromRange(0, canvas.width);
        var y = rundomIntFromRange(0, canvas.height - radius);

        ballArray.push (new Ball(x, y, 2, 15, 'blue'));
    }
    // ball = new Ball(canvas.width/2, canvas.height/2 , 2, 30, 'red');
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (i=0; i< ballArray.length; i++) {
        ballArray[i].update();
    }
    // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    // ball.update();
}

init();
animate();