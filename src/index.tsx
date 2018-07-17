import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

interface ISquareState { value: string; };

class Square extends React.Component<{}, ISquareState> {
    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
        };

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        return (
            <button
                className="square"
                onClick={this.handleClick}
            >
                {this.state.value}
            </button>
        );
    }

    private handleClick() {
        this.setState({ value: 'X' });
    }
}

// tslint:disable-next-line:max-classes-per-file
class Board extends React.Component {
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

    private renderSquare(i: number) {
        return <Square />;
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
