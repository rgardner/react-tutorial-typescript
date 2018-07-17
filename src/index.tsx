import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

interface ISquareProps { id: number; value: string; onClick(id: number): void };

function Square(props: ISquareProps) {
    return (
        <button
            className="square"
            onClick={props.onClick.bind(null, props.id)}
        >
            {props.value}
        </button>
    );
}

interface IBoardProps { squares: string[]; onClick(id: number): void; }

// tslint:disable-next-line:max-classes-per-file
class Board extends React.Component<IBoardProps, {}> {
    public render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    private renderSquare(id: number) {
        return (
            <Square
                id={id}
                value={this.props.squares[id]}
                onClick={this.props.onClick.bind(null, id)}
            />
        );
    }
}

interface IBoardState { squares: string[]; }

interface IGameState { history: IBoardState[], xIsNext: boolean; }

// tslint:disable-next-line:max-classes-per-file
class Game extends React.Component<{}, IGameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    private handleClick(squareId: number) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[squareId]) {
            return;
        }

        squares[squareId] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares: string[]): string | undefined {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return undefined;
}

