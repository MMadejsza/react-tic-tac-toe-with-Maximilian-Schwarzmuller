import React, {useState} from 'react';

import PlayerDiv from './components/PlayerDiv';
import GameBoard from './components/GameBoard';

function App() {
	const [activePlayer, setActivePlayer] = useState('X');

	function handleSelectedSquare() {
		// simple toggle triggered later from GameBoard.jsx
		setActivePlayer((curActivePlayer) => (curActivePlayer == 'X' ? 'O' : 'X'));
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
						isActive={activePlayer === 'X'}
					/>
					<PlayerDiv
						name='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard
					onSelectedSquare={handleSelectedSquare}
					activePlayerSymbol={activePlayer}
				/>
			</div>
		</main>
	);
}

export default App;
