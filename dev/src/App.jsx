import PlayerDiv from './components/PlayerDiv';
import GameBoard from './components/GameBoard';

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
				<GameBoard />
			</div>
		</main>
	);
}

export default App;
