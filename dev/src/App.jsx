import React, {useState} from 'react';

import PlayerDiv from './components/PlayerDiv';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

const PLAYERS = {X: 'Player 1', O: 'Player 2'};
const INITIAL_GAME_BOARD = [
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
function deriveWinner(gameBoard, players) {
	let winner;
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}
function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
	// it wont exceute if array is empty
	for (const turn of gameTurns) {
		const {square, player} = turn;
		const {row, col} = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
}

function App() {
	// const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);
	const [players, setPlayers] = useState(PLAYERS);

	const gameBoard = deriveGameBoard(gameTurns);
	const currentPlayer = deriveActivePlayer(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

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
	function handleRematch() {
		setGameTurns([]);
	}
	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}

	return (
		<main>
			<div id='game-container'>
				<ol
					id='players'
					className='highlight-player'>
					<PlayerDiv
						name={PLAYERS.X}
						symbol='X'
						onSave={handlePlayerNameChange}
						// {activePlayer ==='X'} -> condition to check
						isActive={currentPlayer === 'X'}
					/>
					<PlayerDiv
						name={PLAYERS.O}
						symbol='O'
						onSave={handlePlayerNameChange}
						isActive={currentPlayer === 'O'}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver
						winner={winner}
						rematch={handleRematch}
					/>
				)}
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
