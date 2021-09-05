export default class Snake {
    directionX = 0;
    directionY = 1;
    size;
    isGrowing = false;


    body = [
        {x: 5, y: 5},
    ];



    constructor(size) {
        this.size = size
    }

    isCollision() {
        let isCollision = false;
        const head = this.body[0];
        this.body.forEach((cell, index) => {
            if (index === 0) return;
            if (cell.x === head.x && cell.y === head.y) {
                isCollision = true
            }
        })
        return isCollision;
    }

    addSize(){
        for(let i = 1; i < this.size; i++){
            this.body.push({x: 5, y: this.body[0].x - i})
        }
    }

    move() {
        if (!this.isGrowing){
            this.body.pop();
        }

        this.isGrowing = false;

        const head = this.body[0];

        if (this.directionX !== 0) {
            this.body.unshift({x: head.x + this.directionX, y: head.y});
            return;
        }

        if (this.directionY !== 0) {
            this.body.unshift({x: head.x, y: head.y + this.directionY});
            return;
        }

    }

    grow(){
        this.isGrowing = true

    }
}