import Snake from "./snake.js";
import Renderer from './renderer.js'




class Game {
    renderer = new Renderer();
    snake = new Snake(6);

    commandQueue = [];

    appleX = null;
    appleY = null;

    gameSpeed;
    gameSquareSize;
    timerId;
    numberScore = 0;



    constructor(gameSpeed, gameSquareSize = 20) {
        this.gameSpeed = gameSpeed;
        this.gameSquareSize = gameSquareSize;
    }

    start() {
        this.renderer.renderScreen(500, 500);
        this.renderer.renderScore();
        this.generateAppleCoordinates();

        document.addEventListener('keydown', e => {
            this.commandQueue.push(e.key);
            switch (e.key) {
                case 'ArrowLeft':
                    this.snake.directionX = -1;
                    this.snake.directionY = 0;
                    return;
                case 'ArrowRight':
                    this.snake.directionX = 1;
                    this.snake.directionY = 0;
                    return;
                case 'ArrowDown':
                    this.snake.directionX = 0;
                    this.snake.directionY = 1;
                    return;
                case 'ArrowUp':
                    this.snake.directionX = 0;
                    this.snake.directionY = -1;
                    return;
            }
        })

        this.timerId = setInterval(() => {
            const command = this.commandQueue.pop();
            switch (command) {
                case 'ArrowLeft':
                    this.snake.directionX = -1;
                    this.snake.directionY = 0;
                    break;
                case 'ArrowRight':
                    this.snake.directionX = 1;
                    this.snake.directionY = 0;
                    break;
                case 'ArrowDown':
                    this.snake.directionX = 0;
                    this.snake.directionY = 1;
                    break;
                case 'ArrowUp':
                    this.snake.directionX = 0;
                    this.snake.directionY = -1;
                    break;
            }
            this.renderer.clear();
            if(this.isSnakeEatedApple()){
                this.snake.grow();
                this.numberScore++;
                this.renderer.score.innerHTML = `${this.numberScore}`;
                this.generateAppleCoordinates()
            } else {
                this.renderApple();
            }
            this.snake.move();
            this.renderSnake();
            this.crash();
            if(this.snake.isCollision()){
                alert('Game over')
            }

        }, this.gameSpeed)
    }

    renderSnake() {
        this.snake.body.forEach(snakeCell => {
            this.renderer.renderSquare(this.gameSquareSize, snakeCell.x * this.gameSquareSize, snakeCell.y * this.gameSquareSize, 'green')
        })
    }

    generateAppleCoordinates() {
        let appleRange = [];

        for (let i = 20; i <= 480; i += 20) {
            appleRange.push(i)
        }

        this.appleX = appleRange[Math.floor(Math.random() * (appleRange.length - 1))];
        this.appleY = appleRange[Math.floor(Math.random() * (appleRange.length - 1))];

        return this.appleX, this.appleY;
    }

    renderApple (){
        this.renderer.renderSquare(this.gameSquareSize, this.appleX, this.appleY, 'red')
    }

    pause() {
        document.addEventListener('keydown', e => {
                if (e.code !== 'Space') return;

                if (this.timerId === null) {
                    this.timerId = setInterval(() => {
                        this.renderer.clear();
                        this.snake.move();
                        this.renderSnake();
                        this.crash();
                    }, this.gameSpeed)

                    return;
                }

                clearInterval(this.timerId);
                this.timerId = null;
            }
        )
    }

    stop() {
        document.addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                clearInterval(this.timerId)
                this.renderer.clear()
            }
        })
    }

    //FIXME
    //объеденить с методом isCollision
    crash() {
        if (this.snake.body[0].x === -1 || this.snake.body[0].x === 25 || this.snake.body[0].y === -1 || this.snake.body[0].y === 25) {
            clearInterval(this.timerId)
            this.renderer.clear()
            alert('Game over');
        }
    }

    isSnakeEatedApple() {
        const head = this.snake.body[0];
        return head.x === this.appleX / this.gameSquareSize  && head.y === this.appleY / this.gameSquareSize
    }
}


const game = new Game(400, 20);

game.start();
game.pause();
game.stop();
game.snake.addSize()
