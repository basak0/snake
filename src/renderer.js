export default class Renderer {
    screen = null;
    score = null;


    renderScreen(w, h) {
        const screen = document.createElement('div');

        screen.style.width = w + 'px';
        screen.style.height = h + 'px';
        screen.style.position = 'relative';
        screen.style.border = '1px solid black';

        document.body.appendChild(screen);

        this.screen = screen;
    }

    renderSquare(size, x, y, color) {
        const square = document.createElement('div');

        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.position = 'absolute';
        square.style.top = `${y}px`;
        square.style.left = `${x}px`;
        square.style.backgroundColor = color;
        square.style.border = '1px solid black';

        this.screen?.appendChild(square);
    }

    renderScore(){
        const score = document.createElement('div')
        score.style.width = `50px`;
        score.style.height = `50px`;
        score.style.position = 'relative';
        score.style.top = `20px`;
        score.style.left = `20px`;
        score.style.border = '1px solid black';
        score.style.textAlign = 'center';
        score.style.fontSize = '40px';

        document.body?.appendChild(score);
        this.score = score;
    }

    clear() {
        this.screen.innerHTML = '';
    }
}