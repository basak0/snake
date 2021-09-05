/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\n/* harmony import */ var _renderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderer.js */ \"./src/renderer.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n    renderer = new _renderer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n    snake = new _snake_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](6);\r\n\r\n    commandQueue = [];\r\n\r\n    appleX = null;\r\n    appleY = null;\r\n\r\n    gameSpeed;\r\n    gameSquareSize;\r\n    timerId;\r\n    numberScore = 0;\r\n\r\n\r\n\r\n    constructor(gameSpeed, gameSquareSize = 20) {\r\n        this.gameSpeed = gameSpeed;\r\n        this.gameSquareSize = gameSquareSize;\r\n    }\r\n\r\n    start() {\r\n        this.renderer.renderScreen(500, 500);\r\n        this.renderer.renderScore();\r\n        this.generateAppleCoordinates();\r\n\r\n        document.addEventListener('keydown', e => {\r\n            this.commandQueue.push(e.key);\r\n            switch (e.key) {\r\n                case 'ArrowLeft':\r\n                    this.snake.directionX = -1;\r\n                    this.snake.directionY = 0;\r\n                    return;\r\n                case 'ArrowRight':\r\n                    this.snake.directionX = 1;\r\n                    this.snake.directionY = 0;\r\n                    return;\r\n                case 'ArrowDown':\r\n                    this.snake.directionX = 0;\r\n                    this.snake.directionY = 1;\r\n                    return;\r\n                case 'ArrowUp':\r\n                    this.snake.directionX = 0;\r\n                    this.snake.directionY = -1;\r\n                    return;\r\n            }\r\n        })\r\n\r\n        this.timerId = setInterval(() => {\r\n            const command = this.commandQueue.pop();\r\n            switch (command) {\r\n                case 'ArrowLeft':\r\n                    this.snake.directionX = -1;\r\n                    this.snake.directionY = 0;\r\n                    break;\r\n                case 'ArrowRight':\r\n                    this.snake.directionX = 1;\r\n                    this.snake.directionY = 0;\r\n                    break;\r\n                case 'ArrowDown':\r\n                    this.snake.directionX = 0;\r\n                    this.snake.directionY = 1;\r\n                    break;\r\n                case 'ArrowUp':\r\n                    this.snake.directionX = 0;\r\n                    this.snake.directionY = -1;\r\n                    break;\r\n            }\r\n            this.renderer.clear();\r\n            if(this.isSnakeEatedApple()){\r\n                this.snake.grow();\r\n                this.numberScore++;\r\n                this.renderer.score.innerHTML = `${this.numberScore}`;\r\n                this.generateAppleCoordinates()\r\n            } else {\r\n                this.renderApple();\r\n            }\r\n            this.snake.move();\r\n            this.renderSnake();\r\n            this.crash();\r\n            if(this.snake.isCollision()){\r\n                alert('Game over')\r\n            }\r\n\r\n        }, this.gameSpeed)\r\n    }\r\n\r\n    renderSnake() {\r\n        this.snake.body.forEach(snakeCell => {\r\n            this.renderer.renderSquare(this.gameSquareSize, snakeCell.x * this.gameSquareSize, snakeCell.y * this.gameSquareSize, 'green')\r\n        })\r\n    }\r\n\r\n    generateAppleCoordinates() {\r\n        let appleRange = [];\r\n\r\n        for (let i = 20; i <= 480; i += 20) {\r\n            appleRange.push(i)\r\n        }\r\n\r\n        this.appleX = appleRange[Math.floor(Math.random() * (appleRange.length - 1))];\r\n        this.appleY = appleRange[Math.floor(Math.random() * (appleRange.length - 1))];\r\n\r\n        return this.appleX, this.appleY;\r\n    }\r\n\r\n    renderApple (){\r\n        this.renderer.renderSquare(this.gameSquareSize, this.appleX, this.appleY, 'red')\r\n    }\r\n\r\n    pause() {\r\n        document.addEventListener('keydown', e => {\r\n                if (e.code !== 'Space') return;\r\n\r\n                if (this.timerId === null) {\r\n                    this.timerId = setInterval(() => {\r\n                        this.renderer.clear();\r\n                        this.snake.move();\r\n                        this.renderSnake();\r\n                        this.crash();\r\n                    }, this.gameSpeed)\r\n\r\n                    return;\r\n                }\r\n\r\n                clearInterval(this.timerId);\r\n                this.timerId = null;\r\n            }\r\n        )\r\n    }\r\n\r\n    stop() {\r\n        document.addEventListener('keydown', e => {\r\n            if (e.code === 'Escape') {\r\n                clearInterval(this.timerId)\r\n                this.renderer.clear()\r\n            }\r\n        })\r\n    }\r\n\r\n    //FIXME\r\n    //объеденить с методом isCollision\r\n    crash() {\r\n        if (this.snake.body[0].x === -1 || this.snake.body[0].x === 25 || this.snake.body[0].y === -1 || this.snake.body[0].y === 25) {\r\n            clearInterval(this.timerId)\r\n            this.renderer.clear()\r\n            alert('Game over');\r\n        }\r\n    }\r\n\r\n    isSnakeEatedApple() {\r\n        const head = this.snake.body[0];\r\n        return head.x === this.appleX / this.gameSquareSize  && head.y === this.appleY / this.gameSquareSize\r\n    }\r\n}\r\n\r\n\r\nconst game = new Game(400, 20);\r\n\r\ngame.start();\r\ngame.pause();\r\ngame.stop();\r\ngame.snake.addSize()\r\n\n\n//# sourceURL=webpack://snake/./src/main.js?");

