import React, {useState} from 'react';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function GameBoard({onSelectedSquare, activePlayerSymbol}) {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	function handleSelectedSquare(rowIndex, colIndex) {
		setGameBoard((prevGameBoard) => {
			const updatedBoard = [...prevGameBoard.map((innerArr) => [...innerArr])];
			updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
			return updatedBoard;
		});
		onSelectedSquare();
	}

	return (
		<>
			<ol id='game-board'>
				{gameBoard.map((row, rowIndex) => (
					<li key={rowIndex}>
						<ol>
							{row.map((playerSymbol, colIndex) => (
								<li key={colIndex}>
									<button
										onClick={() => handleSelectedSquare(rowIndex, colIndex)}>
										{playerSymbol}
									</button>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</>
	);
}

export default GameBoard;
