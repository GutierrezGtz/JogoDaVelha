const jogoDaVelha = {

    board: ['','','','','','','','',''],
    symbols: {
                options: ['O','X'],
                turnIndex: 0,
                change(){
                    this.turnIndex = ( this.turnIndex === 0 ? 1:0 );
                }
            },
    containerElement: null,
    gameover: false,
    winningSequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // FUNÇOES
    init(container) {
        this.containerElement = container;
    },

    makePlay(position) {
        if (this.gameover || this.board[position] !== '') return false;

        const currentSymbol = this.symbols.options[this.symbols.turnIndex];
        this.board[position] = currentSymbol;
        this.draw();

        const winningSequencesIndex = this.checkWinningSequences(currentSymbol);
        if (this.isGameOver()){
            this.gameIsOver();
        }
        if (winningSequencesIndex >= 0) {
            this.gameIsOver();
            this.stylizeWinnerSequence(this.winningSequences[winningSequencesIndex]);
        } else {
            this.symbols.change();
        }

        return true;
    },

    stylizeWinnerSequence(winnerSequence) {
        winnerSequence.forEach((position) => {
          this
            .containerElement
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    checkWinningSequences(symbol) {

        for ( i in this.winningSequences ) {
            if (this.board[ this.winningSequences[i][0] ] == symbol  &&
                this.board[ this.winningSequences[i][1] ] == symbol &&
                this.board[ this.winningSequences[i][2] ] == symbol) {
                console.log('INDEX Sequencia:' + i);
                return i;
            }
        };
        return -1;
    },

    gameIsOver() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    isGameOver() {
        return !this.board.includes('');
    },

    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    restart() {
        if (this.isGameOver() || this.gameover) {
            this.start();
            console.log('este jogo foi reiniciado!')
        } else if (confirm('Tem certeza de que deseja reiniciar este jogo?')) {
            this.start();
            console.log('este jogo foi reiniciado!')
        }
    },

    draw() {
        this.containerElement.innerHTML = this.board.map((element, index) => `<div onclick="jogoDaVelha.makePlay('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};