/***/ }),

/***/ "./src/renderer.js":
/*!*************************!*\
  !*** ./src/renderer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Renderer)\n/* harmony export */ });\nclass Renderer {\r\n    screen = null;\r\n    score = null;\r\n\r\n\r\n    renderScreen(w, h) {\r\n        const screen = document.createElement('div');\r\n\r\n        screen.style.width = w + 'px';\r\n        screen.style.height = h + 'px';\r\n        screen.style.position = 'relative';\r\n        screen.style.border = '1px solid black';\r\n\r\n        document.body.appendChild(screen);\r\n\r\n        this.screen = screen;\r\n    }\r\n\r\n    renderSquare(size, x, y, color) {\r\n        const square = document.createElement('div');\r\n\r\n        square.style.width = `${size}px`;\r\n        square.style.height = `${size}px`;\r\n        square.style.position = 'absolute';\r\n        square.style.top = `${y}px`;\r\n        square.style.left = `${x}px`;\r\n        square.style.backgroundColor = color;\r\n        square.style.border = '1px solid black';\r\n\r\n        this.screen?.appendChild(square);\r\n    }\r\n\r\n    renderScore(){\r\n        const score = document.createElement('div')\r\n        score.style.width = `50px`;\r\n        score.style.height = `50px`;\r\n        score.style.position = 'relative';\r\n        score.style.top = `20px`;\r\n        score.style.left = `20px`;\r\n        score.style.border = '1px solid black';\r\n        score.style.textAlign = 'center';\r\n        score.style.fontSize = '40px';\r\n\r\n        document.body?.appendChild(score);\r\n        this.score = score;\r\n    }\r\n\r\n    clear() {\r\n        this.screen.innerHTML = '';\r\n    }\r\n}\n\n//# sourceURL=webpack://snake/./src/renderer.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Snake)\n/* harmony export */ });\nclass Snake {\r\n    directionX = 0;\r\n    directionY = 1;\r\n    size;\r\n    isGrowing = false;\r\n\r\n\r\n    body = [\r\n        {x: 5, y: 5},\r\n    ];\r\n\r\n\r\n\r\n    constructor(size) {\r\n        this.size = size\r\n    }\r\n\r\n    isCollision() {\r\n        let isCollision = false;\r\n        const head = this.body[0];\r\n        this.body.forEach((cell, index) => {\r\n            if (index === 0) return;\r\n            if (cell.x === head.x && cell.y === head.y) {\r\n                isCollision = true\r\n            }\r\n        })\r\n        return isCollision;\r\n    }\r\n\r\n    addSize(){\r\n        for(let i = 1; i < this.size; i++){\r\n            this.body.push({x: 5, y: this.body[0].x - i})\r\n        }\r\n    }\r\n\r\n    move() {\r\n        if (!this.isGrowing){\r\n            this.body.pop();\r\n        }\r\n\r\n        this.isGrowing = false;\r\n\r\n        const head = this.body[0];\r\n\r\n        if (this.directionX !== 0) {\r\n            this.body.unshift({x: head.x + this.directionX, y: head.y});\r\n            return;\r\n        }\r\n\r\n        if (this.directionY !== 0) {\r\n            this.body.unshift({x: head.x, y: head.y + this.directionY});\r\n            return;\r\n        }\r\n\r\n    }\r\n\r\n    grow(){\r\n        this.isGrowing = true\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack://snake/./src/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;