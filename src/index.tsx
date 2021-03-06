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
        const rows = new Array();
        for (let i = 0; i < 3; i++) {
            const row = new Array();
            for (let j = 0; j < 3; j++) {
                row.push(this.renderSquare(i * 3 + j));
            }

            rows.push(<div key={i} className="board-row">{row}</div>);
        }

        return <div>{rows}</div>;
    }

    private renderSquare(id: number) {
        return (
            <Square
                key={id}
                id={id}
                value={this.props.squares[id]}
                onClick={this.props.onClick.bind(null, id)}
            />
        );
    }
}

interface IHistoryItemProps {
    stepNumber: number;
    desc: string;
    isSelected: boolean;
    onClick(stepNumber: number): void;
}

function HistoryItem(props: IHistoryItemProps) {
    const desc = props.isSelected ? <b>{props.desc}</b> : props.desc;
    return (
        <li>
            <button
                onClick={props.onClick.bind(null, props.stepNumber)}
            >
                {desc}
            </button>
        </li>
    );
}

interface IBoardState { squares: string[]; selectedSquare?: number; }

interface IGameState {
    history: IBoardState[];
    stepNumber: number;
    xIsNext: boolean;
}

// tslint:disable-next-line:max-classes-per-file
class Game extends React.Component<{}, IGameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }

        this.handleClick = this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    public render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            let desc;
            if (move === 0) {
                desc = 'Go to game start';
            } else {
                const [row, col] = calculateRowCol(step.selectedSquare!);
                desc = `Go to move #${move} (${col}, ${row})`;
            }

            return (
                <HistoryItem
                    key={move}
                    stepNumber={move}
                    desc={desc}
                    isSelected={this.state.stepNumber === move}
                    onClick={this.jumpTo}
                />
            );
        })

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
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    private handleClick(squareId: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[squareId]) {
            return;
        }

        squares[squareId] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                selectedSquare: squareId,
                squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    private jumpTo(stepNumber: number) {
        this.setState({
            stepNumber,
            xIsNext: (stepNumber % 2) === 0,
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

function calculateRowCol(squareId: number): [number, number] {
    const row = Math.floor(squareId / 3) + 1;
    const col = (squareId % 3) + 1;
    return [row, col];
}
