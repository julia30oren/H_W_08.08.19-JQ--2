const charactersConfig = ["bagatz.jpg", "gan.jpg", "liber.jpg", "sara.jpg", "ynet.jpg"]

const enemies = [];
let level = 1
function init() {
    enemies.push(new BoardItem({ left: "900px", top: "550px" },
        { isUrl: false, path: "finish.jpg" }, "finish"))

    charactersConfig.forEach(function (image) {
        // image   // = string, for exmaple "bagatz.jpg"
        enemies.push(new BoardItem({ left: getRandomLocation(), top: getRandomLocation() },
            { isUrl: false, path: image }, getId()
        ))
    })

}

function draw() {
    for (let index = 0; index < level; index++) {
        const currentEnemy = enemies[index];
        currentEnemy.drawMe()
        if (currentEnemy.id !== "finish") currentEnemy.move()

    }

}

$(document).ready(function () {
    init();
    draw();


    const player = $("#enemy").clone()
    player.attr({ id: getId() })
    player.css({ display: "inline-block", position: "absolute", left: 0, top: 50 })
    player.children().attr({ src: "./images/bb.jpg" })
    player.draggable();


    player.on("drag", function (event) {
        //calc collisions
        collision(enemies, player.get()[0], event)
    })

    $("#board").append(player)

})

function collision(eArray, player, event) {
    const playerBounderies = player.getBoundingClientRect();
    eArray.forEach(function (boardItem) {
        const currentBoardItem = boardItem.domElement.get()[0].getBoundingClientRect();
        const collisionDetected = checkCollision(playerBounderies, currentBoardItem);
        if (collisionDetected) {
            console.log(boardItem)
            if (boardItem.id === "finish") {
                level++;
                draw()
            }
            $(player).animate({ left: 0, top: 50 }, 550)
            event.preventDefault()
        }
    })
}

function checkCollision(player, enemy) {
    if (player.x < enemy.x + enemy.width
        && player.x + player.width > enemy.x
        && player.y < enemy.y + enemy.height
        && player.y + player.height > enemy.y) {
        return true;
    }
    return false;
}
function getRandomLocation() {
    return Math.round(Math.random() * 777)
}
// Build function taht generate enemies
function getRandomNumber() {
    Date().now
}

function getId() {
    return Date.now()
}