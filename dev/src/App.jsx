import PlayerDiv from './components/PlayerDiv';

function App() {
	return (
		<main>
			<div id='game-container'>
				<ol id='players'>
					<PlayerDiv
						name='Player 1'
						symbol='X'
					/>
					<PlayerDiv
						name='Player 2'
						symbol='O'
					/>
				</ol>
				GAME BOARD
			</div>
		</main>
	);
}

export default App;
