import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

interface ISquareProps { id: number; value: string; onClick(id: number): void };

class Square extends React.Component<ISquareProps, {}> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        return (
            <button
                className="square"
                onClick={this.handleClick}
            >
                {this.props.value}
            </button>
        );
    }

    private handleClick() {
        this.props.onClick(this.props.id);
    }
}

interface IBoardState { squares: string[]; }

// tslint:disable-next-line:max-classes-per-file
class Board extends React.Component<{}, IBoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };

        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    public render() {
        const status = 'Next player: X';

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
        squares[i] = 'X';
        this.setState({ squares });
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
