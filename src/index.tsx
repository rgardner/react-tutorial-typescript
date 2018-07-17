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

interface IBoardState { squares: string[]; xIsNext: boolean; }

// tslint:disable-next-line:max-classes-per-file
class Board extends React.Component<{}, IBoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };

        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    public render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
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
                value={this.state.squares[id]}
                onClick={this.handleSquareClick}
            />
        );
    }

    private handleSquareClick(i: number) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ squares, xIsNext: !this.state.xIsNext });
    }
}

// tslint:disable-next-line:max-classes-per-file
class Game extends React.Component {
    public render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
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

