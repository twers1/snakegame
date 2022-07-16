let scoreBlock; // отображение очков
let score = 0; // наши очки внутри игры
const mysteps = { 
    step: 0,
    maxStep: 6,
    sizeCell: 16, // размер одной ячейки
    sizeBarry: 16 / 4 // размер ягоды
}
const snake = {
    x: 16, // координаты x и y
    y: 16,
    dx: mysteps.sizeCell, // скорость по вертикали и горизонтали 
    dy: 0,
    tails: [], // массив ячеек
    maxTails: 3
}
let berry = {
    x: 0, // координаты ягоды
    y: 0
}
// Пишем игровой цикл
let canvas = document.querySelector("#game-canvas")
let context = canvas.getContext("2d")
scoreBlock = document.querySelector(".game-score .score-count")
drawScore();
function gameLoop(){
    requestAnimationFrame(gameLoop);
    if (++mysteps.step < mysteps.maxStep){
        return;
    }
    mysteps.step = 0;
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBarry();
    drawSnake();
}
requestAnimationFrame(gameLoop);
function drawSnake(){ // сама змейка
    snake.x+=snake.dx;
    snake.y+= snake.dy;
    snake.tails.unshift({x: snake.x, y: snake.y})
    if(snake.tails.length > snake.maxTails){
        snake.tails.pop();
    }
    snake.tails.forEach(function(el,index){
        if (index == 0){
            context.fillStyle = "#FA0556"
        } else{
            context.fillStyle = "#A00034";
        }
        context.fillRect(el.x, el.y, mysteps.sizeCell, mysteps.sizeCell);
        if (el.x === berry.x && el.y === berry.y){
            snake.maxTails++;
            incScore()
            randomPositionBerry();
        }
        for (let i = index + 1; i<snake.tails.length; i++){
            if (el.x == snake.tails[i].x && el.y == snake.tails[i].y){
                refresGame();
            }
        }
    }
    )
}
function colisionBorder(){
    if (snake.x < 0 ){
        snake.x = canvas.width - mysteps.sizeCell
    } else if (snake.x >=canvas.width){
        snake.x = 0
    }
    if (snake.y < 0){
        snake.y = canvas.height - mysteps.sizeCell
    } else if (snake.y >=canvas.height){
        snake.y =0
    }
}
function refreshGame(){ // обнулирование  всех значений
score = 0;
drawScore();
snake.x = 160
snake.y =160
snake.tails = [];
snake.maxTails =3;
snake.dx = mysteps.sizeCell
snake.dy = 0;
} 
function drawBarry(){
    context.beginPath();
    context.fillStyle = "#A00034"
    context.arc(berry.x+(mysteps.sizeCell/2), berry.y+(mysteps.sizeCell/2), mysteps.sizeBarry, 0, 2* Math.PI
    )
    context.fill();
}
function randomPositionBerry(){
    berry.x = getRandomInt(0, canvas.width/mysteps.sizeCell) *mysteps.sizeCell
    berry.y = getRandomInt(o, canvas.height/mysteps.sizeCell)*mysteps.sizeCell
}
function incScore(){ // обработки очков, увеличивает число на один
    score++;
    drawScore();
}
function drawScore(){
    scoreBlock.innerHTML = score;
}
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min)+ min)
}
document.addEventListener("keydown", function(e){
    if (e.code == "KeyW"){
        snake.dy = -mysteps.sizeCell
        snake.dx = 0;
    } else if(e.code == "KeyA"){
        snake.dx = -mysteps.sizeCell 
        snake.dy = 0;
    } else if(e.code == "KeyS"){
        snake.dy = mysteps.sizeCell
        snake.dx = 0;
    } else if(e.code == "KeyD"){
        snake.dx = mysteps.sizeCell 
        snake.dy = 0;
    }
}
)