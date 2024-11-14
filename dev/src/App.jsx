import React, {useState} from 'react';

import PlayerDiv from './components/PlayerDiv';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

import {WINNING_COMBINATIONS} from './winning-combinations';

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';
	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
}

function App() {
	// const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);

	const currentPlayer = deriveActivePlayer(gameTurns);

	let gameBoard = initialGameBoard;
	let winner;
	// it wont exceute if array is empty
	for (const turn of gameTurns) {
		const {square, player} = turn;
		const {row, col} = square;

		gameBoard[row][col] = player;
	}

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = firstSquareSymbol;
		}
	}

	function handleSelectedSquare(rowIndex, colIndex) {
		// simple toggle triggered later from GameBoard.jsx
		// setActivePlayer((curActivePlayer) => (curActivePlayer == 'X' ? 'O' : 'X'));
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{square: {row: rowIndex, col: colIndex}, player: currentPlayer},
				...prevTurns,
			];
			return updatedTurns;
		});
	}

	return (
		<main>
			<div id='game-container'>
				<ol
					id='players'
					className='highlight-player'>
					<PlayerDiv
						name='Player 1'
						symbol='X'
						// {activePlayer ==='X'} -> condition to check
						isActive={currentPlayer === 'X'}
					/>
					<PlayerDiv
						name='Player 2'
						symbol='O'
						isActive={currentPlayer === 'O'}
					/>
				</ol>
				{winner && <p>You won, {winner}!</p>}
				<GameBoard
					onSelectedSquare={handleSelectedSquare}
					board={gameBoard}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
