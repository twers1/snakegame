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